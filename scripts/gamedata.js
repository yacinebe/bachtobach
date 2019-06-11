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

// Time notations

var blackKey = Tone.Time('+4n');
var halfBlackKey = Tone.Time('+8n');
var quarterBlackKey = Tone.Time('+16n');

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



var level1Piece = [

  { note: "C4", duration: blackKey },
  { note: "D4", duration: blackKey, time: "+" + blackKey },
  { note: "E4", duration: blackKey, time: "+" + 2 * blackKey },
  { note: "C4", duration: blackKey, time: "+" + 3 * blackKey },

  { note: "C4", duration: blackKey, time: "+" + 4 * blackKey },
  { note: "D4", duration: blackKey, time: "+" + 5 * blackKey },
  { note: "E4", duration: blackKey, time: "+" + 6 * blackKey },
  { note: "C4", duration: blackKey, time: "+" + 7 * blackKey },

  { note: "E4", duration: blackKey, time: "+" + 8 * blackKey },
  { note: "F4", duration: blackKey, time: "+" + 9 * blackKey },
  { note: "G4", duration: 2 * blackKey, time: "+" + 10 * blackKey },

  { note: "E4", duration: blackKey, time: "+" + 12 * blackKey },
  { note: "F4", duration: blackKey, time: "+" + 13 * blackKey },
  { note: "G4", duration: 2 * blackKey, time: "+" + 14 * blackKey },

  { note: "G4", duration: halfBlackKey, time: "+" + 16 * blackKey },
  { note: "A4", duration: halfBlackKey, time: "+" + 16.5 * blackKey },
  { note: "G4", duration: halfBlackKey, time: "+" + 17 * blackKey },
  { note: "F4", duration: halfBlackKey, time: "+" + 17.5 * blackKey },
  { note: "E4", duration: blackKey, time: "+" + 18 * blackKey },
  { note: "C4", duration: blackKey, time: "+" + 19 * blackKey },

  { note: "G4", duration: halfBlackKey, time: "+" + 20 * blackKey },
  { note: "A4", duration: halfBlackKey, time: "+" + 20.5 * blackKey },
  { note: "G4", duration: halfBlackKey, time: "+" + 21 * blackKey },
  { note: "F4", duration: halfBlackKey, time: "+" + 21.5 * blackKey },
  { note: "E4", duration: blackKey, time: "+" + 22 * blackKey },
  { note: "C4", duration: blackKey, time: "+" + 23 * blackKey },

  { note: "C4", duration: blackKey, time: "+" + 24 * blackKey },
  { note: "G3", duration: blackKey, time: "+" + 25 * blackKey },
  { note: "C4", duration: 2 * blackKey, time: "+" + 26 * blackKey },


  { note: "C4", duration: blackKey, time: "+" + 29 * blackKey },
  { note: "G3", duration: blackKey, time: "+" + 30 * blackKey },
  { note: "C4", duration: 2 * blackKey, time: "+" + 31 * blackKey }


];


var level2Piece = [

  { note: "A4", duration: blackKey },
  { note: "E4", duration: 1.5 * blackKey, time: "+" + blackKey },
  { note: "A4", duration: blackKey, time: "+" + 2.5 * blackKey },
  { note: "A4", duration: quarterBlackKey, time: "+" + 3.5 * blackKey },
  { note: "B4", duration: quarterBlackKey, time: "+" + 3.75 * blackKey },
  { note: "C#5", duration: quarterBlackKey, time: "+" + 4 * blackKey },
  { note: "D5", duration: quarterBlackKey, time: "+" + 4.25 * blackKey },
  { note: "E5", duration: 2 * blackKey, time: "+" + 4.5 * blackKey },

  { note: "E5", duration: 2 * blackKey, time: "+" + 7 * blackKey },
  { note: "E5", duration: 0.33 * blackKey, time: "+" + 9 * blackKey },
  { note: "F5", duration: 0.33 * blackKey, time: "+" + 9.33 * blackKey },
  { note: "G5", duration: 0.33 * blackKey, time: "+" + 9.66 * blackKey },
  { note: "A5", duration: 1.5 * blackKey, time: "+" + 10 * blackKey },

  { note: "A5", duration: 0.5 * blackKey, time: "+" + 11.5 * blackKey },
  { note: "A5", duration: 0.33 * blackKey, time: "+" + 12 * blackKey },
  { note: "G5", duration: 0.33 * blackKey, time: "+" + 12.33 * blackKey },
  { note: "F5", duration: 0.33 * blackKey, time: "+" + 12.66 * blackKey },
  { note: "G5", duration: 0.75 * blackKey, time: "+" + 13.00 * blackKey },
  { note: "F5", duration: 0.25 * blackKey, time: "+" + 13.75 * blackKey },
  { note: "E5", duration: 2 * blackKey, time: "+" + 14 * blackKey },

]

