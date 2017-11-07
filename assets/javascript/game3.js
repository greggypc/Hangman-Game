
// Hangman Game

	
	var gameWins = 6;
	

	// function gameStart() {
		var gameWords = ["CANTALOUPE", "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK"];
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		
		var blanks = gameLetters.map(i=>' _ ');
		// console.log(blanks);
		// console.log(blanks.join(" "));
		document.querySelector("#demo").innerHTML = blanks.join(" ");



	  document.onkeyup = function(event) {
      var userGuess = event.key;
      var startValue = 0;
     	// var gameLetters = ["h","o","u","s","e"];
     	// console.log(userGuess);	
	      while (gameLetters.indexOf(userGuess, startValue) !== -1) {
	      		
	      		// if in word .push to array gameLetters and replace blank(s) with letter(s)
	      		blanks[gameLetters.indexOf(userGuess, startValue)].push(userGuess);
	      		startValue = gameLetters.indexOf(userGuess, startValue) + 1; 
	      		document.getElementById("gameBlanks").innerHTML = blanks.join(" ");
			}
	      	

	      		// else - .push to empty junkArray AND add 1 to guessCount
	        if (gameLetters.indexOf(userGuess, startValue) === -1) {
	      	var junkArray = [6,7];
	      		junkArray.push(userGuess);
	      		document.getElementById("junkArray").innerHTML = junkArray.join(" ");
	      		var guessCount = 10;
	      		guessCount--;
	      		document.getElementById("guessCount").innerHTML = guessCount;
	      	}	

	      		// if userGuess is in junkArray - alert("Already used! Pick another letter");
	      if (junkArray.indexOf(userGuess, 0) !== -1) {
	      		alert("Already used! Select another letter.");
	      	}
};
// }	      	


// if user wins
	      // if(array of blanks is filled && guessCount <= 9 --- you win!){
	      // 	wins++;
	      // 	document.getElementById("winCount").innerHTML = gameWins;
	      // }	
				
     // function trackWins() {
      // 	document.getElementById('wins').innerHTML = gameWins;
      // }
      

       // document.querySelector("#game").innerHTML = "You chose: " + userGuess + ". The computer chose: " + computerGuess;
    	//var res = str.toUpperCase();
    	// document.querySelector("#gameLetters").innerHTML = gameLetters;

// var gameLetters = document.getElementById('gameLetters');

	
	// While (guessCount <= 10) {  //while game still going



      
 


	











