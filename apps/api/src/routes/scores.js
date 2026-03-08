const { pool } = require("../db");

async function scoreRoutes(app) {
  // POST /scores — auth required; user_id from JWT
  app.post("/scores", { preHandler: [app.authenticate] }, async (req, reply) => {
    const { level_id, score, combo_max, accuracy } = req.body;
    const user_id = req.user.sub;

    if (!level_id || score == null) {
      return reply.code(400).send({ error: "level_id and score are required" });
    }

    const { rows } = await pool.query(
      `INSERT INTO scores (user_id, level_id, score, combo_max, accuracy)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, level_id, score, combo_max ?? 0, accuracy ?? 0]
    );

    return reply.code(201).send(rows[0]);
  });

  // GET /leaderboard — public; optional ?level_id= and ?limit=
  app.get("/leaderboard", async (req, reply) => {
    const limit = Math.min(parseInt(req.query.limit ?? "20", 10), 100);
    const params = [limit];
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
  });
}

module.exports = scoreRoutes;
