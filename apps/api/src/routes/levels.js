const { pool } = require("../db");

async function levelRoutes(app) {
  // GET /levels — public
  app.get("/levels", async (_req, reply) => {
    const { rows } = await pool.query(
      "SELECT * FROM levels ORDER BY level_number ASC"
    );
    return reply.send(rows);
  });

  // GET /levels/:id
  app.get("/levels/:id", async (req, reply) => {
    const { rows } = await pool.query(
      "SELECT * FROM levels WHERE id = $1",
      [req.params.id]
    );
    if (!rows[0]) return reply.code(404).send({ error: "Level not found" });
    return reply.send(rows[0]);
  });
}

module.exports = levelRoutes;
