const { pool } = require("../db");

async function meRoutes(app) {
  // GET /me — current user profile
  app.get("/me", { preHandler: [app.authenticate] }, async (req, reply) => {
    const user_id = req.user.sub;

    const { rows } = await pool.query(
      "SELECT id, email, display_name, avatar_url, provider, created_at FROM users WHERE id = $1",
      [user_id]
    );

    if (!rows[0]) return reply.code(404).send({ error: "User not found" });
    return reply.send(rows[0]);
  });

  // GET /me/progress
  app.get("/me/progress", { preHandler: [app.authenticate] }, async (req, reply) => {
    const user_id = req.user.sub;

    const { rows } = await pool.query(
      "SELECT * FROM progress WHERE user_id = $1 ORDER BY last_played_at DESC",
      [user_id]
    );

    return reply.send(rows);
  });
}

module.exports = meRoutes;