var level3Piece = [

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


]

var level4Piece =

  [

    { note: "C#5", duration: 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * halfBlackKey, time: "+" + 0.7 * halfBlackKey },
    { note: "B4", duration: 0.7 * halfBlackKey, time: "+" + 2 * 0.7 * halfBlackKey },
    { note: "C#5", duration: blackKey, time: "+" + 3 * 0.7 * halfBlackKey },
    { note: "A4", duration: 3 * 0.7 * halfBlackKey, time: "+" + 5 * 0.7 * halfBlackKey },

    { note: "C#5", duration: 0.7 * halfBlackKey, time: "+" + 8 * 0.7 * halfBlackKey },
    { note: "B4", duration: 2 * 0.7 * halfBlackKey, time: "+" + 9 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * blackKey, time: "+" + 11 * 0.7 * halfBlackKey },
    { note: "F#4", duration: 0.7 * 3 * halfBlackKey, time: "+" + 13 * 0.7 * halfBlackKey },

    { note: "A4", duration: 0.7 * 2 * halfBlackKey, time: "+" + 16 * 0.7 * halfBlackKey },
    { note: "B4", duration: 2 * 0.7 * halfBlackKey, time: "+" + 18 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * blackKey, time: "+" + 20 * 0.7 * halfBlackKey },
    { note: "F#4", duration: 0.7 * halfBlackKey, time: "+" + 22 * 0.7 * halfBlackKey },

    { note: "G#4", duration: 0.7 * halfBlackKey, time: "+" + 23 * 0.7 * halfBlackKey },
    { note: "F#4", duration: 0.7 * halfBlackKey, time: "+" + 24 * 0.7 * halfBlackKey },
    { note: "G#4", duration: 0.7 * halfBlackKey, time: "+" + 25 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * blackKey, time: "+" + 26 * 0.7 * halfBlackKey },
    { note: "B4", duration: 0.7 * 2.5 * blackKey, time: "+" + 28 * 0.7 * halfBlackKey },

    { note: "C#5", duration: 0.7 * halfBlackKey, time: "+" + 33 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * halfBlackKey, time: "+" + 34 * 0.7 * halfBlackKey },
    { note: "B4", duration: 0.7 * halfBlackKey, time: "+" + 35 * 0.7 * halfBlackKey },
    { note: "C#5", duration: blackKey, time: "+" + 36 * 0.7 * halfBlackKey },
    { note: "A4", duration: 3 * 0.7 * halfBlackKey, time: "+" + 38 * 0.7 * halfBlackKey },

    { note: "C#5", duration: 0.7 * halfBlackKey, time: "+" + 41 * 0.7 * halfBlackKey },
    { note: "B4", duration: 2 * 0.7 * halfBlackKey, time: "+" + 42 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * blackKey, time: "+" + 44 * 0.7 * halfBlackKey },
    { note: "F#4", duration: 0.7 * 3 * halfBlackKey, time: "+" + 46 * 0.7 * halfBlackKey },

    { note: "C#5", duration: 0.7 * halfBlackKey, time: "+" + 49 * 0.7 * halfBlackKey },
    { note: "B4", duration: 2 * 0.7 * halfBlackKey, time: "+" + 50 * 0.7 * halfBlackKey },
    { note: "A4", duration: 0.7 * blackKey, time: "+" + 52 * 0.7 * halfBlackKey },
    { note: "G#4", duration: 0.7 * 5 * halfBlackKey, time: "+" + 54 * 0.7 * halfBlackKey },

    //{ note: "A4", duration: halfBlackKey + blackKey, time: "+" + 5 * halfBlackKey } */B

  ]
















