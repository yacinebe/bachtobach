const path = require("path");
const Fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyJwt = require("@fastify/jwt");
const fastifyStatic = require("@fastify/static");

const { initDb } = require("./db");
const authRoutes     = require("./routes/auth");
const levelRoutes    = require("./routes/levels");
const scoreRoutes    = require("./routes/scores");
const progressRoutes = require("./routes/progress");
const meRoutes       = require("./routes/me");

const app = Fastify({ logger: true });

// ─── Plugins ──────────────────────────────────────────────────────────────────
app.register(fastifyCors, { origin: true });

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "dev-secret-change-in-production",
});

// ─── Auth decorator used by protected routes ──────────────────────────────────
app.decorate("authenticate", async function (req, reply) {
  try {
    await req.jwtVerify();
  } catch {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

// ─── API routes ───────────────────────────────────────────────────────────────
app.get("/health", async () => ({ status: "ok" }));

app.register(authRoutes);
app.register(levelRoutes);
app.register(scoreRoutes);
app.register(progressRoutes);
app.register(meRoutes);

// ─── Serve web app (registered last so API routes take priority) ──────────────
app.register(fastifyStatic, {
  root: path.join(__dirname, "../../web"),
  prefix: "/",
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 3001);

async function start() {
  await initDb();
  await app.listen({ port: PORT, host: "0.0.0.0" });
}

start().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
