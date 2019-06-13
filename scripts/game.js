//Global Declarations

var pianoSampler, part, notesPlayed;
var keyLogger = [];
var currentLevelIndex = 0;
var currentLevel = levels[currentLevelIndex];
var pieceIndex = 0;
var microDelay = true;
var scoreLog = [], scoreSheet = [];
var resultsLog = [];
var score = 0;
var message;
Tone.Transport.bpm.value = 140;

//Dom initialization

document.addEventListener("DOMContentLoaded", () => {

  displayPiano(5);
  document.getElementById("piano").addEventListener("mousedown", reactToMouseDown);
  document.getElementById("piano").addEventListener("mouseup", reactToMouseUp);
  document.getElementById("piece_button").addEventListener("click", playPiece);
  //document.getElementById("start_button").addEventListener("click", moveToNextLevel);
  pianoSampler = new Tone.Sampler(pianoSample, () => console.log("All samples loaded")).toMaster();
  console.log(currentLevel);
  loadLevel(currentLevel);

});

/*------------------------------------------------------Dom-related functions ---------------------------------------------------------*/

function loadLevel(level) {

  if (document.getElementById("level_text")) document.getElementById("level_text").remove();
  if (document.getElementById("title_text")) document.getElementById("title_text").remove();

  level = document.createElement("p");
  level.id = "title_text";
  level.textContent = currentLevel.title;

  title = document.createElement("p");
  title.id = "level_text";
  title.textContent = currentLevel.levelNumber;

  titleAndLevel = document.createElement("div");
  titleAndLevel.id = "title_and_level";

  document.getElementById("banner").insertBefore(titleAndLevel, document.getElementById("buttons_container"));
  document.getElementById("title_and_level").append(title);
  document.getElementById("title_and_level").append(level);



  // document.getElementById("banner").insertBefore(level, title);


  displayTempo();

  document.getElementById("plus").addEventListener("click", increaseTempo);
  document.getElementById("minus").addEventListener("click", decreaseTempo);

  document.getElementById("main_picture").src = currentLevel.picture;
  document.getElementById("main_text_1").textContent = currentLevel.mainText1;
  document.getElementById("main_text_2").textContent = currentLevel.mainText2;
  document.getElementById("main_text_3").textContent = currentLevel.mainText3;

  if (document.getElementsByClassName("outcome")) { [...document.getElementsByClassName("outcome")].forEach(x => x.remove()) };
  if (document.querySelector("#game_outcomes button")) { document.querySelector("#game_outcomes button").remove() };
  if (level.pictureWidth) { document.getElementById("main_picture").style.width = level.pictureWidth; }
  if (document.getElementById("footer_bar")) document.getElementById("footer_bar").remove();
  if (document.getElementById("progress_bar")) document.getElementById("progress_bar").remove();
  if (document.getElementsByClassName("message")) [...document.getElementsByClassName("message")].forEach(x => x.remove());


  pieceIndex = 0;

  //Preparing the progress bar

  progressBar = document.createElement("div");
  progressBar.id = "progress_bar";
  document.getElementById("game_outcomes").append(progressBar);

  // Preparing the message panel


  message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = "Let's start!";

  document.getElementById("game_outcomes").append(message);


  //Preparing the footer with the three elements

  footerBar = document.createElement("div");
  footerBar.id = "footer_bar";

  scoreField = document.createElement("footer");
  scoreField.id = "score";
  scoreField.innerHTML = "Score: 0 pts"

  chronoField = document.createElement("footer");
  chronoField.id = "chrono";
  chronoField.innerHTML = currentLevel.counter + 1 + " sec";


  nextNote = document.createElement("footer");
  nextNote.id = "next_note";
  nextNote.innerHTML = "Next: " + currentLevel.piece[pieceIndex].note;

  footerBar.append(scoreField);

  footerBar.append(nextNote);
  footerBar.append(chronoField);
  document.getElementById("game_outcomes").append(footerBar);

  loadPiece();
  startChrono();

}

