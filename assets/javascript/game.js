// Hangman Game

var gameWins = 0;
var guessCount = 10;
var isCorrect = true;
var junkArray = [];
var image = [
    "assets/images/hangman-0.png",
    "assets/images/hangman-01.png",
    "assets/images/hangman-02.png",
    "assets/images/hangman-03.png",
    "assets/images/hangman-04.png",
    "assets/images/hangman-05.png",
    "assets/images/hangman-06.png",
    "assets/images/hangman-07.png",
    "assets/images/hangman-08.png",
    "assets/images/hangman-09.png"
];

function layoutGame() {
    document.getElementById("guessCount").innerHTML = "Remaining Guesses: " + guessCount;
    document.getElementById("gameWins").innerHTML = "Wins: " + gameWins;
    document.getElementById("junkArray").innerHTML = "Letters Used: " + junkArray.join(" ");
    return;
};


function gameStart() {

    var guessCount = 10;
    var junkArray = [];
    document.getElementById("guessCount").innerHTML = "Remaining Guesses: " + guessCount;
    document.getElementById("junkArray").innerHTML = "Letters Used: " + junkArray.join(" ");
    var gameWords = ["PTERODACTYL", "JAVASCRIPT", "CANTALOUPE",
        "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK", "ONOMATOPOEIA"];
    var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    var gameLetters = thisGameWord.split("");
    var blanks = gameLetters.map(i => ' _ ');

    document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");


    document.onkeyup = function(event) {
        var userGuess = event.key.toUpperCase();
        var startValue = 0;

        // if in word print to array gameLetters and replace blank(s) with letter(s)
        while (gameLetters.indexOf(userGuess, startValue) !== -1) {
            blanks[gameLetters.indexOf(userGuess, startValue)] = userGuess;
            document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");
            // Sound effect
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/audio/Good-idea-bell.mp3");
            audioElement.play();
            startValue = gameLetters.indexOf(userGuess, startValue) + 1;
        }

        //You win
        var startValue = 0;
        while (blanks.indexOf(' _ ', startValue) === -1) {
            // Sound effect
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/audio/Magic-zing-sound-effect.mp3");
            audioElement.play();
            gameWins++;
            document.getElementById("gameWins").innerHTML = "Wins: " + gameWins;
            gameStart();
            return;
        }

        //You lose
        if (guessCount < 2) {
            // Sound effect
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/audio/Wha-wha-wha-sound-effect.mp3");
            audioElement.play();
            gameStart();
            return;
        }

        // if userGuess is in junkArray (0r  || is in gameletters?) must exct. before add to junkArray
        if (junkArray.indexOf(userGuess, 0) !== -1) {
            alert("Already used! Select another letter.");
            userGuess = ""; // keep repeated guess from being added to junkArray
            guessCount++; //keeps guessCount from deducting on repeater guess
            return;
        }


        // if guess not in word print to empty junkArray AND deduct 1 from remaining guessCount
        var startValue = 0;
        if (gameLetters.indexOf(userGuess, startValue) === -1) {

            junkArray.push(userGuess);
            document.getElementById("junkArray").innerHTML = "Letters Used: " + junkArray.join(" ");
            // Sound effect
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/audio/Failure-sound-effect.mp3");
            audioElement.play();

            guessCount--;
            //swap hangman image for next image
            var manImg = $("<img>").attr("src", image[guessCount]);
            $(manImg).html("#manImg");

            document.getElementById("guessCount").innerHTML = "Remaining Guesses: " + guessCount;
            //$("Remaining Guesses: " + guessCount).appendTo(#guessCount);

        }
    }; // end keyup function
} //end main function

// var losses = 0;
// losses++;
// var percent = (gameWins / losses) * 100;
// document.getElementById("percent").innerHTML = percent + "%";