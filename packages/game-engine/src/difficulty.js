const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function parseMidi(pitch) {
  const name = pitch.slice(0, -1);
  const octave = parseInt(pitch.slice(-1), 10);
  return octave * 12 + NOTE_NAMES.indexOf(name);
}

/**
 * Rate difficulty 1–5 based on note density, BPM, and pitch range.
 * @param {Array<{ pitch: string, startBeat: number }>} notes
 * @param {number} bpm
 * @returns {1|2|3|4|5}
 */
function rateDifficulty(notes, bpm) {
  const notesPerBeat = notes.length / Math.max(1, notes[notes.length - 1]?.startBeat ?? 1);
  const pitches = notes.map((n) => parseMidi(n.pitch));
  const range = Math.max(...pitches) - Math.min(...pitches);

  let score = 0;
  if (bpm > 120) score++;
  if (bpm > 160) score++;
  if (notesPerBeat > 1) score++;
  if (range > 24) score++;
  if (range > 36) score++;

  return Math.min(5, Math.max(1, score + 1));
}

module.exports = { rateDifficulty };
