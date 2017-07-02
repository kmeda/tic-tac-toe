

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
