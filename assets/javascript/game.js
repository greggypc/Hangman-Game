
// Hangman Game

	var guessCount = 0;
	var gameWins = 6;
	

	function gameStart() {
		var gameWords = ["CANTALOUPE", "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK"];
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		
		var blanks = gameLetters.map(i=>' _ ');
		// console.log(blanks);
		// console.log(blanks.join(" "));
		document.getElementById("demo").innerHTML = blanks.join(" ");

	

	 document.onkeyup = function(event) {
     
      var userGuess = event.key;
      var startValue = 0;
     		
	      while (gameLetters.indexOf(userGuess, startValue) !== -1) {
	      		
	      		// if in word .push to array gameLetters and replace blank(s) with letter(s)
	      		blanks[gameLetters.indexOf(userGuess, startValue)].push(userGuess);
	      		startValue = gameLetters.indexOf(userGuess, startValue) + 1; 
			}
	      		
	      		// else - .push to empty junkArray AND add 1 to guessCount
	      if (gameLetters.indexOf(userGuess, startValue) === -1) {
	      		var junkArray = [];
	      		junkArray.push(userGuess);
	      		guessCount++;
	      	}	

	      		// if userGuess is in junkArray - alert("Already used! Pick another letter");
	      if (junkArray.indexOf(userGuess, 0) !== -1) {
	      		alert("Already used! Select another letter.");
	      	}	
				
      };
	}
      


      function trackWins() {
      	document.getElementById('wins').innerHTML = gameWins;
      }
      

       // document.querySelector("#game").innerHTML = "You chose: " + userGuess + ". The computer chose: " + computerGuess;
    	//var res = str.toUpperCase();
    	// document.querySelector("#gameLetters").innerHTML = gameLetters;

// var gameLetters = document.getElementById('gameLetters');

	
	// While (guessCount <= 10) {  //while game still going



      
 


	











