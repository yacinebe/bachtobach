const bcrypt = require("bcryptjs");
const { pool } = require("../db");

async function authRoutes(app) {
  // POST /auth/register
  app.post("/auth/register", async (req, reply) => {
    const { email, password, display_name } = req.body;

    if (!email || !password) {
      return reply.code(400).send({ error: "email and password are required" });
    }

    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rowCount > 0) {
      return reply.code(409).send({ error: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const name = display_name ?? email.split("@")[0];

    const { rows } = await pool.query(
      `INSERT INTO users (email, display_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name, created_at`,
      [email, name, password_hash]
    );

    const user = rows[0];
    const token = app.jwt.sign({ sub: user.id, email: user.email });

    return reply.code(201).send({ token, user: { ...user, provider: "email" } });
  });

  // POST /auth/login
  app.post("/auth/login", async (req, reply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.code(400).send({ error: "email and password are required" });
    }

    const { rows } = await pool.query(
      "SELECT id, email, display_name, password_hash, avatar_url, created_at FROM users WHERE email = $1",
      [email]
    );

    const user = rows[0];
    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = app.jwt.sign({ sub: user.id, email: user.email });

    const { password_hash, ...safeUser } = user;
    return reply.send({ token, user: { ...safeUser, provider: "email" } });
  });
}

module.exports = authRoutes;
