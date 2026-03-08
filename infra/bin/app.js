const cdk = require("aws-cdk-lib");
const { BachtoBachStack } = require("../lib/stack");

const app = new cdk.App();

new BachtoBachStack(app, "BachtoBach", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region:  process.env.CDK_DEFAULT_REGION ?? "eu-west-1",
  },
});
