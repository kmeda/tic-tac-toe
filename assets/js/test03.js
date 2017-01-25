/*================================
    Computer Move Decisions
=================================*/

MYAPP.computer = {
  computerWhichMove: function () {
    var move = this.winOrBlockChoice('win')[0];
    if (!move) {
      move = this.winOrBlockChoice('block')[0];
      console.log(this.winOrBlockChoice('block'));
    }
    if (!move) {
      move = this.doubleThreatChoice('win');
    }
    if (!move) {
      move = this.doubleThreatChoice('block');
    }
    if (!move) {
      move = this.firstPlay();
    }
    if (!move) {
      move = this.playCenter();
    }
    if (!move) {
      move = this.emptyCorner();
    }
    if (!move) {
      move = this.emptySide();
    }
    move = (move && MYAPP.currentBoard[move]) === '' ? move : false;
    return move;
  },

  winOrBlockChoice: function(choiceType, board) {
    var board = board || MYAPP.currentBoard;
    if (choiceType === 'win') {
      var currentSymbol = MYAPP.playerTwoSymbol;
      var opponentSymbol = MYAPP.playerOneSymbol;
    } else if (choiceType === 'block') {
      var currentSymbol = MYAPP.playerOneSymbol;
      var opponentSymbol = MYAPP.playerTwoSymbol;
    } else {
      return;
    }
    var moves = [];
    MYAPP.winCombos.forEach(function(combo) {
      var notFound = [];
      var notPlayer = true;
      for (var i = 0; i < combo.length; i++) {
        if (board[combo[i]] !== currentSymbol) {
          if (board[combo[i]] === opponentSymbol) {
            notPlayer = false;
          } else {
            notFound.push(combo[i]);
          }
        }
      }
      if (notFound.length === 1 && notPlayer) {
        var move = notFound[0];
        moves.push(move);
      }
    });
    return moves;
},

  doubleThreatChoice: function(choiceType) {
  // use winChoice function to test a spot for double threat
  var board = MYAPP.currentBoard;
  var move;

  if (choiceType === 'win') {
    var currentSymbol = MYAPP.playerTwoSymbol;
    var opponentSymbol = MYAPP.playerOneSymbol;
  } else if (choiceType === 'block') {
    var currentSymbol = MYAPP.playerOneSymbol;
    var opponentSymbol = MYAPP.playerTwoSymbol;
  }

  // forced diagonal win on 4th move prevention
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

  firstPlay: function() {
  var board = MYAPP.currentBoard;
  var corners = [1, 3, 7, 9];
  var move;
  if (MYAPP.numFilledIn === 1) {
    // player plays center
    if (board[5] === MYAPP.playerOneSymbol) {
      var cornerNum = Math.floor(Math.random() * 4 + 1);
      move = [1, 3, 7, 9][cornerNum];
    }
    //player plays corner, play opposite corner
    else {
      for (var i = 0; i < corners.length; i++) {
        if (MYAPP.currentBoard[corners[i]] === MYAPP.playerOneSymbol) {
          move = 5;
        }
      }
    }
  } else if (MYAPP.numFilledIn === 0) {
    var cornerNum = Math.floor(Math.random() * corners.length + 1);
    move = corners[cornerNum];
  }
  return move ? move : false;
},

  playCenter: function() {
    if (MYAPP.currentBoard[5] === '') {
      return 5;
    }
  },
  emptyCorner: function() {
  var board = MYAPP.currentBoard;
  var corners = [1, 3, 7, 9];
  var move;
  for (var i = 0; i < corners.length; i++) {
    if (board[corners[i]] === '') {
      move = corners[i];
    }
  }
  return move || false;
},

  emptySide: function() {
  var sides = [2, 4, 6, 8];
  for (var i = 0; i < sides.length; i++) {
    if (MYAPP.currentBoard[sides[i]] === '') {
      return sides[i];
    }
  }
  return false;
}
}

/* End Computer Move Decisions */

$(document).ready(function() {
  MYAPP.initializeGame();
});

/* end game initialization */
