/**
 * Compare a played pitch against the expected note.
 * @param {{ pitch: string, duration: number, startBeat: number }} expected
 * @param {string | null} played
 * @param {number} latencyMs
 * @returns {{ expected, played, hit: boolean, latencyMs: number }}
 */
function compareNote(expected, played, latencyMs) {
  const hit = played !== null && played === expected.pitch;
  return { expected, played, hit, latencyMs };
}

module.exports = { compareNote };
