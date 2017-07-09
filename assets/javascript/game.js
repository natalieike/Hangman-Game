var wordsArray = ["fish", "garibaldi", "lionfish", "whale", "dolphin", "shark", "stingray", "manta", "grouper", "snapper", "tilapia", "catfish", "salmon", "tuna"]; //Library of words
var wins = 0;  //Tally of wins
function gameObject(word) {
	this.currentWord = word; //Word for Current Game
	this.currentPuzzle = []; //Blank puzzle to be filled in with guesses
	this.usedLetters = []; //Array of already guessed letters
	this.guessesLeft = 12;  //Guesses left before losing the game
	this.foundLetterIndex = []; //Array of positions of currentGuess in currentWord
	this.resetGame = false;

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

//Retrieve a word for the current game and initialize the puzzle
function initializeGame(){	
	var randNum = Math.floor(Math.random() * wordsArray.length);
	var tempWordArray = wordsArray[randNum].split("");
	var newGame = new gameObject(tempWordArray);
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
	if (game.currentPuzzle.indexOf("_") === -1) {
		wins++;
	/* window.location.replace("win.html"); */
	document.getElementById("puzzle").innerHTML = game.currentPuzzle.join("") + "<hr> You Win!";	
		game.resetGame = true; 
	}
	else if (game.guessesLeft === 0) {
		document.getElementById("puzzle").innerHTML = game.currentWord.join("") + "<hr> You Lose.";	
		game.resetGame = true;
		// window.location.replace("lose.html");
	}
}

// First Initialize
var currentGame = initializeGame();

//event handler
document.onkeyup = function(event) {
	var currentGuess = event.key;
	if (event.keyCode == 13) {
		currentGame = initializeGame();
	}
	else {
		if (currentGame.usedLetters.indexOf(currentGuess) == -1) {
			currentGame.findInCurrentWord(currentGuess);
			document.getElementById("puzzle").innerHTML = currentGame.currentPuzzle.join("  ");
			if (currentGame.foundLetterIndex[0] === -1) {
				var headerIndex = "header" + (12-currentGame.guessesLeft);
				document.getElementById(headerIndex).className += " headChance";
				currentGame.guessesLeft--;
				document.getElementById("guesses").innerHTML = "Guesses Left: " + currentGame.guessesLeft;
			}
			else {
				currentGame.replaceInCurrentPuzzle(currentGuess);
				document.getElementById("puzzle").innerHTML = currentGame.currentPuzzle.join("  ");
			}
			currentGame.usedLetters.push(currentGuess);
			document.getElementById("letters").innerHTML = currentGame.usedLetters.join(" * ");
		}
		else {
			alert("You've already used that letter");
		}
		winOrLose(currentGame);
	}
};

