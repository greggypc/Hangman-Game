
// Hangman Game

	var gameWins = 0;
	var guessCount = 10;
	var isCorrect= true;
	
	function layoutGame() {
		document.getElementById("guessCount").innerHTML = guessCount;
		document.getElementById("gameWins").innerHTML = gameWins;
		return;
	};
	

	function gameStart() {
		
		var guessCount = 10;
		var junkArray = [];
		
		document.getElementById("guessCount").innerHTML = guessCount;
		document.getElementById("junkArray").innerHTML = junkArray.join(" ");
		var gameWords = ["PTERODACTYL", "JAVASCRIPT", "CANTALOUPE",
		 "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK", "ONOMATOPOEIA"];
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		var blanks = gameLetters.map(i=>' _ ');
		
		document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");



	  document.onkeyup = function(event) {
      var userGuess = event.key.toUpperCase();
      var startValue = 0;
     
	      
	      while (gameLetters.indexOf(userGuess, startValue) !== -1) {
	      		
	      		// if in word print to array gameLetters and replace blank(s) with letter(s)
	      		blanks[gameLetters.indexOf(userGuess, startValue)] = userGuess;
	      		//blanks[gameLetters.indexOf(userGuess, startValue)].push(userGuess);   NOT WORKING		
	      		document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");
	      		startValue = gameLetters.indexOf(userGuess, startValue) + 1; 
	      	}

	      	// function won() {
	      	var startValue = 0;
	      	while (blanks.indexOf(' _ ', startValue) === -1) {
	      		alert("You win! Press 'START' to play again.");
	      		gameWins++;
	      		document.getElementById("gameWins").innerHTML = gameWins;
	      		return;
	      	}

	      	if (guessCount < 2 ) {
	      		alert("You lose! Press 'START' to play again.")
	      	}
	      // };

	      	
	      

	      	// function usedAlready() {
	      	// if userGuess is in junkArray (0r  || is in gameletters?) must exct. before add to junkArray
	      	if (junkArray.indexOf(userGuess, 0) !== -1 ) { 
	      		alert("Already used! Select another letter.");
	      		userGuess = ""; // keep repeated guess from being added to junkArray
	      		guessCount++; //keeps guessCount from deducting on repeater guess
	      		
	      	}
	     // }; // end usedAlready


	     // function wrongLetter() {
      		// if guess not in word print to empty junkArray AND deduct 1 from remaining guessCount
      		var startValue = 0;
	        if (gameLetters.indexOf(userGuess, startValue) === -1) {
	      		
	      		junkArray.push(userGuess);
	      		document.getElementById("junkArray").innerHTML = junkArray.join(" ");
	      		
	      		guessCount--;
	      		document.getElementById("guessCount").innerHTML = guessCount;
	      	}	
	     // };  // end wrongLetter

// ^^^^^ repeated letter should not appear in junkArray or cause guessCount to deduct	!!!!!!^^^^^      	

		}; // end keyup function
		
}  //end main function
		







