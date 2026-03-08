import { FastifyInstance } from "fastify";
import { pool } from "../db";
import type { Level } from "@bachtobach/types";

export default async function levelRoutes(app: FastifyInstance) {
  // GET /levels — public, no auth required
  app.get("/levels", async (_req, reply) => {
    const { rows } = await pool.query<Level>(
      "SELECT * FROM levels ORDER BY level_number ASC"
    );
    return reply.send(rows);
  });

  // GET /levels/:id
  app.get<{ Params: { id: string } }>("/levels/:id", async (req, reply) => {
    const { rows } = await pool.query<Level>(
      "SELECT * FROM levels WHERE id = $1",
      [req.params.id]
    );
    if (!rows[0]) return reply.code(404).send({ error: "Level not found" });
    return reply.send(rows[0]);
  });
}