function moveToNextLevel() {

  stopChrono();
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
    if (color == "green") root.style.setProperty('--key-color', 'rgb(103, 175, 103)');
    else if (color == "red") root.style.setProperty('--key-color', 'rgb(255, 0, 74)');
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

  console.log(outcome);

  //New outcome elements to add depending on result action - We differentiate between progress (red and green squares) and sucess (messages)

  let newProgressOutcome = document.createElement("p");
  newProgressOutcome.classList.add(outcomes[outcome].className);
  newProgressOutcome.classList.add("progress");
  //newProgressOutcome.classList.add("outcome");

  let newSuccessOutcome = document.createElement("p");
  newSuccessOutcome.classList.add(outcomes[outcome].className);
  newSuccessOutcome.classList.add("outcome");

  //An additional outcome in case of "Perfect"

  optionalPerfectOutcome = document.createElement("p");
  optionalPerfectOutcome.classList.add("perfect");
  optionalPerfectOutcome.classList.add("outcome");
  optionalPerfectOutcome.innerHTML = "PERFEEEECT! YOU MADE ZERO MISTAKES";

  //Selecting the outcome area

  gameOutcomesElement = document.getElementById("game_outcomes");
  progressBar = document.getElementById("progress_bar");

  //First case is when the player succeeds

  if (outcome == "levelPassed" || outcome == "levelPassedWithPerfect") {

    currentLevel.state = "finished";

    //We clean the outcome area first to display the 'Win' message

    if (document.getElementsByClassName("note_success")) [...document.getElementsByClassName("note_success")].forEach(x => x.remove());
    if (document.getElementsByClassName("note_failure")) [...document.getElementsByClassName("note_failure")].forEach(x => x.remove());
    document.getElementById("progress_bar").remove();
    document.getElementById("footer_bar").remove();
    [...document.getElementsByClassName("message")].forEach(x => x.remove());

    //THe outcome to display includes a success text

    newSuccessOutcome.textContent = currentLevel.successText;
    // If we pass with perfect we display the optional perfect one
    if (outcome == "levelPassedWithPerfect") { gameOutcomesElement.append(optionalPerfectOutcome); }

    //We display the game sucess outcome

    gameOutcomesElement.append(newSuccessOutcome);

    //And finally we add a button to move to the next level

    nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Move to next level >>";
    nextLevelButton.addEventListener("click", moveToNextLevel);
    gameOutcomesElement.append(nextLevelButton);

  }

  else if ((outcome === "noteSuccess") || (outcome === "combo5") || (outcome === "combo10") && (currentLevel.state != "finished")) {

    for (let counter = 0; counter < Math.floor(100 / currentLevel.piece.length); counter++) {

      let duplicate = newProgressOutcome.cloneNode();
      progressBar.append(duplicate);

    }

  }

  else if ((outcome === "tooHigh") || (outcome === "tooLow") && (currentLevel.state != "finished")) {

    if (document.getElementsByClassName("progress")) {

      [...document.getElementsByClassName("progress")].forEach(x => x.remove());

    }
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
  Tone.Transport.pause();

  //switchFromPlayToPause();
  //document.getElementById("piece_button_image").src = "http://localhost:3000/images/play.png";

  pianoSampler.triggerAttack(convertMusicNotationToSharp(note));

}

function releaseSound() {
  pianoSampler.triggerRelease();
}

function loadPiece() {

  Tone.Transport.cancel();
  Tone.Transport.stop();

  //document.getElementById("piece_button_image").src = "http://localhost:3000/images/play.png";

  playSubPieceEvents = [];

  currentLevel.piece.forEach((subPiece, index) => {

    playSubPieceEvents.push(function playSubPiece(time) {

      flashKey(document.getElementById(convertSharpToMusicNotation(subPiece.note)).id, "green");
      console.log("playing note " + convertSharpToMusicNotation(subPiece.note) + " at " + Tone.Transport.seconds);
      pianoSampler.triggerAttackRelease(subPiece.note, subPiece.duration, time);

      if (index == currentLevel.piece.length - 1) {
        setTimeout(() => console.log("waiting"), 1000); handleEndOfPiece()
      };

    });




  });



  currentLevel.piece.forEach((subPiece, index) => Tone.Transport.scheduleOnce(playSubPieceEvents[index], subPiece.time));
  //  Tone.Transport.scheduleOnce(handleEndOfPiece, Tone.Time(currentLevel.piece[currentLevel.piece.length - 1].time) + Tone.Time("+8n"));


}

function handleEndOfPiece() {

  console.log("handling end of piece at " + Tone.Transport.seconds);

  //  document.getElementById("piece_button_image").src = "http://localhost:3000/images/play.png";
  Tone.Transport.cancel();
  loadPiece();

}


function playPiece() {

  console.log("From " + Tone.Transport.state);



  if (Tone.context.state !== 'running') Tone.context.resume();

  if (Tone.Transport.state == "stopped") Tone.Transport.start();
  else if (Tone.Transport.state == "started") Tone.Transport.pause();
  else if (Tone.Transport.state == "paused") Tone.Transport.start();

  //if ((document.getElementById("piece_button_image")).src == "http://localhost:3000/images/pause.png") document.getElementById("piece_button_image").src = "http://localhost:3000/images/play.png";
  //else if ((document.getElementById("piece_button_image")).src == "http://localhost:3000/images/play.png") document.getElementById("piece_button_image").src = "http://localhost:3000/images/pause.png";


  console.log("To " + Tone.Transport.state);


}

function convertSharpToMusicNotation(note) {

  if (note.includes("#")) { newNote = note.replace("#", "sharp"); return newNote; } else return note;

}

function convertMusicNotationToSharp(note) {


  if (note.includes("sharp")) { newNote = note.replace("sharp", "#"); return newNote; } else return note;
}



function compareNotesWithPiece(notePlayed, currentPiece) {

  //The note played is right

  if (convertMusicNotationToSharp(notePlayed) == currentLevel.piece[pieceIndex].note) {


    //...and the piece is over

    if (pieceIndex == (currentLevel.piece.length - 1)) {

      if (resultsLog.reduce((accumulator, currentValue) => accumulator = accumulator * (currentValue[0] === "noteSuccess"), true) == 1) status = "levelPassedWithPerfect"
      else status = "levelPassed";


      displayGameOutcomes(status);
      scoreSheet[currentLevelIndex] = score;

      score = 0;
      resultsLog = [];

    }

    //...and the piece is still going on

    else {


      status = "noteSuccess";

      flashKey(notePlayed, "green");

      resultsLog.push([status, pieceIndex]);
      if ((checkCombo(resultsLog) % 10 == 0) && (resultsLog.length > 0)) { status = "combo10"; resultsLog[resultsLog.length - 1][0] = "combo10"; }
      else if ((checkCombo(resultsLog) % 5 == 0) && (resultsLog.length > 0)) { console.log("combo4"); status = "combo5"; resultsLog[resultsLog.length - 1][0] = "combo5"; }

      computeScoreAndMessage(status);
      pieceIndex++;
      displayResults(status, score, message);
    }
  }

  else if (Tone.Frequency(currentLevel.piece[pieceIndex].note) < Tone.Frequency(convertMusicNotationToSharp(notePlayed))) {

    status = "tooHigh";
    computeScoreAndMessage(status);

    flashKey(notePlayed, "red");

    resultsLog.push([status, pieceIndex]);
    pieceIndex = 0;
    displayResults(status, score, message);

  }

  else {

    status = "tooLow";
    computeScoreAndMessage(status);

    flashKey(notePlayed, "red");

    resultsLog.push([status, pieceIndex]);
    pieceIndex = 0;
    displayResults(status, score, message);
  }

}

function checkCombo(log) {

  //Find the first non sucess elemnt starting from the end

  let indexOfFirstFail = 0;

  for (index = log.length - 1; index >= 0; index--) {

    if ((log[index][0] != "noteSuccess") && (log[index][0] != "combo5") && (log[index][0] != "combo10")) {

      indexOfFirstFail = index;
      break;
    }

  }

  if (indexOfFirstFail > 0) comboIndex = log.length - 1 - indexOfFirstFail; else comboIndex = log.length;
  return comboIndex;

}




function displayResults(status, score, message) {


  displayGameOutcomes(status);
  displayScore(score);
  displayMessage(message, status);
  document.getElementById("next_note").innerHTML = "Next: " + currentLevel.piece[pieceIndex].note;

}



function computeScoreAndMessage(status) {

  if (status === "noteSuccess") { score++; message = "Well Done!"; }
  if (status === "tooHigh") { score--; message = "Too High!"; }
  if (status === "tooLow") { score--; message = "Too Low!"; }
  if (status === "flawless") { score = score * 2; message = "PERFECT!!!"; }

  if (status === "combo3") { score = score + 3; message = "X3 COMBO!"; }
  if (status === "combo5") { score = score + 5; message = "X5 COMBO!"; }
  if (status === "combo10") { score = score + 10; message = "X10 COMBO!"; }

}


function displayScore(score) {

  document.getElementById("score").innerHTML = "Score: " + score + " pts";

}

function displayMessage(message, status) {

  document.getElementsByClassName("message")[0].innerHTML = message;
  document.getElementsByClassName("message")[0].id = status;

  /* if ((message != "combo5" && message != "combo10")) document.getElementsByClassName("message")[0].id = status;
  else if (status == "combo5") document.getElementsByClassName("message")[0].id = "combo5";
  else if (status == "combo10") document.getElementsByClassName("message")[0].id = "combo10"; */

}


function displayTempo() {
  document.getElementById("tempo").innerHTML = Tone.Transport.bpm.value.toFixed(0) + " bpm";

}

function increaseTempo() { Tone.Transport.bpm.value = Tone.Transport.bpm.value + 10; displayTempo() }
function decreaseTempo() { Tone.Transport.bpm.value = Tone.Transport.bpm.value - 10; displayTempo() }

function startChrono() {



  intervalId = setInterval(() => { displayChrono(currentLevel.counter); currentLevel.counter--; }, 1000);

}


function stopChrono() {

  clearInterval(intervalId);
}

function displayChrono(counter) {

  if (counter >= 0) document.getElementById("chrono").innerHTML = counter + " sec";
};

function switchFromPlayToPause() {

  if (document.getElementById("piece_button").innerHTML = "Play") document.getElementById("piece_button").innerHTML = "Pause";
  else if (document.getElementById("piece_button").innerHTML = "Pause") document.getElementById("piece_button").innerHTML = "Play";

}


