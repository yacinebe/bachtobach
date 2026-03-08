const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// ECS passes individual DB_* vars from Secrets Manager.
// Locally and on Railway, DATABASE_URL is used directly.
function buildConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.DB_HOST) {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT = "5432", DB_NAME = "bachtobach" } = process.env;
    return `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
  return "postgres://postgres:postgres@127.0.0.1:5432/bachtobach";
}

const pool = new Pool({
  connectionString: buildConnectionString(),
  ssl: (process.env.DATABASE_URL || process.env.DB_HOST)
    ? { rejectUnauthorized: false }
    : false,
});

async function initDb() {
  // Run schema — all statements use IF NOT EXISTS so this is safe to repeat
  const schema = fs.readFileSync(path.join(__dirname, "../schema.sql"), "utf8");
  await pool.query(schema);

  // Auto-seed levels if the table is empty
  const { rows } = await pool.query("SELECT COUNT(*) AS count FROM levels");
  if (parseInt(rows[0].count) === 0) {
    const { levels } = require("@bachtobach/game-engine");
    for (const level of levels) {
      await pool.query(
        `INSERT INTO levels
           (level_number, title, composer, image_url, bpm, difficulty,
            time_limit_seconds, piece, description, success_text)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          level.levelNumber, level.title, level.composer, level.image,
          level.bpm, level.difficulty, level.timeLimitSeconds,
          JSON.stringify(level.piece), JSON.stringify(level.description),
          level.successText,
        ]
      );
    }
    console.log("Auto-seeded 5 levels");
  }
}

module.exports = { pool, initDb };
