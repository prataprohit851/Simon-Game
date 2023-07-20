
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern  = [];
var toggle = true;
var level = 0;
$(document).keypress(function(){
    if(toggle){
        $("h1").text("Level " + level);
        toggle = false;
        nextSequence();
    }
});

function nextSequence(){
    setTimeout(function() {
        console.log("ve");
        userClickedPattern  = [];
        level++;
        $("h1").text("Level " + level);


        var randNum = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randNum];

        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        gamePattern.push(randomChosenColour);
        playSound(randomChosenColour);
    }, 200);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass('pressed');
    }, 100);
}

function checkAnswer(ind){
    if(userClickedPattern[ind] == gamePattern[ind]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern.clear;
            }, 1000);
        }
    }
    else{
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Gamer Over. Press Any Button To Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    toggle = true;
}