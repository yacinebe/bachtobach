import { FastifyInstance } from "fastify";
import { pool } from "../db";
import type { Progress, User } from "@bachtobach/types";

export default async function meRoutes(app: FastifyInstance) {
  // GET /me — current user profile
  app.get("/me", { preHandler: [app.authenticate] }, async (req, reply) => {
    const user_id = (req.user as { sub: string }).sub;

    const { rows } = await pool.query<User>(
      `SELECT id, email, display_name, avatar_url, provider, created_at
       FROM users WHERE id = $1`,
      [user_id]
    );

    if (!rows[0]) return reply.code(404).send({ error: "User not found" });
    return reply.send(rows[0]);
  });

  // GET /me/progress — all progress for current user
  app.get("/me/progress", { preHandler: [app.authenticate] }, async (req, reply) => {
    const user_id = (req.user as { sub: string }).sub;

    const { rows } = await pool.query<Progress>(
      "SELECT * FROM progress WHERE user_id = $1 ORDER BY last_played_at DESC",
      [user_id]
    );

    return reply.send(rows);
  });
}
