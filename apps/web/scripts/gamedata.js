// ─── Piano keyboard layout ────────────────────────────────────────────────────

var indexKeyMappingWhite = ["C", "D", "E", "F", "G", "A", "B"];
var indexKeyMappingBlack = ["Csharp", "Dsharp", "Fsharp", "Gsharp", "Asharp"];

// ─── Piano audio samples ──────────────────────────────────────────────────────

var pianoSample = {
  'A0': './samples/piano/A0.[mp3|ogg]',
  'A1': './samples/piano/A1.[mp3|ogg]',
  'A2': './samples/piano/A2.[mp3|ogg]',
  'A3': './samples/piano/A3.[mp3|ogg]',
  'A4': './samples/piano/A4.[mp3|ogg]',
  'A5': './samples/piano/A5.[mp3|ogg]',
  'A6': './samples/piano/A6.[mp3|ogg]',
  'A#0': './samples/piano/As0.[mp3|ogg]',
  'A#1': './samples/piano/As1.[mp3|ogg]',
  'A#2': './samples/piano/As2.[mp3|ogg]',
  'A#3': './samples/piano/As3.[mp3|ogg]',
  'A#4': './samples/piano/As4.[mp3|ogg]',
  'A#5': './samples/piano/As5.[mp3|ogg]',
  'A#6': './samples/piano/As6.[mp3|ogg]',
  'B0': './samples/piano/B0.[mp3|ogg]',
  'B1': './samples/piano/B1.[mp3|ogg]',
  'B2': './samples/piano/B2.[mp3|ogg]',
  'B3': './samples/piano/B3.[mp3|ogg]',
  'B4': './samples/piano/B4.[mp3|ogg]',
  'B5': './samples/piano/B5.[mp3|ogg]',
  'B6': './samples/piano/B6.[mp3|ogg]',
  'C0': './samples/piano/C0.[mp3|ogg]',
  'C1': './samples/piano/C1.[mp3|ogg]',
  'C2': './samples/piano/C2.[mp3|ogg]',
  'C3': './samples/piano/C3.[mp3|ogg]',
  'C4': './samples/piano/C4.[mp3|ogg]',
  'C5': './samples/piano/C5.[mp3|ogg]',
  'C6': './samples/piano/C6.[mp3|ogg]',
  'C7': './samples/piano/C7.[mp3|ogg]',
  'C#0': './samples/piano/Cs0.[mp3|ogg]',
  'C#1': './samples/piano/Cs1.[mp3|ogg]',
  'C#2': './samples/piano/Cs2.[mp3|ogg]',
  'C#3': './samples/piano/Cs3.[mp3|ogg]',
  'C#4': './samples/piano/Cs4.[mp3|ogg]',
  'C#5': './samples/piano/Cs5.[mp3|ogg]',
  'C#6': './samples/piano/Cs6.[mp3|ogg]',
  'D0': './samples/piano/D0.[mp3|ogg]',
  'D1': './samples/piano/D1.[mp3|ogg]',
  'D2': './samples/piano/D2.[mp3|ogg]',
  'D3': './samples/piano/D3.[mp3|ogg]',
  'D4': './samples/piano/D4.[mp3|ogg]',
  'D5': './samples/piano/D5.[mp3|ogg]',
  'D6': './samples/piano/D6.[mp3|ogg]',
  'D#0': './samples/piano/Ds0.[mp3|ogg]',
  'D#1': './samples/piano/Ds1.[mp3|ogg]',
  'D#2': './samples/piano/Ds2.[mp3|ogg]',
  'D#3': './samples/piano/Ds3.[mp3|ogg]',
  'D#4': './samples/piano/Ds4.[mp3|ogg]',
  'D#5': './samples/piano/Ds5.[mp3|ogg]',
  'D#6': './samples/piano/Ds6.[mp3|ogg]',
  'E0': './samples/piano/E0.[mp3|ogg]',
  'E1': './samples/piano/E1.[mp3|ogg]',
  'E2': './samples/piano/E2.[mp3|ogg]',
  'E3': './samples/piano/E3.[mp3|ogg]',
  'E4': './samples/piano/E4.[mp3|ogg]',
  'E5': './samples/piano/E5.[mp3|ogg]',
  'E6': './samples/piano/E6.[mp3|ogg]',
  'F0': './samples/piano/F0.[mp3|ogg]',
  'F1': './samples/piano/F1.[mp3|ogg]',
  'F2': './samples/piano/F2.[mp3|ogg]',
  'F3': './samples/piano/F3.[mp3|ogg]',
  'F4': './samples/piano/F4.[mp3|ogg]',
  'F5': './samples/piano/F5.[mp3|ogg]',
  'F6': './samples/piano/F6.[mp3|ogg]',
  'F#0': './samples/piano/Fs0.[mp3|ogg]',
  'F#1': './samples/piano/Fs1.[mp3|ogg]',
  'F#2': './samples/piano/Fs2.[mp3|ogg]',
  'F#3': './samples/piano/Fs3.[mp3|ogg]',
  'F#4': './samples/piano/Fs4.[mp3|ogg]',
  'F#5': './samples/piano/Fs5.[mp3|ogg]',
  'F#6': './samples/piano/Fs6.[mp3|ogg]',
  'G0': './samples/piano/G0.[mp3|ogg]',
  'G1': './samples/piano/G1.[mp3|ogg]',
  'G2': './samples/piano/G2.[mp3|ogg]',
  'G3': './samples/piano/G3.[mp3|ogg]',
  'G4': './samples/piano/G4.[mp3|ogg]',
  'G5': './samples/piano/G5.[mp3|ogg]',
  'G6': './samples/piano/G6.[mp3|ogg]',
  'G#0': './samples/piano/Gs0.[mp3|ogg]',
  'G#1': './samples/piano/Gs1.[mp3|ogg]',
  'G#2': './samples/piano/Gs2.[mp3|ogg]',
  'G#3': './samples/piano/Gs3.[mp3|ogg]',
  'G#4': './samples/piano/Gs4.[mp3|ogg]',
  'G#5': './samples/piano/Gs5.[mp3|ogg]',
  'G#6': './samples/piano/Gs6.[mp3|ogg]'
};

