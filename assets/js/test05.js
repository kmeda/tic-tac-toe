

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
