//Global Declarations

var pianoSampler, part, notesPlayed;
var keyLogger = [];
var currentLevelIndex = 0;
var currentLevel = levels[currentLevelIndex];
var pieceIndex = 0;
Tone.Transport.bpm.value = 140;
var microDelay = true;
var scoreLog = [];
var score = 0, message;

//Dom initialization

document.addEventListener("DOMContentLoaded", () => {

  displayPiano(5);
  document.getElementById("piano").addEventListener("mousedown", reactToMouseDown);
  document.getElementById("piano").addEventListener("mouseup", reactToMouseUp);
  document.getElementById("piece_button").addEventListener("click", playPiece);
  document.getElementById("start_button").addEventListener("click", moveToNextLevel);
  pianoSampler = new Tone.Sampler(pianoSample, () => console.log("All samples loaded")).toMaster();
  console.log(level1);
  loadLevel(currentLevel);

});

/*------------------------------------------------------Dom-related functions ---------------------------------------------------------*/

function loadLevel(level) {

  document.getElementById("banner").textContent = level.title;
  document.getElementById("main_picture").src = level.picture;
  document.getElementById("main_text_1").textContent = level.mainText1;
  document.getElementById("main_text_2").textContent = level.mainText2;
  document.getElementById("main_text_3").textContent = level.mainText3;
  if (document.getElementsByClassName("outcome")) { [...document.getElementsByClassName("outcome")].forEach(x => x.remove()) };
  if (level.pictureWidth) { document.getElementById("main_picture").style.width = level.pictureWidth; }
  document.getElementById("next_note").innerHTML = "Next: " + currentLevel.piece[pieceIndex].note;


  pieceIndex = 0;

}

function moveToNextLevel() {

  currentLevelIndex = currentLevelIndex + 1;
  console.log(currentLevelIndex);
  currentLevel = levels[currentLevelIndex];
  loadLevel(currentLevel);

}

function moveToLowerLevel() {

  currentLevelIndex = currentLevelIndex - 1;
  console.log(currentLevelIndex);

  currentLevel = levels[currentLevelIndex];
  loadLevel(currentLevel);
}

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
  playSound(convertSharpToMusicNotation(evt.target.id));
  compareNotesWithPiece(pressedKey.id, currentLevel.piece);

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

  keyToAnimateClasses = document.getElementById(key).classList;
  allKeysWithAnimations = document.querySelector(".heartbeat");
  if (allKeysWithAnimations) { allKeysWithAnimations.classList.remove("heartbeat") };

  if (microDelay) {
    setTimeout(() => {
      keyToAnimateClasses.add("heartbeat");
    }, 100)

  }
  else keyToAnimateClasses.add("heartbeat");

  // [...document.getElementsByClassName("heartbeat")].forEach(x => x.classList.remove("heartbeat"));

}

function displayGameOutcomes(outcome) {

  let newOutcome = document.createElement("p");

  newOutcome.classList.add(outcomes[outcome].className)
  newOutcome.classList.add("outcome");

  gameOutcomesElement = document.getElementById("game_outcomes");

  if (gameOutcomesElement.childElementCount == 105) gameOutcomesElement.removeChild(gameOutcomesElement.childNodes[5]);

  if (outcome == "levelPassed") {

    gameOutcomesElement.innerHTML = "";
    newOutcome.textContent = currentLevel.successText;

    gameOutcomesElement.append(newOutcome);

    nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Move to next level >>";
    nextLevelButton.addEventListener("click", moveToNextLevel);
    gameOutcomesElement.append(nextLevelButton);
  }

  else gameOutcomesElement.append(newOutcome);

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
  pianoSampler.triggerAttack(convertMusicNotationToSharp(note));

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

  currentLevel.piece.forEach((subPiece, index) => {

    playSubPieceEvents.push(function playSubPiece(time) {

      flashKey(document.getElementById(convertSharpToMusicNotation(subPiece.note)).id, "green");
      console.log("playing note " + convertSharpToMusicNotation(subPiece.note) + " at " + Tone.Transport.seconds);
      pianoSampler.triggerAttackRelease(subPiece.note, subPiece.duration, time);

    });

  });

  currentLevel.piece.forEach((subPiece, index) => Tone.Transport.scheduleOnce(playSubPieceEvents[index], subPiece.time));
  Tone.Transport.start();
}

function convertSharpToMusicNotation(note) {

  if (note.includes("#")) { newNote = note.replace("#", "sharp"); return newNote; } else return note;

}

function convertMusicNotationToSharp(note) {


  if (note.includes("sharp")) { newNote = note.replace("sharp", "#"); return newNote; } else return note;
}



function compareNotesWithPiece(notePlayed, currentPiece) {

  if (pieceIndex == (currentLevel.piece.length - 1)) {

    displayGameOutcomes("levelPassed");
    scoreSheet[currentLevelIndex] = score;
    score = 0;

  }

  else if (convertMusicNotationToSharp(notePlayed) == currentLevel.piece[pieceIndex].note) {

    status = "noteSuccess";
    computeScoreAndMessage(status);
    displayResults(status, score, message);
    flashKey(notePlayed, "green");
    pieceIndex++;

  }

  else if (Tone.Frequency(currentLevel.piece[pieceIndex].note) < Tone.Frequency(convertMusicNotationToSharp(notePlayed))) {

    status = "tooHigh";
    computeScoreAndMessage(status);
    displayResults(status, score, message);
    flashKey(notePlayed, "red");
    pieceIndex = 0;

  }

  else {

    status = "tooLow";
    computeScoreAndMessage(status);
    displayResults(status, score, message);
    flashKey(notePlayed, "red");
    pieceIndex = 0;
  }

}

function displayResults(status, score, message) {


  displayGameOutcomes(status);
  displayScore(score);
  displayMessage(message);
  document.getElementById("next_note").innerHTML = "Next: " + currentLevel.piece[pieceIndex + 1].note;

}



function computeScoreAndMessage(status) {

  if (status === "noteSuccess") { score++; message = "Well Done!"; }
  if (status === "tooHigh") { score--; message = "Too High!"; }
  if (status === "tooLow") { score--; message = "Too Low!"; }
  if (status === "combo3") { score = score + 3; message = "X3 COMBO!"; }
  if (status === "combo5") { score = score + 5; message = "X5 COMBO!"; }
  if (status === "combo10") { score = score + 10; message = "X10 COMBO!"; }
  if (status === "flawless") { score = score * 2; message = "PERFECT!!!"; }

}


function displayScore(score) {

  document.getElementById("score").innerHTML = "Score: " + score + " pts";

}

function displayMessage(message) {

  document.getElementById("message").innerHTML = message;

}