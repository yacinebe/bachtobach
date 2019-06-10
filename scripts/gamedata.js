// Mapping tables to build the piano keyboard 

var indexKeyMappingWhite = [];

indexKeyMappingWhite[0] = "C";
indexKeyMappingWhite[1] = "D";
indexKeyMappingWhite[2] = "E";
indexKeyMappingWhite[3] = "F";
indexKeyMappingWhite[4] = "G";
indexKeyMappingWhite[5] = "A";
indexKeyMappingWhite[6] = "B";

var indexKeyMappingBlack = [];

indexKeyMappingBlack[0] = "Csharp";
indexKeyMappingBlack[1] = "Dsharp";
indexKeyMappingBlack[2] = "Fsharp";
indexKeyMappingBlack[3] = "Gsharp";
indexKeyMappingBlack[4] = "Asharp";

// Tunes

//Main sampler for Piano 

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

}

var pieces = [[]];

var level1Piece = [

  { note: "C4", duration: quarterBlackKey },
  { note: "E4", duration: quarterBlackKey, time: "+" + quarterBlackKey },
  { note: "G4", duration: quarterBlackKey, time: "+" + 2 * quarterBlackKey },
  { note: "C5", duration: quarterBlackKey, time: "+" + 3 * quarterBlackKey },
  { note: "E5", duration: quarterBlackKey, time: "+" + 4 * quarterBlackKey },
  { note: "G4", duration: quarterBlackKey, time: "+" + 5 * quarterBlackKey },
  { note: "C5", duration: quarterBlackKey, time: "+" + 6 * quarterBlackKey },
  { note: "E5", duration: quarterBlackKey, time: "+" + 7 * quarterBlackKey },
  { note: "C4", duration: quarterBlackKey, time: "+" + 8 * quarterBlackKey },
  { note: "E4", duration: quarterBlackKey, time: "+" + 9 * quarterBlackKey },
  { note: "G4", duration: quarterBlackKey, time: "+" + 10 * quarterBlackKey },
  { note: "C5", duration: quarterBlackKey, time: "+" + 11 * quarterBlackKey },
  { note: "E5", duration: quarterBlackKey, time: "+" + 12 * quarterBlackKey },
  { note: "G4", duration: quarterBlackKey, time: "+" + 13 * quarterBlackKey },
  { note: "C5", duration: quarterBlackKey, time: "+" + 14 * quarterBlackKey },
  { note: "E5", duration: quarterBlackKey, time: "+" + 15 * quarterBlackKey },

  { note: "C4", duration: quarterBlackKey, time: "+" + 16 * quarterBlackKey },
  { note: "D4", duration: quarterBlackKey, time: "+" + 17 * quarterBlackKey },
  { note: "A4", duration: quarterBlackKey, time: "+" + 18 * quarterBlackKey },
  { note: "D5", duration: quarterBlackKey, time: "+" + 19 * quarterBlackKey },
  { note: "F5", duration: quarterBlackKey, time: "+" + 20 * quarterBlackKey },
  { note: "A4", duration: quarterBlackKey, time: "+" + 21 * quarterBlackKey },
  { note: "D5", duration: quarterBlackKey, time: "+" + 22 * quarterBlackKey },
  { note: "F5", duration: quarterBlackKey, time: "+" + 23 * quarterBlackKey },
  { note: "C4", duration: quarterBlackKey, time: "+" + 24 * quarterBlackKey },
  { note: "D4", duration: quarterBlackKey, time: "+" + 25 * quarterBlackKey },
  { note: "A4", duration: quarterBlackKey, time: "+" + 26 * quarterBlackKey },
  { note: "D5", duration: quarterBlackKey, time: "+" + 27 * quarterBlackKey },
  { note: "F5", duration: quarterBlackKey, time: "+" + 28 * quarterBlackKey },
  { note: "A4", duration: quarterBlackKey, time: "+" + 29 * quarterBlackKey },
  { note: "D5", duration: quarterBlackKey, time: "+" + 30 * quarterBlackKey },
  { note: "F5", duration: quarterBlackKey, time: "+" + 31 * quarterBlackKey }


];

pieces.push(level1Piece);


//Outcomes

var outcomes = {};

outcomes.noteSuccess = { className: "note_success", text: "GREAT!" };
outcomes.tooLow = { className: "note_failure", text: "TOO LOW!" };
outcomes.tooHigh = { className: "note_failure", text: "TOO HIGH!!" };
outcomes.levelPassed = { className: "level_success", text: "AMAZING - LEVEL PASSED!!" };

