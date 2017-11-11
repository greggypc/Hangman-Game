
// Hangman Game

	var gameWins = 0;
	var guessCount = 10;
	var isCorrect= true;
	var junkArray = [];
	
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
		var blanks = gameLetters.map(i=>' _ ');
		
		document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");



	  document.onkeyup = function(event) {
      var userGuess = event.key.toUpperCase();
      var startValue = 0;
     


	      	 while (gameLetters.indexOf(userGuess, startValue) !== -1) {
	      		
	      		// if in word print to array gameLetters and replace blank(s) with letter(s)
	      		blanks[gameLetters.indexOf(userGuess, startValue)] = userGuess;
	      		document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");
	      		startValue = gameLetters.indexOf(userGuess, startValue) + 1; 
	      	}

      	
	      	var startValue = 0;
	      	while (blanks.indexOf(' _ ', startValue) === -1) {
	      		gameWins++;
	      		document.getElementById("gameWins").innerHTML = "Wins: " + gameWins;
	      		alert("You win! Press 'START' to play again.");
	      		return;
	      	}

	      	if (guessCount < 2 ) {
	      		alert("You lose! Press 'START' to play again.")
	      	}
	    
	      	
	      	// if userGuess is in junkArray (0r  || is in gameletters?) must exct. before add to junkArray
	      	if (junkArray.indexOf(userGuess, 0) !== -1 ) { 
	      		alert("Already used! Select another letter.");
	      		userGuess = ""; // keep repeated guess from being added to junkArray
	      		guessCount++; //keeps guessCount from deducting on repeater guess
	      		
	      	}
	    


	     
      		// if guess not in word print to empty junkArray AND deduct 1 from remaining guessCount
      		var startValue = 0;
	        if (gameLetters.indexOf(userGuess, startValue) === -1) {
	      		
	      		junkArray.push(userGuess);
	      		document.getElementById("junkArray").innerHTML = "Letters Used: " + junkArray.join(" ");
	     		

	      		guessCount--;
	      		document.getElementById("guessCount").innerHTML = "Remaining Guesses: " + guessCount;
	      	}	
	    	

		}; // end keyup function

}  //end main function
		
//  swap hangman image for next image
		// 	     var image = [
		// 'assets/images/hangman.png',
		// 'assets/images/hangman10.png',
		// 'assets/images/hangman09.png',
		// 'assets/images/hangman08.png',
		// 'assets/images/hangman07.png',
		// 'assets/images/hangman06.png',
		// 'assets/images/hangman05.png',
		// 'assets/images/hangman04.png',
		// 'assets/images/hangman03.png',
		// 'assets/images/hangman02.png',
		// 'assets/images/hangman01.png'
		// ] 

  //       //var bodyPic = $("<div>").attr("data-letter", letters[i]).text(letters[i]);
  //      // $(fridgeMagnet).appendTo("#display");
  //     	  $(#addBodyPart).html(function(e){
	 //     var addLimb = e.addLimb;
  // 		 $("#pic").attr('src', image[addLimb]);
		// });  






