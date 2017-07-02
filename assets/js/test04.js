

doubleThreatChoice: function(choiceType) {
var board = MYAPP.currentBoard;
var move;
if (choiceType === 'win') {
  var currentSymbol = MYAPP.playerTwoSymbol;
  var opponentSymbol = MYAPP.playerOneSymbol;
} else if (choiceType === 'block') {
  var currentSymbol = MYAPP.playerOneSymbol;
  var opponentSymbol = MYAPP.playerTwoSymbol;
}
  if (board[5] === currentSymbol && MYAPP.numFilledIn === 3) {
    if ((board[1] === opponentSymbol && board[9] === opponentSymbol) || (board[3] === opponentSymbol && board[7] === opponentSymbol)) {
      // Play an edge to block double threat
      move = this.emptySide();
    }
  }
  if (!move && board[5] === opponentSymbol && MYAPP.numFilledIn === 2) {
    move = this.diagonalSecondAttack();
  }
if (!move) {
  // clone current board;
  var testBoard = $.extend({}, board);
  for (var i = 1; i <= 9; i++) {

    testBoard = $.extend({}, board);
    if (testBoard[i] === '') {
      testBoard[i] = currentSymbol;
      if (this.winOrBlockChoice(choiceType, testBoard).length >= 2) {
        move = i;
      }
    }
  }
}
return move || false;
},
diagonalSecondAttack: function() {
var board = MYAPP.currentBoard;
var comp = MYAPP.playerTwoSymbol;
var corners = [1,3,7,9];
for (var i = 0; i < corners.length; i++) {
  if (board[corners[i]] === comp) {
    return 10 - corners[i];
  }
}
},

computerPlay: function() {
  var computer = MYAPP.computer;
  //test computer move suggestion
  var boxNumber;
  if (computer.computerWhichMove(MYAPP.game) && MYAPP.turn === 2) {
    boxNumber = computer.computerWhichMove(MYAPP.game);
    var currentBox = $('.' + boxNumber).children('i');

    var symbol = MYAPP.playerTwoSymbol;

    MYAPP.timeOuts.push(
      setTimeout(function() {
      currentBox.children('span').text(symbol);
      MYAPP.game.updateSquare(boxNumber, MYAPP.playerTwoSymbol);
      MYAPP.game.endTurn(symbol);
    }, 1000));
  }
