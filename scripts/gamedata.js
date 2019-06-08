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

//Level1 - WTC 1 JS BACH

var level1_part1 = new Tone.Part(function (time, event) {
  synth.triggerAttackRelease(event.note, event.dur, time)
}, [{ time: "0:0:0", note: 'C4', dur: '16n' },
{ time: "0:0:1", note: 'E4', dur: '16n' },
{ time: "0:0:2", note: 'G4', dur: '16n' },
{ time: "0:0:3", note: 'C5', dur: '16n' },
{ time: "0:0:4", note: 'E5', dur: '16n' },
{ time: "0:0:5", note: 'G4', dur: '16n' },
{ time: "0:0:6", note: 'C5', dur: '16n' },
{ time: "0:0:7", note: 'E5', dur: '16n' }
  ]);



var level1_part2 = new Tone.Part(function (time, event) {
  synth.triggerAttackRelease(event.note, event.dur, time)
}, [{ time: "0:0:0", note: 'C4', dur: '16n' },
{ time: "0:0:1", note: 'D4', dur: '16n' },
{ time: "0:0:2", note: 'A4', dur: '16n' },
{ time: "0:0:3", note: 'D5', dur: '16n' },
{ time: "0:0:4", note: 'F5', dur: '16n' },
{ time: "0:0:5", note: 'A4', dur: '16n' },
{ time: "0:0:6", note: 'D5', dur: '16n' },
{ time: "0:0:7", note: 'F5', dur: '16n' }
  ]);

var level1_part3 = new Tone.Part(function (time, event) {
  synth.triggerAttackRelease(event.note, event.dur, time)
}, [{ time: "0:0:0", note: 'C4', dur: '16n' },
{ time: "0:0:1", note: 'D4', dur: '16n' },
{ time: "0:0:2", note: 'A4', dur: '16n' },
{ time: "0:0:3", note: 'D5', dur: '16n' },
{ time: "0:0:4", note: 'F3', dur: '16n' },
{ time: "0:0:5", note: 'A4', dur: '16n' },
{ time: "0:0:6", note: 'D5', dur: '16n' },
{ time: "0:0:7", note: 'F5', dur: '16n' }
  ]);


