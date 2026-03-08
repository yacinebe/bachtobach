const PERFECT_WINDOW_MS = 50;
const GOOD_WINDOW_MS = 150;

const PERFECT_POINTS = 300;
const GOOD_POINTS = 100;
const MISS_POINTS = 0;

/**
 * @param {{ hit: boolean, latencyMs: number }} result
 * @returns {number}
 */
function calcNoteScore(result) {
  if (!result.hit) return MISS_POINTS;
  if (result.latencyMs <= PERFECT_WINDOW_MS) return PERFECT_POINTS;
  if (result.latencyMs <= GOOD_WINDOW_MS) return GOOD_POINTS;
  return MISS_POINTS;
}

/**
 * @param {{ score, combo, comboMax, hits, misses, accuracy }} state
 * @param {{ hit: boolean, latencyMs: number }} result
 */
function applyNoteResult(state, result) {
  const points = calcNoteScore(result);
  const hit = points > 0;
  const combo = hit ? state.combo + 1 : 0;
  const hits = state.hits + (hit ? 1 : 0);
  const misses = state.misses + (hit ? 0 : 1);
  const total = hits + misses;
  return {
    score: state.score + points * Math.max(1, combo),
    combo,
    comboMax: Math.max(state.comboMax, combo),
    hits,
    misses,
    accuracy: total > 0 ? hits / total : 0,
  };
}

function initialScoreState() {
  return { score: 0, combo: 0, comboMax: 0, hits: 0, misses: 0, accuracy: 0 };
}

module.exports = { calcNoteScore, applyNoteResult, initialScoreState };
