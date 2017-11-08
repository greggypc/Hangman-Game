
// Hangman Game

	var gameWins = 0;
	var guessCount = 10;
	// var junkArray = [6,7];


	function layoutGame() {
		document.getElementById("guessCount").innerHTML = guessCount;
		document.getElementById("gameWins").innerHTML = gameWins;
		return;
	}
	

	function gameStart() {
		
		var guessCount = 10;
		var junkArray = [];
		
		document.getElementById("guessCount").innerHTML = guessCount;
		document.getElementById("junkArray").innerHTML = junkArray.join(" ");
		var gameWords = ["AA", "BBBBBB"];
		//var gameWords = ["cantaloupe", "archipelago", "basketball", "notebook"];
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		// var upperGameLetters = gameLetters.toUpperCase();
		var blanks = gameLetters.map(i=>' _ ');
		// console.log(blanks);
		// console.log(blanks.join(" "));
		document.querySelector("#demo").innerHTML = blanks.join(" ");


	  document.onkeyup = function(event) {
      var userGuess = event.key.toUpperCase();
      var startValue = 0;
     	//var gameLetters = ["h","o","u","s","e"];
     	console.log(userGuess);	
	      while (gameLetters.indexOf(userGuess, startValue) !== -1) {
	      		
	      		// if in word .push to array gameLetters and replace blank(s) with letter(s)
	      		blanks[gameLetters.indexOf(userGuess, startValue)].push(userGuess);
	      		console.log(userGuess);	
	      		document.querySelector("#gameBlanks").innerHTML = blanks.join(" ");
	      		startValue = gameLetters.indexOf(userGuess, startValue) + 1; 
	      	}

	      	//array.push(b);
			//return array;	

	      	// if userGuess is in junkArray (0r  || is in gameletters?) must exct. before add to junkArray
	      	if (junkArray.indexOf(userGuess, 0) !== -1 ) { 
	      		alert("Already used! Select another letter.");
	      		userGuess = "";
	      		guessCount++; //keeps guessCount from deducting on repeater guess
	      		// keep repeated guess from being added to junkArray
	      	}

      		// else - .push to empty junkArray AND add 1 to guessCount
	        if (gameLetters.indexOf(userGuess, startValue) === -1) {
	      		
	      		junkArray.push(userGuess);
	      		document.getElementById("junkArray").innerHTML = junkArray.join(" ");
	      		
	      		guessCount--;
	      		document.getElementById("guessCount").innerHTML = guessCount;
	      	}	

// ^^^^^ repeated letter should not appear in junkArray or cause guessCount to deduct	!!!!!!^^^^^      	

		};  //end keyup function
		
}  //end main function
		


// if user wins
		
		// function trackWins() {
	 //      if(array of blanks is filled && guessCount >= 1 --- you win!){
	 //      	gameWins++;
	 //      	document.getElementById("winCount").innerHTML = gameWins;
	 //      }	
				
     // function trackWins() {
      // 	document.getElementById('wins').innerHTML = gameWins;
      // }


       // for (var i = 0; i < myFarm.length; i++) {
 //        var animal = myFarm[i];
 //        var anName = myFarm[i];

 //          if( animal.charAt() == "c" || animal.charAt() == "o"){
 //        alert(anName + " starts with a c or o!");
 //        }
 //        else {
 //          alert(anName + " doesn't");
 //        } 
 //      }


      

       // document.querySelector("#game").innerHTML = "You chose: " + userGuess + ". The computer chose: " + computerGuess;
    	//var res = str.toUpperCase();
    	// document.querySelector("#gameLetters").innerHTML = gameLetters;

// var gameLetters = document.getElementById('gameLetters');

	
	// While (guessCount <= 10) {  //while game still going



      
 


	











