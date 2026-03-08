/**
 * Convert "C#4" → "Csharp4" (for DOM element IDs)
 * @param {string} note
 * @returns {string}
 */
function sharpToId(note) {
  return note.includes("#") ? note.replace("#", "sharp") : note;
}

/**
 * Convert "Csharp4" → "C#4"
 * @param {string} note
 * @returns {string}
 */
function idToSharp(note) {
  return note.includes("sharp") ? note.replace("sharp", "#") : note;
}

module.exports = { sharpToId, idToSharp };
