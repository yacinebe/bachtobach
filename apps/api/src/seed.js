/**
 * Seed the levels table from @bachtobach/game-engine.
 * Run once:  node src/seed.js
 */
const { pool } = require("./db");
const { levels } = require("@bachtobach/game-engine");

async function seed() {
  console.log(`Seeding ${levels.length} levels…`);

  for (const level of levels) {
    await pool.query(
      `INSERT INTO levels
         (level_number, title, composer, image_url, bpm, difficulty,
          time_limit_seconds, piece, description, success_text)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (level_number) DO UPDATE SET
         title              = EXCLUDED.title,
         composer           = EXCLUDED.composer,
         image_url          = EXCLUDED.image_url,
         bpm                = EXCLUDED.bpm,
         difficulty         = EXCLUDED.difficulty,
         time_limit_seconds = EXCLUDED.time_limit_seconds,
         piece              = EXCLUDED.piece,
         description        = EXCLUDED.description,
         success_text       = EXCLUDED.success_text`,
      [
        level.levelNumber,
        level.title,
        level.composer,
        level.image,
        level.bpm,
        level.difficulty,
        level.timeLimitSeconds,
        JSON.stringify(level.piece),
        JSON.stringify(level.description),
        level.successText,
      ]
    );
    console.log(`  ✓ Level ${level.levelNumber}: ${level.title}`);
  }

  console.log("Done.");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