var level5Piece = [

  { note: "D4", duration: 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 0.65 * blackKey },
  { note: "A#3", duration: 0.65 * blackKey, time: "+" + 2 * 0.65 * blackKey },
  { note: "D4", duration: 0.65 * blackKey, time: "+" + 3 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 4 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 5 * 0.65 * blackKey },
  { note: "F4", duration: 0.65 * blackKey, time: "+" + 6 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 7 * 0.65 * blackKey },

  { note: "D4", duration: 0.65 * blackKey, time: "+" + 8 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 9 * 0.65 * blackKey },
  { note: "A#3", duration: 0.65 * blackKey, time: "+" + 10 * 0.65 * blackKey },
  { note: "D4", duration: 0.65 * blackKey, time: "+" + 11 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 12 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 13 * 0.65 * blackKey },
  { note: "F4", duration: 0.65 * blackKey, time: "+" + 14 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 15 * 0.65 * blackKey },

  { note: "D4", duration: 0.65 * blackKey, time: "+" + 16 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 17 * 0.65 * blackKey },
  { note: "A#3", duration: 0.65 * blackKey, time: "+" + 18 * 0.65 * blackKey },
  { note: "D4", duration: 0.65 * blackKey, time: "+" + 19 * 0.65 * blackKey },
  { note: "A4", duration: 0.65 * blackKey, time: "+" + 20 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 21 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 22 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 23 * 0.65 * blackKey },

  { note: "D4", duration: 0.65 * blackKey, time: "+" + 16 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 17 * 0.65 * blackKey },
  { note: "A#3", duration: 0.65 * blackKey, time: "+" + 18 * 0.65 * blackKey },
  { note: "D4", duration: 0.65 * blackKey, time: "+" + 19 * 0.65 * blackKey },
  { note: "A4", duration: 0.65 * blackKey, time: "+" + 20 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 21 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 22 * 0.65 * blackKey },
  { note: "G3", duration: 0.65 * blackKey, time: "+" + 23 * 0.65 * blackKey },


  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 24 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 25 * 0.65 * blackKey },
  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 26 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 27 * 0.65 * blackKey },
  { note: "D5", duration: 0.65 * blackKey, time: "+" + 28 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 29 * 0.65 * blackKey },
  { note: "C5", duration: 0.65 * blackKey, time: "+" + 30 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 31 * 0.65 * blackKey },


  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 24 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 25 * 0.65 * blackKey },
  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 26 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 27 * 0.65 * blackKey },
  { note: "D5", duration: 0.65 * blackKey, time: "+" + 28 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 29 * 0.65 * blackKey },
  { note: "C5", duration: 0.65 * blackKey, time: "+" + 30 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 31 * 0.65 * blackKey },


  { note: "A#4", duration: 0.65 * blackKey, time: "+" + 32 * 0.65 * blackKey },
  { note: "C4", duration: 0.65 * blackKey, time: "+" + 33 * 0.65 * blackKey },
  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 34 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 35 * 0.65 * blackKey },
  { note: "A4", duration: 0.65 * blackKey, time: "+" + 36 * 0.65 * blackKey },
  { note: "D#4", duration: 0.65 * blackKey, time: "+" + 37 * 0.65 * blackKey },
  { note: "F4", duration: 0.65 * blackKey, time: "+" + 38 * 0.65 * blackKey },
  { note: "C5", duration: 0.65 * blackKey, time: "+" + 39 * 0.65 * blackKey },

  { note: "D4", duration: 0.65 * blackKey, time: "+" + 40 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 41 * 0.65 * blackKey },
  { note: "A#3", duration: 0.65 * blackKey, time: "+" + 42 * 0.65 * blackKey },
  { note: "D4", duration: 0.65 * blackKey, time: "+" + 43 * 0.65 * blackKey },
  { note: "G4", duration: 0.65 * blackKey, time: "+" + 44 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 45 * 0.65 * blackKey },
  { note: "F4", duration: 0.65 * blackKey, time: "+" + 46 * 0.65 * blackKey },
  { note: "F3", duration: 0.65 * blackKey, time: "+" + 47 * 0.65 * blackKey },



];


//pieces.push(level1Piece);

