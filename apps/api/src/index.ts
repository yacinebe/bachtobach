import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

import authRoutes    from "./routes/auth";
import levelRoutes   from "./routes/levels";
import scoreRoutes   from "./routes/scores";
import progressRoutes from "./routes/progress";
import meRoutes      from "./routes/me";

const app = Fastify({ logger: true });

// ─── Plugins ──────────────────────────────────────────────────────────────────
app.register(fastifyCors, { origin: true });

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? "dev-secret-change-in-production",
});

// ─── Auth decorator used by protected routes ──────────────────────────────────
app.decorate(
  "authenticate",
  async function (req: FastifyRequest, reply: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch {
      reply.code(401).send({ error: "Unauthorized" });
    }
  }
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/health", async () => ({ status: "ok" }));

app.register(authRoutes);
app.register(levelRoutes);
app.register(scoreRoutes);
app.register(progressRoutes);
app.register(meRoutes);

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 3001);

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
