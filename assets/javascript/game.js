var wordsArray = [["fish", "assets/images/fish-taco.jpg"], ["garibaldi", "assets/images/garibaldi.jpg"], ["lionfish", "assets/images/lionfish.jpg"], ["whale", "assets/images/whales3.jpg"], ["dolphin", "assets/images/Dolphin.jpg"], ["shark", "assets/images/sharks-hammerhead.jpg"], ["stingray", "assets/images/StingRay9.jpg"], ["manta", "assets/images/Manta.jpg"], ["grouper", "assets/images/grouper-dinner.jpg"], ["snapper", "assets/images/snapper-sushi.jpg"], ["tilapia", "assets/images/tilapia-ceviche.jpeg"], ["catfish", "assets/images/fried-catfish-dinner.jpg"], ["salmon", "assets/images/salmon-sushi.jpg"], ["tuna", "assets/images/tuna_sushi.jpg"]]; //Library of words and associated images
var wins = 0;  //Tally of wins
var currentGame = initializeGame(); // Initializes game object

//Retrieve a word for the current game and initialize the puzzle
function initializeGame(){	
	var randNum = Math.floor(Math.random() * wordsArray.length);
	var tempWordArray = wordsArray[randNum][0].split("");
	var tempImage = wordsArray[randNum][1];
	var newGame = new gameObject(tempWordArray, tempImage);
	for (var j=0; j < 12; j++) {
		var elementID = "header" + j;
		var currentElement = document.getElementById(elementID);
		currentElement.classList.remove("headChance");
	}
	for (var i=0; i < newGame.currentWord.length; i++){
		newGame.currentPuzzle[i] = "_";
	}
	console.log(newGame.currentWord);
	document.getElementById("puzzle").innerHTML = newGame.currentPuzzle.join("  ");
	document.getElementById("letters").innerHTML = newGame.usedLetters.join(" * ");
	document.getElementById("wins").innerHTML = "Wins: " + wins;
	document.getElementById("guesses").innerHTML = "Guesses Left: " + newGame.guessesLeft;
	return(newGame);
}

//Decide if Win or Lose
function winOrLose(game) {
	var winAudio = new Audio("assets/sounds/Bubbling.wav");
	var loseAudio = new Audio("assets/sounds/Video_Game_Splash.wav");
	if (game.currentPuzzle.indexOf("_") === -1) {
		wins++;
		document.getElementById("puzzle").innerHTML = "<img src='" + game.winnerPicture + "'>" + game.currentPuzzle.join("") + "<hr> You Win!";	
		winAudio.play();
		game.resetGame = true; 
	}
	else if (game.guessesLeft === 0) {
		document.getElementById("puzzle").innerHTML = game.currentWord.join("") + "<hr> You Lose.";	
		loseAudio.play();
		game.resetGame = true;
	}
}

//Game Object to hold the properties associated with the game, and associated methods to manipulate game data
function gameObject(word, picture) {
	this.currentWord = word; //Word for Current Game
	this.currentPuzzle = []; //Blank puzzle to be filled in with guesses
	this.usedLetters = []; //Array of already guessed letters
	this.guessesLeft = 12;  //Guesses left before losing the game
	this.foundLetterIndex = []; //Array of positions of currentGuess in currentWord
	this.winnerPicture = picture; //picture to display upon winning
	this.resetGame = false; //Flags when the game should be re-set because of a win/loss

	//Finds all of the positions of currentGuess in currentWord, and places them into array foundLetterIndex
	this.findInCurrentWord = function(currentGuess){
		var x = 0;
		var tempFoundLetters = [];
		while (x < this.currentWord.length){
			var y = this.currentWord.indexOf(currentGuess, x);
			tempFoundLetters.push(y);
			if (y === -1) {
				x = this.currentWord.length;
			}
			else if (y === x){
				x++;
			}
			else {
				x = y + 1;
			}
		}
		this.foundLetterIndex = tempFoundLetters;
	};
	
	//Replaces the _ with the currenGuess letter in currentPuzzle
	this.replaceInCurrentPuzzle = function(currentGuess){
		for (var i = 0; i < (this.foundLetterIndex.length); i++){
			var index = this.foundLetterIndex[i];
			if (index != -1){
				this.currentPuzzle[index] = currentGuess;
			}
		}
	};
};

//event handler
document.onkeyup = function(event) {
	var currentGuess = event.key; //user input
	//If the user hits Enter and the last game is over, new game will initialize
	if (event.keyCode == 13){
		if (currentGame.resetGame === true) {
			currentGame = initializeGame();
		}
		else{
			return;
		}
	}
	else {
		//If the currentGuess hasn't been guessed before, then try to find it in the current word
		if (currentGame.usedLetters.indexOf(currentGuess) === -1) {
			currentGame.findInCurrentWord(currentGuess);
			document.getElementById("puzzle").innerHTML = currentGame.currentPuzzle.join("  ");
			//If the currentGuess isn't found then deduct a turn from the guessesLeft
			if (currentGame.foundLetterIndex[0] === -1) {
				var headerIndex = "header" + (12-currentGame.guessesLeft);
				document.getElementById(headerIndex).className += " headChance";
				currentGame.guessesLeft--;
				document.getElementById("guesses").innerHTML = "Guesses Left: " + currentGame.guessesLeft;
			}
			//If the currentGuess is found, then replace the associated _'s in the puzzle array
			else {
				currentGame.replaceInCurrentPuzzle(currentGuess);
				document.getElementById("puzzle").innerHTML = currentGame.currentPuzzle.join("  ");
			}
			//Push the currentGuess to the used letters array and display it in the UI
			currentGame.usedLetters.push(currentGuess);
			document.getElementById("letters").innerHTML = currentGame.usedLetters.join(" * ");
		}
		//Error message if the currentGuess has been used before
		else {
			alert("You've already used that letter");
		}
		//Decide if the user has won or lost on this turn
		winOrLose(currentGame);
	}
};

