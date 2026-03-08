import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/health", async () => ({ status: "ok" }));

// TODO: register routes
// app.register(import("./routes/auth"));
// app.register(import("./routes/levels"));
// app.register(import("./routes/progress"));
// app.register(import("./routes/scores"));

const PORT = Number(process.env.PORT ?? 3001);

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
