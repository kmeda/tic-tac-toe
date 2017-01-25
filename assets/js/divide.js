//MYAPP is the abject containing functions within objects
MYAPP = {
gameInPlay: false, //flag if game in progress
winCombos: [], //All sides and diagonals as arrays
playerOneScore: 0, //Scores
playerTwoScore: 0; //Scores

initializeVars: function(){ //Current number of moves and board status
  this.numFilledIn = 0;
  this.currentBoard = {};
},

initializeGame: function(){ //Startng point and full control thereof

},

display: { // Object for all display based functions
  hideGameStarter: {}, // X O selection
  showGameStarter: {}, // X O selection
  showGameChoice: {}, // Main Screen game mode
  hideGameChoice: {}, // Main Screen game mode
  showPlayerOnePrompt: {}, //Animation Pop Out Player 1
  hidePlayerOnePrompt: {}, //Animation Pop Out Player 1
  showPlayerTwoPrompt: {}, //Animation Pop Out Player 2
  hidePlayerTwoPrompt: {}, //Animation Pop Out Player
  showDrawMessage: {}, //Draw message after completion of moves
  hideDrawMessage: {},
  showLoseMessage: {}, // message "You lost"
  hideLoseMessage: {},
  showWinMessage: {}, // message "You win"
  hideWinMessage: {},
  drawBoard: {}, // Draw canvas grid
  resetSquares: {}, //all squares be cleared
  showScore: {}, //Player scores
  updateScore: {}
},

game: {
  whoStarts: {}, //Generate a random number
  gameSelection: {}, // returns true based on seelction
  firstGame: {}, //symbol select & assign //turn randomise //invoke play
  play: {}, //set ingame true // show player turn // on click invoke playerTurn
  playerTurn: {}, //Assigns symbol // Displays symbol in box // Updates the board values // Checks end turn //
  computerplay: {}, //
  endTurn: {}, // checks if game is in play // checks win combo and updates score // switch turns
  updateSquare: {}, // updates Current board with symbol at the square position
  checkWin: {}, // checks by iterating each move to match with win combos
  showWinningCombination: {}, // checks the win combo and equate to box number and then highlight
  updateScore: {}, //update score based on turn
  reset: {}, // Reset everything with gameInPlay true
  resetGame: {}
},

computer: {
  computerWhichMove: {},
  winOrBlockChoice: {},
  doubleThreatChoice: {},
  diagonalSecondAttack: {},
  firstPlay: {},
  playCenter: {},
  emptyCorner: {},
  emptySide: {}
}
};

MYAPP.initializeGame();
