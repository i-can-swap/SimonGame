var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
 var userChosenColor = this.id;           //alt: event.target.id;
 userClickedPattern.push(userChosenColor);
 
 playSound(userChosenColor);
 animmatePress(userChosenColor);
 checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   
    playSound(randomChosenColor);
    switch(randomChosenColor){
        case "red":
            $(".red").fadeOut(100).fadeIn(100);
        break;

        case "blue":
            $(".blue").fadeOut(100).fadeIn(100);
        break;
        
        case "green":
            $(".green").fadeOut(100).fadeIn(100);
        break;
        
        case "yellow":
            $(".yellow").fadeOut(100).fadeIn(100);
        break; 
    }

    
}

function playSound(name){
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animmatePress(currentColor){
    $("."+currentColor).addClass("pressed");
            setTimeout(function(){
                $("."+currentColor).removeClass("pressed");
            },50);
}

function checkAnswer(currentLevel){
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
          }
        else{
              playSound("wrong");
              $("body").addClass("game-over");
              $("h1").text("Game Over,Press Any Key To Restart");
              setTimeout(function(){
                $("body").removeClass("game-over");
              },200);
              startOver();
        }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}