var level1 = {

  title: "LEVEL I - BROTHER JOHN",
  picture: "./images/brotherjohn.jpg",

  piece: level1Piece,
  mainText1: "Frère Jacques (in the nursery rhyme and in song more generally), also known in English as Brother John, is a nursery rhyme of French origin. The rhyme is traditionally sung in a round.The song is about a friar who has overslept and is urged to wake up and sound the bell for the matins, the midnight or very early morning prayers for which a monk would be expected to wake.",
  mainText2: "This is an easy piece to warm up and introduce you to the game!",
  mainText3: "Make sure to sing along!",
  successText: "Well Done! Brother John is now awake... You pass to the next level",
  piece: level1Piece

}



var level2 =

{

  title: "LEVEL II - THE LEGEND OF ZELDA",
  picture: "./images/zelda.jpg",
  mainText1: "The Legend of Zelda is a fantasy action-adventure video game franchise created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka. It is primarily developed and published by Nintendo, although some portable installments and re-releases have been outsourced to Capcom, Vanpool, and Grezzo. The series' gameplay incorporates action-adventure and elements of action RPG games",
  mainText2: "Here we play the main theme from the original NES version!!",
  mainText3: "Enjoy!!",
  successText: "PRINCESS SAVED !! LET's MOVE ON TO THE NEXT LEVEL",
  piece: level2Piece,

}



var level3 =

{

  title: "LEVEL III - BACH TO BACH",
  picture: "./images/bach.jpg",
  pictureWidth: "80%",
  mainText1: "Johann Sebastian Bach[a] (31 March [O.S. 21 March] 1685 – 28 July 1750) was a German composer and musician of the Baroque period. He is known for instrumental compositions such as the Art of Fugue, the Brandenburg Concertos, and the Goldberg Variations as well as for vocal music such as the St Matthew Passion and the Mass in B minor. Since the 19th-century Bach Revival he has been generally regarded as one of the greatest composers of all time.",
  mainText2: "This piece is the well-know first prelude in C Minor for the Well-tempered clavier. An absolute classique that everyone loves to listen to",
  maintText3: "You only have to play the first bar here! Have fun!",
  successText: "LEVEL PASSED!!! YOU ARE A MASTER OF BAROQUE MUSIC",
  piece: level3Piece
}




var level4 =

{

  title: "LEVEL IV - THE BEATLES",
  picture: "./images/beatles.jpg",
  mainText1: "The Beatles were an English rock band formed in Liverpool in 1960. The line-up of John Lennon, Paul McCartney, George Harrison and Ringo Starr led the band to be regarded as the foremost and most influential in history.With a sound rooted in skiffle, beat and 1950s rock and roll, the group were integral to the evolution of pop music into an art form, and to the development of the counterculture of the 1960s.",
  mainText2: "Here Comes the Sun is a song written by George Harrison that was first released on the Beatles' 1969 album Abbey Road. Along with 'Something' and 'While My Guitar Gently Weeps', it is one of Harrison's best-known compositions from the Beatles era.",
  mainText3: "Have fun playting this iconic song!!!",
  successText: "YOU MADE THE SUN SHINE TODAY - WELCOME TO LEVEL 48!!",
  piece: level4Piece



}

var level5 = {

  title: "LEVEL V - QUEEN",
  picture: "./images/queen.jpg",
  pictureWidth: "80%",

  mainText1: "Queen are a British rock band formed in London in 1970. Their classic line-up was Freddie Mercury (lead vocals and piano), Brian May (lead guitar and vocals), Roger Taylor (drums and vocals) and John Deacon (bass guitar). Their earliest works were influenced by progressive rock, hard rock and heavy metal, but the band gradually ventured into more conventional and radio-friendly works by incorporating further styles, such as arena rock and pop rock.",
  mainText2: "Although critical reaction was initially mixed, 'Bohemian Rhapsody' became Queen's most popular song and is considered one of the greatest rock songs",
  mainText3: "After playing it you should be ready to go on stage!!!",
  successText: "LEVEL PASSED. YOU ROOOOCK, MEET YOU IN WEMBLEY",
  piece: level5Piece

};
var levels = [level1, level2, level3, level4, level5];

//Outcomes

var outcomes = {};

outcomes.noteSuccess = { className: "note_success" };
outcomes.tooLow = { className: "note_failure" };
outcomes.tooHigh = { className: "note_failure" };
outcomes.levelPassed = { className: "level_success" };

