
// Hangman Game


	
	var gameWords = ["CANTALOUPE", "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK"];
	var guessCount = 0;
	var gameWins = 6;
	document.getElementById("demo").innerHTML = "sggbst";
	

	function gameStart(gameWords) {
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		gameLetters.innerHTML = word.value;
		console.log(gameLetters);
	}


	

	
// document.querySelector("#gameLetters").innerHTML = gameLetters;
	
var gameLetters = document.getElementById('gameLetters');

	
	// While (guessCount <= 10) {  //while game still going

// console.log(gameWords);
console.log(gameLetters);
	// 	while (gameWord.indexOf(guess, startValue) !== -1) {
	// 	startValue = word.indexOf(guess,startValue) +1;

	//  document.onkeyup = function(event) {

 //      // Determines which key was pressed.
 //      var userGuess = event.key;

      
      

 //      // Only run the following code block if the user presses "r" or "p" or "s".
 //      if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

 //        // Alert the userGuess and computerGuess
 //        alert("User guess: " + userGuess);
 //        alert("Computer guess: " + computerGuess);

 //      }
 //    };


	// } //while game still going end


	











