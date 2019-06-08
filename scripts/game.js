//Global Declarations 

var synth, part, notesPlayed;

//Dom functions

document.addEventListener("DOMContentLoaded", () => {

  displayPiano(4);
  document.getElementById("piano").addEventListener("click", reactToKeyPress);
  document.getElementById("start_button").addEventListener("click", initializeSound);
  document.getElementById("piece_button").addEventListener("click", playPiece);

});

function displayPiano(numberOfOctaves, startKey, endKey) {

  let octaveElement = '<div class="white_key border_adjust_right" > </div> <div class="black_key"> </div> <div class="white_key border_adjust_right border_adjust_left"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left"> </div> <div class="white_key border_adjust_right"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left border_adjust_right"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_right border_adjust_left"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left"> </div>';

  let octaveContainer = '<div class="piano_octave"> </div>'

  for (let counterOfOctaves = 0; counterOfOctaves <= numberOfOctaves; counterOfOctaves++) {

    newOctave = document.createElement("div");
    newOctave.classList.add("piano_octave");
    newOctave.id = "Octave " + (counterOfOctaves + 1);
    newOctave.innerHTML = octaveElement;

    [...newOctave.getElementsByClassName("white_key")].forEach((key, index) => { key.id = indexKeyMappingWhite[index] + (counterOfOctaves + 1) });
    [...newOctave.getElementsByClassName("black_key")].forEach((key, index) => { key.id = indexKeyMappingBlack[index] + (counterOfOctaves + 1) });

    document.getElementById("piano").append(newOctave);
  }

}

function reactToKeyPress(evt) {

  pressedKey = event.target;
  flashKey(pressedKey);
  playSound(convertNoteSyntax(event.target.id), "8n");

  notePlayed = document.createElement("p");
  notePlayed.textContent = ((pressedKey.className.includes("white_key")) || (pressedKey.className.includes("black_key"))) ? pressedKey.id : "";

  document.getElementById("test_zone").append(notePlayed);

}


function flashKey(key, color, timing) {

  [...document.getElementsByClassName("heartbeat")].forEach(x => x.classList.remove("heartbeat"));
  key.classList.toggle("heartbeat");

  //setTimeout(() => { if (key.classList.className.includes("hearbeat")) key.classList.toggle("heartbeat"); }, 1000);

}


// Sound initialization

function initializeSound(e) {

  synth = new Tone.Synth().toMaster();
  Tone.Transport.bpm.value = 100;
  Tone.Transport.start(0)
  //level1_part1.start();
}


function playSound(note, length) {

  synth.triggerAttackRelease(convertNoteSyntax(note), "8n");

}

function playPiece() {

  console.log("Playing part 1 now");
  level1_part1.start();

  console.log("Playing part 2 in " + Tone.Time("+2n"));
  level1_part2.start("+2n");

  /* console.log("Playing part 3 in " + Tone.Time("+2n"));
   level1_part3.start("+2n"); */


}

function convertNoteSyntax(note) {

  if (note.includes("sharp")) { newNote = note.replace("sharp", "#"); return newNote; } else return note;

}

