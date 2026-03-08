const path = require("path");
const { Stack, Duration, RemovalPolicy, CfnOutput } = require("aws-cdk-lib");
const ec2        = require("aws-cdk-lib/aws-ec2");
const ecs        = require("aws-cdk-lib/aws-ecs");
const ecsPatterns = require("aws-cdk-lib/aws-ecs-patterns");
const rds        = require("aws-cdk-lib/aws-rds");
const secretsManager = require("aws-cdk-lib/aws-secretsmanager");

class BachtoBachStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // ─── VPC — 2 AZs, 1 NAT gateway ──────────────────────────────────────────
    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
      natGateways: 1,
    });

    // ─── RDS PostgreSQL 16 ────────────────────────────────────────────────────
    const dbCredentials = rds.Credentials.fromGeneratedSecret("bachtobach", {
      secretName: "bachtobach/db",
    });

    const db = new rds.DatabaseInstance(this, "Database", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      credentials: dbCredentials,
      databaseName: "bachtobach",
      // Keeps a final snapshot when the stack is destroyed
      removalPolicy: RemovalPolicy.SNAPSHOT,
      deletionProtection: false,
      multiAz: false,
      allocatedStorage: 20,
    });

    // ─── JWT secret (auto-generated, 64-char alphanumeric) ────────────────────
    const jwtSecret = new secretsManager.Secret(this, "JwtSecret", {
      secretName: "bachtobach/jwt",
      generateSecretString: {
        excludePunctuation: true,
        passwordLength: 64,
      },
    });

    // ─── ECS cluster ──────────────────────────────────────────────────────────
    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
      containerInsights: true,
    });

    // ─── Fargate service + ALB ────────────────────────────────────────────────
    // CDK builds the Docker image from the repo root and pushes to ECR.
    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this, "Service", {
        cluster,
        cpu: 256,
        memoryLimitMiB: 512,
        desiredCount: 1,
        healthCheckGracePeriod: Duration.seconds(60),
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(
            path.join(__dirname, "../../")
          ),
          containerPort: 3001,
          environment: {
            NODE_ENV: "production",
            DB_HOST: db.instanceEndpoint.hostname,
            DB_PORT: "5432",
            DB_NAME: "bachtobach",
          },
          secrets: {
            // Individual fields from the RDS-generated secret
            DB_USER:     ecs.Secret.fromSecretsManager(db.secret, "username"),
            DB_PASSWORD: ecs.Secret.fromSecretsManager(db.secret, "password"),
            JWT_SECRET:  ecs.Secret.fromSecretsManager(jwtSecret),
          },
        },
        publicLoadBalancer: true,
      }
    );

    // ALB health-check path
    service.targetGroup.configureHealthCheck({ path: "/health" });

    // Allow Fargate tasks to reach RDS on port 5432
    db.connections.allowFrom(service.service, ec2.Port.tcp(5432));

    // ─── Outputs ──────────────────────────────────────────────────────────────
    new CfnOutput(this, "AppUrl", {
      description: "Application URL",
      value: `http://${service.loadBalancer.loadBalancerDnsName}`,
    });

    new CfnOutput(this, "DbSecretArn", {
      description: "RDS credentials secret ARN",
      value: db.secret.secretArn,
    });
  }
}

module.exports = { BachtoBachStack };
