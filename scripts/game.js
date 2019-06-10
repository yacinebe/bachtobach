//Global Declarations

var pianoSampler, part, notesPlayed;
var blackKey = Tone.Time('+4n');
var halfBlackKey = Tone.Time('+8n');
var quarterBlackKey = Tone.Time('+16n');
var keyLogger = [];
var currentLevel = 1;
var pieceIndex = 0;

Tone.Transport.bpm.value = 140;

//Dom initialization

document.addEventListener("DOMContentLoaded", () => {

  displayPiano(5);
  document.getElementById("piano").addEventListener("mousedown", reactToMouseDown);
  document.getElementById("piano").addEventListener("mouseup", reactToMouseUp);
  // document.getElementById("start_button").addEventListener("click", initializeSound);
  document.getElementById("piece_button").addEventListener("click", playPiece);

  pianoSampler = new Tone.Sampler(pianoSample, () => console.log("All samples loaded")).toMaster();
  //  updateTime();

});

/*------------------------------------------------------Dom-related functions ---------------------------------------------------------*/

function displayPiano(numberOfOctaves, startKey, endKey) {

  let octaveElement = '<div class="white_key border_adjust_right" > </div> <div class="black_key"> </div> <div class="white_key border_adjust_right border_adjust_left"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left"> </div> <div class="white_key border_adjust_right"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left border_adjust_right"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_right border_adjust_left"> </div> <div class="black_key"> </div> <div class="white_key border_adjust_left"> </div>';

  let octaveContainer = '<div class="piano_octave"> </div>'

  for (let counterOfOctaves = 1; counterOfOctaves <= numberOfOctaves; counterOfOctaves++) {

    newOctave = document.createElement("div");
    newOctave.classList.add("piano_octave");
    newOctave.id = "Octave " + (counterOfOctaves + 1);
    newOctave.innerHTML = octaveElement;

    [...newOctave.getElementsByClassName("white_key")].forEach((key, index) => { key.id = indexKeyMappingWhite[index] + (counterOfOctaves + 1) });
    [...newOctave.getElementsByClassName("black_key")].forEach((key, index) => { key.id = indexKeyMappingBlack[index] + (counterOfOctaves + 1) });

    document.getElementById("piano").append(newOctave);
  }

}


function reactToMouseDown(evt) {

  pressedKey = evt.target;
  playSound(convertNoteSyntax(evt.target.id));
  compareNotesWithPiece(pressedKey.id, pieces[currentLevel]);

  //For debugging purposes
  let keyPlayed = {};
  keyPlayed.note = evt.target.id;
  keyPlayed.duration = null;
  keyPlayed.time = null;
  keyLogger.push(keyPlayed);

}

function reactToMouseUp(evt) {

  pressedKey = evt.target;
  releaseSound();

}

function flashKey(key, color, timing) {

  if (color) {

    root = document.documentElement;
    root.style.setProperty('--key-color', color);
  }

  [...document.getElementsByClassName("heartbeat")].forEach(x => x.classList.remove("heartbeat"));
  document.getElementById(key).classList.toggle("heartbeat");

}

function displayGameOutcomes(outcome) {



  let newOutcome = document.createElement("p");
  newOutcome.textContent = outcomes[outcome].text;
  newOutcome.classList.add(outcomes[outcome].className)
  newOutcome.classList.add("outcome");

  gameOutcomesElement = document.getElementById("game_outcomes");
  if (gameOutcomesElement.childElementCount == 6) gameOutcomesElement.removeChild(gameOutcomesElement.childNodes[5]);

  gameOutcomesElement.insertBefore(newOutcome, gameOutcomesElement.firstChild);

}

function updateTime() {

  requestAnimationFrame(updateTime)

  if ((Tone.context.currentTime) && (Tone.Transport.seconds)) {

    document.querySelector('#test_zone_time_audio').textContent = "Audio Time is " + Tone.context.currentTime.toFixed(3)
    document.querySelector('#test_zone_time_transport').textContent = "Transport Time is " + Tone.Transport.seconds.toFixed(3)

  }

}

/*------------------------------------------------------Sound-related functions ---------------------------------------------------------*/

function initializeSound(e) {


  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }

  // updateTime();

}

function playSound(note) {

  // console.log("Attacking note " + note);
  Tone.Transport.stop();
  pianoSampler.triggerAttack(convertNoteSyntax(note));

}

function releaseSound() {
  pianoSampler.triggerRelease();
}

function playPiece() {


  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }

  //pianoSampler.triggerAttack("C4", "4n");

  playSubPieceEvents = [];

  pieces[currentLevel].forEach((subPiece, index) => {

    playSubPieceEvents.push(function playSubPiece(time) {

      flashKey(document.getElementById(subPiece.note).id, "green");
      pianoSampler.triggerAttackRelease(subPiece.note, subPiece.duration, time);

      console.log("playing note " + index + " at " + Tone.Transport.seconds);

    });

  });

  pieces[currentLevel].forEach((subPiece, index) => Tone.Transport.scheduleOnce(playSubPieceEvents[index], subPiece.time));
  Tone.Transport.start();
}

function convertNoteSyntax(note) {

  if (note.includes("sharp")) { newNote = note.replace("sharp", "#"); return newNote; } else return note;

}

function compareNotesWithPiece(notePlayed, currentPiece) {

  if (pieceIndex == (currentPiece.length - 1)) displayGameOutcomes("levelPassed");

  else if (notePlayed == currentPiece[pieceIndex].note) {

    displayGameOutcomes("noteSuccess");
    flashKey(notePlayed, "green");
    pieceIndex++;

  }

  else if (Tone.Frequency(currentPiece[pieceIndex].note) < Tone.Frequency(notePlayed)) {

    displayGameOutcomes("tooHigh")
    flashKey(notePlayed, "red");
    pieceIndex = 0;
  }

  else {
    displayGameOutcomes("tooLow");
    flashKey(notePlayed, "red");
    pieceIndex = 0;

  }
}
