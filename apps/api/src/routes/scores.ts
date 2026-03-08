import { FastifyInstance } from "fastify";
import { pool } from "../db";
import type { Score } from "@bachtobach/types";

export default async function scoreRoutes(app: FastifyInstance) {
  // POST /scores — auth required; user_id is taken from JWT, not request body
  app.post<{
    Body: { level_id: string; score: number; combo_max: number; accuracy: number };
  }>("/scores", { preHandler: [app.authenticate] }, async (req, reply) => {
    const { level_id, score, combo_max, accuracy } = req.body;
    const user_id = (req.user as { sub: string }).sub;

    if (!level_id || score == null) {
      return reply.code(400).send({ error: "level_id and score are required" });
    }

    const { rows } = await pool.query<Score>(
      `INSERT INTO scores (user_id, level_id, score, combo_max, accuracy)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, level_id, score, combo_max ?? 0, accuracy ?? 0]
    );

    return reply.code(201).send(rows[0]);
  });

  // GET /leaderboard — public; top 20 scores per level with display_name
  app.get<{ Querystring: { level_id?: string; limit?: string } }>(
    "/leaderboard",
    async (req, reply) => {
      const limit = Math.min(parseInt(req.query.limit ?? "20", 10), 100);
      const params: unknown[] = [limit];
      const levelFilter = req.query.level_id
        ? ` AND s.level_id = $${params.push(req.query.level_id)}`
        : "";

      const { rows } = await pool.query(
        `SELECT s.id, s.user_id, s.level_id, s.score, s.combo_max,
                s.accuracy, s.played_at, u.display_name
         FROM scores s
         JOIN users u ON u.id = s.user_id
         WHERE 1=1${levelFilter}
         ORDER BY s.score DESC
         LIMIT $1`,
        params
      );

      return reply.send(rows);
    }
  );
}
