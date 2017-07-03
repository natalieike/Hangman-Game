var currentGuess; //User Input
var wordsArray = ["fish", "garibaldi", "lionfish", "whale", "dolphin", "shark", "stingray", "manta", "grouper", "snapper", "tilapia", "catfish", "salmon", "tuna"]; //Library of words
var currentWord = []; //Word for Current Game
var currentPuzzle = []; //Blank puzzle to be filled in with guesses
var usedLetters = []; //Array of already guessed letters
var wins = 0;  //Tally of wins
var guessesLeft = 12;  //Guesses left before losing the game
var foundLetterIndex = []; //Array of positions of currentGuess in currentWord
var resetGame = true;

//Retrieve a word for the current game and initialize the puzzle
function initializeGame(){	
	var randNum = Math.floor(Math.random() * wordsArray.length);
	currentPuzzle = [];
	currentWord = [];
	resetGame = false;
	for (var j=0; j < 12; j++) {
		var elementID = "header" + j;
		var currentElement = document.getElementById(elementID);
		currentElement.classList.remove("headChance");
	}
	currentWord = wordsArray[randNum].split("");
	for (var i=0; i < currentWord.length; i++){
		currentPuzzle[i] = "_";
	}
	foundLetterIndex = [];
	guessesLeft = 12;
	usedLetters = [];
console.log(currentWord);
	document.getElementById("puzzle").innerHTML = currentPuzzle.join("  ");
	document.getElementById("letters").innerHTML = usedLetters.join(" * ");
	document.getElementById("wins").innerHTML = "Wins: " + wins;
	document.getElementById("guesses").innerHTML = "Guesses Left: " + guessesLeft;
}


//Finds all of the positions of currentGuess in currentWord, and places them into array foundLetterIndex
function findInCurrentWord(){
	var x = 0;
	var tempFoundLetters = [];
	while (x < currentWord.length){
		var y = currentWord.indexOf(currentGuess, x);
		tempFoundLetters.push(y);
		if (y === -1) {
			x = currentWord.length;
		}
		else if (y === x){
			x++;
		}
		else {
			x = y + 1;
		}
	}
	foundLetterIndex = tempFoundLetters;
};

//Replaces the _ with the currenGuess letter in currentPuzzle
function replaceInCurrentPuzzle(){
	for (var i = 0; i < (foundLetterIndex.length); i++){
		var index = foundLetterIndex[i];
		if (index != -1){
			currentPuzzle[index] = currentGuess;
			document.getElementById("puzzle").innerHTML = currentPuzzle.join("  ");
		}
	}
};

//Decide if Win or Lose
function winOrLose() {
	if (currentPuzzle.indexOf("_") === -1) {
		wins++;
	/* window.location.replace("win.html"); */
	document.getElementById("puzzle").innerHTML = currentPuzzle.join("") + "<hr> You Win!";	
		resetGame = true; 
	}
	else if (guessesLeft === 0) {
		document.getElementById("puzzle").innerHTML = currentWord.join("") + "<hr> You Lose.";	
		resetGame = true;
		// window.location.replace("lose.html");
	}
}

// First Initialize
initializeGame();

//event handler
document.onkeyup = function(event) {
	currentGuess = event.key;
	if (event.keyCode == 13) {
		initializeGame();
	}
	else {
		if (usedLetters.indexOf(currentGuess) == -1) {
			findInCurrentWord();
			if (foundLetterIndex[0] === -1) {
				var headerIndex = "header" + (12-guessesLeft);
				document.getElementById(headerIndex).className += " headChance";
				guessesLeft--;
				document.getElementById("guesses").innerHTML = "Guesses Left: " + guessesLeft;
			}
			else {
				replaceInCurrentPuzzle();
			}
			usedLetters.push(currentGuess);
			document.getElementById("letters").innerHTML = usedLetters.join(" * ");
		}
		else {
			alert("You've already used that letter");
		}
		winOrLose();
	}
};

