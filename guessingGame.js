/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    guesses=[],
    hint=[],
    i = 5;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	winningNumber = Math.floor(Math.random() * 100) + 1;// add code here
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = Number(document.getElementById("guess").value);
	if (playersGuess > 100 || playersGuess < 1) {
		$('#message').text("Please input a number from 1 to 100.");
	} else if (guesses.indexOf(playersGuess)===-1) {
		guesses.push(playersGuess);
		gameAttemps();
		checkGuess();
	} else {
		$('#message').text("You Already Picked That Number!");
	}
	document.getElementById("guess").value = "";
	
	// add code here
}

//Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var direction, distance;
	if (playersGuess < winningNumber) {
		direction = "low";
	} else if (playersGuess > winningNumber) {
		direction = "high";
	}
	if (Math.abs(playersGuess - winningNumber) <= 5) {
		distance = " and within 5 digits";
	} else if (Math.abs(playersGuess - winningNumber) <= 10) {
		distance = " and within 10 digits";
	}
	return [direction, distance]
	// add code here
}

//Guess message

function guessMessage(){
	var arr = lowerOrHigher();
	return "Your guess is " + arr.join("") + ".";
}

// Check if the Player's Guess is the winning number 
function checkGuess(){
	if (playersGuess === winningNumber) {
		$('#message').before('<img src="Congratulations.png" id="img1">')
		$('#message').text("You Guessed The Number!");
		document.getElementById("message").style.fontSize = "34px";
		document.getElementById("message").style.color = "#800080";
		//When you win the game, remove input feild and button
		$('#guess-button').remove();
		$('#guess').remove();
		$('.times').text("");
		$('#img2').remove();
	} else {
		$('#message').text(guessMessage());
		// add code here
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	if (hint[0] == undefined) {
		hint.push(winningNumber)
		while(hint.length < 10) {
			var num = Math.floor(Math.random() * 100) + 1;
			if (hint.indexOf(num)===-1){
				hint.push(num)
			}
		}
	} 	
	var j = i * 2;
	while (hint.length > j){
		hint.pop()
	}
	var newhint = hint.slice(0);
	$('#hint p').remove();
	$('#hint').append('<p>' + newhint.sort(function(a,b){return a-b;}).join(", ")+ '</p>');
	// add code here
	//$('#hint').append('<p>' + winningNumber + '</p>');
}

// Allow the "Player" to Play Again

function playAgain(){
	//reset all the variables
	generateWinningNumber();
	i = 5;
	arr = [];
	hint = [];
	guesses = [];
	//remove input, button, and imgs
	$('#guess-button').remove();
	$('#guess').remove();
	$('.submit-guess img').remove();
	//add input and button that removed
	var input = '<input type="text" id="guess" placeholder="Input Number 1-100">'
	$('#message').before(input);
	var button = '<button id="guess-button" onclick="playersGuessSubmission()">Submit Your Guess</button>'
	$('#message').after(button);
	//reset the messages
	$('#message').text("Restart!");
	$('.times').text("5 More Chances")
	$('#hint p').remove();
	//reset font of message
	document.getElementById("message").style.fontSize = "24px";
	document.getElementById("message").style.color = "#800000";
	// add code here
}

//Number of guesses left
//If all the chances are used, lose the game.

function gameAttemps(){
	i--;
	if (i > 0) {
		$('.times').text(i + " More Chances");
	} else {
		$('.times').text('Sorry, You lose the game! Play Agian!');
		var sad_img = "<img src='Sad.gif' id='img2'>"
		$('.times').before(sad_img);
		$('#guess-button').remove();
		$('#guess').remove();
	}
	
}

/* **** Event Listeners/Handlers ****  */

$(document).ready(generateWinningNumber())

//return key

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }

  switch (event.key) {
    case "Enter":
      playersGuessSubmission()// Do something for "enter" or "return" key press.
      break;
    
    default:
      return; // Quit when this doesn't handle the key event.
  }
  // Consume the event for suppressing "double action".
  event.preventDefault();
}, true);



