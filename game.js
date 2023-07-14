//array of game colors
var buttonColors = ["red", "blue", "green", "yellow"];
//array holding the user click pattern
var userClickedPattern = [];
//array to store game pattern
var gamePattern = [];
//assign game start variable and set game level to 0
var started = false;
var level = 0;

//starts Game on keydown by calling newSequence
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//add event listener to all buttons
$(".btn").click(function () {
  //assign clicked button id to variable userChosenColor
  var userChosenColor = $(this).attr("id");
  //push userChosenColor to the end of userClickedPattern array
  userClickedPattern.push(userChosenColor);
  //add and remove the .pressed class to the clicked button after 200 ms
  animatePress(userChosenColor);
  //calls function to play sound on buttonclick
  playSound(userChosenColor);
  //calls function to check if
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //empties userClickedPattern array
  userClickedPattern = [];
  //increases level count
  level++;
  //edit the h1 tag to dipslay level # on button down
  $("#level-title").text("Level " + level);
  //create a random number between 0 and 3 - corresponds to index values in buttonColors array
  var randomNumber = Math.floor(Math.random() * 4);
  //assigns color from buttonColors array to variable randomChosenColor
  var randomChosenColor = buttonColors[randomNumber];
  //push color to gamePattern array
  gamePattern.push(randomChosenColor);

  //select the button element with the same id as the random color and flashes
  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeIn(200);
  //call function to play sound file associated with randomChosenColor variable
  playSound(randomChosenColor);
}

//function to play button sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate the pressed button on and off
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

//function to check if userClickedPattern is equal to the gamePattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  setTimeout(function () {
    $("#level-title").text("Press A Key to Start");
  }, 1000);
}
