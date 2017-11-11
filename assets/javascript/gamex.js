Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @greggypc
 Sign out
 Watch 1
  Star 0  Fork 0 VinnyV88/week-3-game
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
Branch: master Find file Copy pathweek-3-game/assets/javascript/game.js
e8f4ad8  on Nov 18, 2016
@VinnyV88 VinnyV88 tinkering
1 contributor
RawBlameHistory     
623 lines (533 sloc)  27.1 KB

//Hangman - Breaking Bad theme

//Steps:
// 1. Choose random Breaking Bad related word
// 2. Display Hangman screen with word to be solved and instructions
// 3. Wait for user to press a letter-key
// 4. Check to see if letter is part of the word
// 5. If letter matches any of the word, display the letter in the word
// 6. If letter is not part of the word, update guesses remaining and hangman
// 7. Display the letters guessed already and guesses remaining 
// 8. If user completes the word, display winning sequence (sound-bite/song, graphic/animation)
// 9. If user runs out of guesses, display losing sequence (sound-bite/song, graphic animation)  
// 10. Start game over with new random word

	video.addEventListener("ended",function() {
		video.style.display = "none";
	});

	$("#playall").click(function() {

		hangman.playAll = true
		hangman.muteEffects = false
		hangman.muteAll = false

		$("audio").prop("muted", false);

		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	$("#muteeffects").click(function() {

		hangman.playAll = false
		hangman.muteEffects = true
		hangman.muteAll = false
		
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	$("#muteall").click(function() {

		hangman.playAll = false
		hangman.muteEffects = false
		hangman.muteAll = true

		$("audio").prop("muted", true);
		
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	var wordObj = {};

	var hangman = {
		wins: 0,
		losses: 0,
		guesses: 8,
		userGuess: " ",
		hits: 0,
		hitSounds: ["hit_goddamnright.mp3", "hit_teartomyeye.mp3", "hit_tioding.mp3"],
		missSounds: ["miss_bupkiss.mp3", "miss_getyourshittogether.mp3", "miss_gooseegg.mp3", "miss_jesuschrist.mp3", "miss_nodice.mp3", "miss_tiodingding.mp3"],
		losePic: ["gus_dead.gif", "dead01.jpg", "end.jpg", "felina.png", "breakingbad_dead.jpg", "knocks.jpg", "tio_ding.jpg"],
		loseSound: ["better_call_saul.mp3", "fringlittlerata.mp3", "gus_is_dead.mp3", "iamthedanger.mp3", "knocks.mp3"],
		playSound: " ",
		playAll: true,
		muteEffects: false,
		muteAll: false,
		mute: "",
		hit: false,
		miss: false,
		repeat: false,
		invKey: false,
		winner: false,
		gameover: false,
		lettersGuessed: [],
		message: " ",
		instruct: " ",
		stsimg: " ",
		word: " ",
		statusHTML: " ",
		status_imgHTML: " ",
		wordsHTML: " ",
		hangmanHTML: " ",
		maskedString: " ",
		owords:[gustavo = {oword: "gustavo fring", wpic: "gus_kingpin.png", wsound: "fringkillfamily.mp3"},
			    meth = {oword: "crystal meth", wpic: "yeah_bitch.gif", wsound: "yeahscience.mp3"},
			    cranston = {oword: "bryan cranston", wpic: "Bryan_Cranston.jpg", wsound: "empirebiz.mp3"},
			    teacher = {oword: "chemistry teacher", wpic: "yeah_bitch.gif", wsound: "yeahscience.mp3"},
			    walter = {oword: "walter white", wpic: "walter_white.jpg", wsound: "iamthedanger.mp3"},
			    lydia = {oword: "lydia", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    albuquereque = {oword: "albuquereque", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    flynn = {oword: "flynn", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    cancer = {oword: "cancer", wpic: "cancer.jpg", wsound: "notindanger.mp3"},
			    lawyer = {oword: "lawyer", wpic: "lawyer.jpg", wsound: "bettercallsaullaugh.mp3"},
			    hank = {oword: "hank", wpic: "hank.jpg", wsound: "treadlightly.mp3"},
			    heisenberg = {oword: "heisenberg", wpic: "heisenberg.jpg", wsound: "heisenberg.mp3"},
			    pinkman = {oword: "jesse pinkman", wpic: "yeah_bitch.gif", wsound: "yeahmagents.mp3"},
			    saul = {oword: "saul goodman", wpic: "saul.jpg", wsound: "nodealnodice.mp3"},
			    skyler = {oword: "skyler", wpic: "skyler_cash.jpg", wsound: "dirtysaul.mp3"},
			    ricin = {oword: "ricin", wpic: "ricin.png", wsound: "noIknock.mp3"},
			    tio = {oword: "tio salamanca", wpic: "tio.jpg", wsound: "ding.mp3"},
			    tuco = {oword: "tuco salamanca", wpic: "tuco_tight.gif", wsound: "tucotight.mp3"},
			    pollos = {oword: "los pollos hermanos", wpic: "lospollos.gif", wsound: "gus_is_dead.mp3"},
			    mike = {oword: "mike ehrmantraut", wpic: "mike.jpg", wsound: "mike.mp3"}
				],
		//look into using an array of word objects instead of just words. a word object can have it's own personalized win/loss images and sounds
		// words: ["gustavo", "fring", "lydia", "albuquereque", "tuco", "flynn", "chemistry", "teacher", 
		// 		"cancer", "crystal", "lawyer", "hank", "heisenberg", "walter", "white", "meth",
		// 		"cranston", "pinkman", "saul", "goodman", "skyler", "ehrmantraut", "ricin", "salamanca"],

		initial: function() {
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Welcome to Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start..."
			this.hit = false
			this.miss = false
		},

		chooseRandomWord: function() {
			 
			// this.word = this.words[Math.floor(Math.random() * this.words.length)]
			
			// for(var i=0; i < this.word.length; i++) {

// debugger;
			wordObj = this.owords[Math.floor(Math.random() * this.owords.length)]

			this.word = wordObj.oword
			
			// for(var i=0; i < this.word.length; i++) {

			// 	this.formattedWord[i] = this.word.substr(i, 1)

			// }

			// this.maskedString = this.formattedWord.toString().replace(/,/g, " ")

			
		},//close function chooseRandomWord

		chooseRandomHit: function() {
			//coin flip to dtermine to play sound effect or not
			if (Math.floor(Math.random() * 2) == 0) {
				return this.hitSounds[Math.floor(Math.random() * this.hitSounds.length)]
			}
			else {
				return " "
			}
		},

		chooseRandomMiss: function() {
			//coin flip to dtermine to play sound effect or not
			if (Math.floor(Math.random() * 2) == 0) {
				return this.missSounds[Math.floor(Math.random() * this.missSounds.length)]
			}
			else {
				return " "
			}
		},

		chooseRandomLossPic: function() {
			return this.losePic[Math.floor(Math.random() * this.losePic.length)]
		},

		chooseRandomLossSound: function() {
			return this.loseSound[Math.floor(Math.random() * this.loseSound.length)]
		},

		validKey: function() {
			if ((this.userGuess >= "a") && (this.userGuess <= "z")) {
				this.message = " "
				this.instruct = "Press any letter to continue..."
				this.invKey = false
				return true
			}
			else {
				this.message = "Invalid key pressed, try again!"
				this.instruct = "Press any letter to continue..."
			   	this.invKey = true
				return false
			}
		},

		newLetter: function() {
			if (this.lettersGuessed.indexOf(this.userGuess) >= 0) {
				this.message = "You tried that letter already!"
			   	this.instruct = "Press any letter to continue..."
			   	this.repeat = true
				return false
			}
			else {
				//add letter to guessed letters
				this.lettersGuessed.push(this.userGuess)
				this.repeat = false
				return true	
			}
		},
		
		letterHit: function() {
			if (this.playAll) {
				this.mute = ""
			} else {
				this.mute = " muted"
			}

			if (this.word.indexOf(this.userGuess) >= 0) {
				this.message = "Hit! Keep it up!"
				this.hit = true
				this.miss = false
				this.playSound = this.chooseRandomHit()
				return true
			}
			else {
				this.message = "Miss! Try Again!"
				this.hit = false
				this.miss = true
				this.playSound = this.chooseRandomMiss()
				return false	
			}

		},

		formatWord: function() {
			this.maskedString = ""
			this.hits = 0
				 
			for(var i=0; i < this.word.length; i++) {
				if (this.lettersGuessed.indexOf(this.word.substr(i, 1)) >= 0) {
					// this.formattedWord[i] = this.word.substr(i, 1)
					this.maskedString += (this.word.substr(i, 1) + " ")	
					this.hits++
				}
				else {
					// if space in word, then don't underline
					if (this.word.substr(i, 1) === " ") {
						this.maskedString += "&nbsp;&nbsp;"
						//spaces are free hits
						this.hits++
					}
					else {	
					this.maskedString += "_ "
					}
				}
			}
		},

		letterMiss: function() {
			this.guesses--
			if (this.guesses === 0) {
    			this.message = "Game Over!"
    			this.instruct = "Press Enter to start with a new word."
				this.playSound = this.chooseRandomLossSound()
				this.stsimg = this.chooseRandomLossPic()
 				this.losses++
				if (!(this.muteAll)) {
					this.mute = ""
				} else {
					this.mute = " muted"
				}

    		} 

		},

		checkWin: function() {
			if (this.hits === this.word.length) {
				// this.winner = true
				this.message = "Winner!"
				this.instruct = "Press Enter to start with a new word."
				this.stsimg = wordObj.wpic
				this.playSound = wordObj.wsound
				this.wins++

				if (!(this.muteAll)) {
					this.mute = ""
				} else {
					this.mute = " muted"
				}
			}

		},

		updateStatus: function() {

			this.statusHTML = "<h3> " + this.message + "</h3><h2>Wins: " + this.wins + "</h2><h2>Losses: " + this.losses +  
				"</h2> <h3>" + this.instruct + "</h3>"	

			if (!(this.playSound === " ")) {
				this.statusHTML += "<audio autoplay" + this.mute + "> <source src=\"assets/audio/" + this.playSound + "\" type=\"audio/mp3\"> </audio>"
			}
		},

		updateWords: function() {

			this.wordsHTML = "<h2>" + this.maskedString + "</h2> <br> <h3>Guessed letters: " + this.lettersGuessed.toString() + 
			"</h3> <br> <h3>Guesses remaining: " + this.guesses + "</h3>"	
		},

		updateStatusImg: function() {

			if ((this.gameover) || (this.winner)) {
				this.status_imgHTML = "<img class=\"img-responsive\" id=\"sts\" style=\"width:100%;\" src=\"assets/images/" + this.stsimg + "\" alt=\"status image\">"
				} else if (this.invKey) {
					this.status_imgHTML = "<div class=\"area\">Invalid Key!</div>"
					} else if (this.repeat) {
						this.status_imgHTML = "<div class=\"area\">Letter Repeat!</div>"
						} else if (this.hit) {
							this.status_imgHTML = "<div class=\"area\">Hit!</div>"
							} else if (this.miss) {
								this.status_imgHTML = "<div class=\"area\">Miss!</div>"
								} else {
									this.status_imgHTML = " "
									}

	},

		updateHangman: function() {

			switch(this.guesses) {
			    case 8:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 7:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 6:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 5:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 4:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 3:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 2:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 1:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 0:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 	
					}
					
					break;
			    default:
			        this.hangmanHTML = "<h2>ERROR!!</h2>";
			}			
		},

		reset: function() {
			this.guesses = 8
			this.hits = 0
			this.hit = false
			this.miss = false
			this.winner = false
			this.gameover = false
			this.lettersGuessed = []
			this.word = " "
			// this.formattedWord = []
			this.maskedString = " "
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start."
		    this.stsimg = " "
			this.playSound = " "


		},

		html: function() {
			
			if (!(this.gameover) && !(this.winner)) {

				if (this.guesses === 0) {
					this.gameover = true
				}

				if (this.hits === this.word.length) {
				this.winner = true
				}

				// Update Instructions and Status
				this.updateStatus()
				document.getElementById("status").innerHTML = (this.statusHTML)

				// Update Word and Guesses
				this.updateWords()
				document.getElementById("words").innerHTML = (this.wordsHTML)

				// Update Status Image
				this.updateStatusImg()
				document.getElementById("status_img").innerHTML = (this.status_imgHTML)
			

				// Update Hangman Images
				this.updateHangman()
				document.getElementById("hangman").innerHTML = (this.hangmanHTML)
				
			}
		}

	} // close object Hangman

	
	//Initial Word, we start here

	hangman.initial()

	hangman.html()

	document.onkeyup = function(event) {

	hangman.stsimg = " "
   	hangman.playSound = " "

 
    if (((event.keyCode == 13) && hangman.winner) || ((event.keyCode == 13) && (hangman.guesses === 0))) {
    	 
    	hangman.reset()

		hangman.html()

    }
    else { 
    	if (hangman.guesses > 0) { //USER LOST: Do not allow user to play until they hit Enter to start a new word!
    		if (!(hangman.winner)) { //USER WON: Do not allow user to play until they hit Enter to start a new word!

			    hangman.userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			    // confirm letter was pressed
			    if (hangman.validKey()) {
		    		// confirm letter was not guessed yet
			    	if (hangman.newLetter()) {
			    		//check letter exist in word
			    		if (hangman.letterHit()) {
						    // if hit, then process hit
						    hangman.formatWord()
			    			hangman.checkWin()
			    		} // hit
			    		else {	
						    // if no hit, then process miss
			    			hangman.letterMiss()
			    		}
			    	} // new letter
			    	// else {
			    	// 	hangman.message = "You tried that letter already!"
			    	// }
			    } // Valid key-stroke
			    // else {
			    // 	hangman.message = "Invalid key pressed, try again!"
			    // }
			 } // Winner, press enter
			 // else {
			 // 	hangman.message = "You Won! Press Enter to start with a new word."
			 // }
		} // guesses = 0, Loser
		// else {
		// 	hangman.message = "Game Over! Press Enter to start with a new word."
		// }
	}

		hangman.html()

	}// key press	
© 2017 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About