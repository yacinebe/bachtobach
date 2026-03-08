import { FastifyInstance } from "fastify";
import { pool } from "../db";
import type { Progress } from "@bachtobach/types";

export default async function progressRoutes(app: FastifyInstance) {
  // POST /progress — upsert; user_id from JWT
  app.post<{
    Body: {
      level_id: string;
      completed: boolean;
      perfect: boolean;
      score: number;
    };
  }>("/progress", { preHandler: [app.authenticate] }, async (req, reply) => {
    const { level_id, completed, perfect, score } = req.body;
    const user_id = (req.user as { sub: string }).sub;

    if (!level_id) {
      return reply.code(400).send({ error: "level_id is required" });
    }

    const { rows } = await pool.query<Progress>(
      `INSERT INTO progress (user_id, level_id, completed, perfect, best_score, attempts, last_played_at)
       VALUES ($1, $2, $3, $4, $5, 1, NOW())
       ON CONFLICT (user_id, level_id) DO UPDATE SET
         completed      = progress.completed OR EXCLUDED.completed,
         perfect        = progress.perfect   OR EXCLUDED.perfect,
         best_score     = GREATEST(progress.best_score, EXCLUDED.best_score),
         attempts       = progress.attempts + 1,
         last_played_at = NOW()
       RETURNING *`,
      [user_id, level_id, completed ?? false, perfect ?? false, score ?? 0]
    );

    return reply.code(201).send(rows[0]);
  });
}
