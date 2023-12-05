var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var playerPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
    var buttonName = $(this).attr("id");
    playerPattern.push(buttonName);
    buttonAnimation(buttonName);
    playSound(buttonName);
    checkAnswer(playerPattern.length - 1);
});

$(document).keypress(function () {
    if (!started) {
        $("h1").text("You are on level " + level);
        nextSequence();
        started = true
    }
});

function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkAnswer(pos) {
    if (playerPattern[pos] === gamePattern[pos]) {
        if (playerPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over, press any key to restart.")

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    playerPattern = [];
    level++;
    var newColor = buttonColors[randomNumber(0, 3)];
    $("h1").text("You are on level " + level);
    gamePattern.push(newColor);
    $("#" + newColor).fadeIn(100).fadeOut(100).fadeIn(100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(button) {
    var sample = new Audio("sounds/" + button + ".mp3");
    sample.play();
}

function buttonAnimation(button) {
    $("#" + button).addClass("pressed");

    setTimeout(function () {
        $("#" + button).removeClass("pressed");
    }
        , 100);
}