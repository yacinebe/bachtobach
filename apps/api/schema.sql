-- Bach to Bach — database schema
-- Run once against your Postgres instance:
--   psql $DATABASE_URL -f schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL,
  display_name  TEXT        NOT NULL,
  password_hash TEXT        NOT NULL,
  avatar_url    TEXT,
  provider      TEXT        NOT NULL DEFAULT 'email',
  provider_id   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Levels ───────────────────────────────────────────────────────────────────
-- `piece` and `description` are stored as JSONB arrays.
CREATE TABLE IF NOT EXISTS levels (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  level_number        INTEGER     UNIQUE NOT NULL,
  title               TEXT        NOT NULL,
  composer            TEXT        NOT NULL,
  image_url           TEXT,
  bpm                 INTEGER     NOT NULL,
  difficulty          SMALLINT    NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  time_limit_seconds  INTEGER     NOT NULL,
  piece               JSONB       NOT NULL,
  description         JSONB       NOT NULL,  -- string[]
  success_text        TEXT        NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Progress ─────────────────────────────────────────────────────────────────
-- One row per (user, level) — upserted on each attempt.
CREATE TABLE IF NOT EXISTS progress (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  level_id       UUID        NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  completed      BOOLEAN     NOT NULL DEFAULT FALSE,
  perfect        BOOLEAN     NOT NULL DEFAULT FALSE,
  best_score     INTEGER     NOT NULL DEFAULT 0,
  attempts       INTEGER     NOT NULL DEFAULT 0,
  last_played_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, level_id)
);

-- ─── Scores ───────────────────────────────────────────────────────────────────
-- Append-only; every attempt is recorded.
CREATE TABLE IF NOT EXISTS scores (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  level_id   UUID        NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  score      INTEGER     NOT NULL,
  combo_max  INTEGER     NOT NULL DEFAULT 0,
  accuracy   NUMERIC(5,4) NOT NULL DEFAULT 0,
  played_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS scores_level_score_idx ON scores (level_id, score DESC);