// ─── Outcome classifiers (UI only) ───────────────────────────────────────────

var outcomes = {};
outcomes.noteSuccess            = { className: "note_success" };
outcomes.combo5                 = { className: "note_success" };
outcomes.combo10                = { className: "note_success" };
outcomes.tooLow                 = { className: "note_failure" };
outcomes.tooHigh                = { className: "note_failure" };
outcomes.levelPassed            = { className: "level_success" };
outcomes.levelPassedWithPerfect = { className: "level_success" };

// ─── API integration ──────────────────────────────────────────────────────────

var API_URL = "http://localhost:3001";

/**
 * Convert an API level into the shape game.js expects:
 *   pitch       → note
 *   startBeat   → time (seconds offset, Tone.js-compatible)
 *   duration    → duration (seconds)
 *   image_url   → picture
 *   description → mainText1/2/3
 *   success_text → successText
 */
function adaptLevel(apiLevel) {
  var secPerBeat = 60 / (apiLevel.bpm || 140);
  return {
    id:          apiLevel.id,
    levelNumber: "Level " + apiLevel.level_number,
    title:       apiLevel.title,
    picture:     apiLevel.image_url || "",
    mainText1:   (apiLevel.description || [])[0] || "",
    mainText2:   (apiLevel.description || [])[1] || "",
    mainText3:   (apiLevel.description || [])[2] || "",
    successText: apiLevel.success_text || "",
    counter:     apiLevel.time_limit_seconds || 199,
    piece: (apiLevel.piece || []).map(function(note) {
      return {
        note:     note.pitch,
        duration: note.duration * secPerBeat,
        time:     note.startBeat === 0 ? undefined : "+" + (note.startBeat * secPerBeat)
      };
    })
  };
}

async function fetchLevels() {
  var res = await fetch(API_URL + "/levels");
  if (!res.ok) throw new Error("Failed to fetch levels: " + res.status);
  var data = await res.json();
  return data.map(adaptLevel);
}
