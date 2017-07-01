var currentGuess; //User Input
var wordsArray = ["fish", "garibaldi", "lionfish", "whale", "dolphin", "shark", "stingray", "manta", "grouper", "snapper", "tilapia", "catfish"]; //Library of words
var currentWord = []; //Word for Current Game
var currentPuzzle = []; //Blank puzzle to be filled in with guesses
var usedLetters = []; //Array of already guessed letters
var wins = 0;  //Tally of wins
var guessesLeft = 12;  //Guesses left before losing the game
var foundLetterIndex = []; //Array of positions of currentGuess in currentWord

//Retrieve a word for the current game and initialize the puzzle
function initializeGame(){	
	var randNum = Math.floor(Math.random() * wordsArray.length);
	currentPuzzle = [];
	currentWord = [];
	currentWord = wordsArray[randNum].split("");
	for (var i=0; i < currentWord.length; i++){
		currentPuzzle[i] = "_";
	}
	foundLetterIndex = [];
	guessesLeft = 12;
	usedLetters = [];
console.log(currentWord);
console.log(currentPuzzle);
}


//Finds all of the positions of currentGuess in currentWord, and places them into array foundLetterIndex
function findInCurrentWord(){
	var x = 0;
	var tempFoundLetters = [];
	console.log("findInCurrentWord");
	while (x < currentWord.length){
		var y = currentWord.indexOf(currentGuess, x);
		tempFoundLetters.push(y);
		console.log(y);
		if (y === -1) {
			x = currentWord.length;
		}
		else if (y === x){
			x++;
		}
		else {
			x = y + 1;
		}
		console.log(foundLetterIndex);
	}
	foundLetterIndex = tempFoundLetters;
};

//Replaces the _ with the currenGuess letter in currentPuzzle
function replaceInCurrentPuzzle(){
	for (var i = 0; i < (foundLetterIndex.length); i++){
		var index = foundLetterIndex[i];
		if (index != -1){
			currentPuzzle[index] = currentGuess;
			console.log(currentPuzzle);
		}
	}
};

//Decide if Win or Lose
function winOrLose() {
	if (currentPuzzle.indexOf("_") === -1) {
		wins++;
		console.log("you win");
		console.log("wins " + wins);
		initializeGame();
	}
	else if (guessesLeft === 0) {
		console.log("you lose");
		initializeGame();
	}
}
//First Initialize
initializeGame();

//event handler
document.onkeyup = function(event) {
	currentGuess = event.key;
	console.log(currentGuess);
	if (usedLetters.indexOf(currentGuess) == -1) {
		findInCurrentWord();
		if (foundLetterIndex[0] === -1) {
			guessesLeft--;
		}
		else {
			replaceInCurrentPuzzle();
		}
		usedLetters.push(currentGuess);
		console.log("guesses left" + guessesLeft);
	}
	else {
		console.log("you've already used that letter");
	}
	winOrLose();
};

