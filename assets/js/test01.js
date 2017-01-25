/*=========================
    Display functions
==========================*/
MYAPP.display = {
hideGameStarter: function() {
$('.game-starter').fadeOut();
},

showGameStarter: function(isTwoPlayer) {
var message;
if (isTwoPlayer) {
  message = "Player 1 : Would you like X or O?"
}
else {
  message = "Would you like to be X or O?";
}
MYAPP.timeOuts.push(
  setTimeout(function() {
    $('.game-starter').fadeIn(500).children('p').text(message);
}, 700));
},

showGameChoice: function() {
$('.game-choice').fadeIn(600);
},

hideGameChoice: function() {
$('.game-choice').fadeOut(600);
},

showPlayerOnePrompt: function() {
if (MYAPP.secondPlayer) {
  $('.player-one-turn p').text('Go Player 1!');
}
else {
  $('.player-one-turn p').text('Your turn!');
}
$('.player-one-turn').animate({'top': '-45px'}, 500);
},

hidePlayerOnePrompt: function() {
$('.player-one-turn').animate({'top': '0'}, 500);
},

showPlayerTwoPrompt: function() {
if (MYAPP.secondPlayer) {
  $('.player-two-turn p').text('Go Player 2!');
}
else {
  $('.player-two-turn p').text('Computer\'s turn');
}
$('.player-two-turn').animate({'top': '-45px'}, 500);
},

hidePlayerTwoPrompt: function() {
$('.player-two-turn').animate({'top': '0'}, 500);
},

showDrawMessage: function() {
MYAPP.timeOuts.push(
  setTimeout(function() {
  $('.draw-message').fadeIn(500);
}, 1500));
},

hideDrawMessage: function() {
$('.draw-message').fadeOut(1000);
},

showLoseMessage: function() {
  MYAPP.timeOuts.push(
    setTimeout(function() {
  $('.lose-message').fadeIn(500);
}, 1500)
  );
},

hideLoseMessage: function() {
$('.lose-message').fadeOut(1000);
},

showWinMessage: function() {
  MYAPP.timeOuts.push(
    setTimeout(function() {
  $('.win-message').fadeIn(500).children('p').text("Player " + MYAPP.turn + " wins!! :D ")
}, 1500));
},

hideWinMessage: function() {
$('.win-message').fadeOut(1000);
},

drawBoard: function() {
  MYAPP.timeOuts.push(setTimeout(function() {
  var c = document.getElementById("myCanvas");
  var canvas = c.getContext("2d");
  canvas.lineWidth = 1;
  canvas.strokeStyle = "#fff";
  //vertical lines
  canvas.beginPath();
  canvas.moveTo(100, 0);
  canvas.lineTo(100, 146.5);
  canvas.closePath();
  canvas.stroke();
  canvas.beginPath();
  canvas.moveTo(200, 0);
  canvas.lineTo(200, 146.5);
  canvas.closePath();
  canvas.stroke();

  // horizontal lines
  canvas.lineWidth = .5;

  canvas.beginPath();
  canvas.moveTo(4, 48.5);
  canvas.lineTo(296, 48.5);
  canvas.closePath();
  canvas.stroke();

  canvas.beginPath();
  canvas.moveTo(4, 98.5);
  canvas.lineTo(296, 98.5);
  canvas.closePath();
  canvas.stroke();
}, 1500));
},

resetSquares: function() {
$('.boxes').html('');
for (var i = 1; i <= 9; i++) {
  var box = '<li class="' + i + '"><i class="letter"><span></span></i></li>';
  $(box).appendTo($('.boxes'));
}
},

showScore: function() {
  if (MYAPP.secondPlayer) {
    $('.score-1').children('.name').text('player 1');
    $('.score-2').children('.name').text('player 2');
  }
  else {
    $('.score-1').children('.name').text('player 1');
    $('.score-2').children('.name').text('computer');
  }
  $('.score-1, .score-2').children('.points').text('0');
  $('.score-1,.score-2, .points-divider').fadeIn();
},
updateScore: function(turn) {
  var currentScore = turn === 1 ? MYAPP.playerOneScore : MYAPP.playerTwoScore;

  $('.score-' + turn).children('.points').text(currentScore);
}
};
