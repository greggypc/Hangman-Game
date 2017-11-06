
// Hangman Game


	
	
	var guessCount = 0;
	var gameWins = 6;
	
	

	function gameStart() {
		var gameWords = ["CANTALOUPE", "ARCHIPELAGO", "BASKETBALL", "NOTEBOOK"];
		var thisGameWord = gameWords[Math.floor(Math.random() * gameWords.length)];
		var gameLetters = thisGameWord.split("");
		
		var blanks = gameLetters.map(i=>' _ ');
		console.log(blanks);
		document.getElementById("demo").innerHTML = blanks.join(" ");
	}

	 document.onkeyup = function(event) {

      // Determines which key was pressed.
      var userGuess = event.key;
      for (i = 0; i < blanks; i++) {
      	if (userGuess == gameLetters[i]) {
      		//replace blank with userGuess
      	}
      	else {
      		//push letter into (blank) array and print array to screen
      	}
      };
      

       // document.querySelector("#game").innerHTML = "You chose: " + userGuess + ". The computer chose: " + computerGuess;
    


	

	
// document.querySelector("#gameLetters").innerHTML = gameLetters;
	// 
// var gameLetters = document.getElementById('gameLetters');

	
	// While (guessCount <= 10) {  //while game still going

// console.log(gameWords);
// console.log(gameLetters);
	// 	while (gameWord.indexOf(guess, startValue) !== -1) {
	// 	startValue = word.indexOf(guess,startValue) +1;

	//  document.onkeyup = function(event) {

 //      // Determines which key was pressed.
 //      var userGuess = event.key;

      
 


	











