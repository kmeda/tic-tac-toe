//Display options

var player1Symbol = '';
var player2Symbol = '';
var player1Score = 0;
var player2Score = 0;
var gameInPlay = false;
var numPositionsFilled = 0;
var secondPlayer = false;
var turn;

var boardPositions = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''};
var winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];

var drawBoard =  function(){
  var c = document.getElementById("canvas");
  var canvas = c.getContext("2d");

  canvas.lineWidth = 1;
  canvas.strokeStyle = '#fff';

  canvas.beginPath();
  canvas.moveTo(100, 5);
  canvas.lineTo(100, 145);
  canvas.closePath();
  canvas.stroke();

  canvas.beginPath();
  canvas.moveTo(200, 5);
  canvas.lineTo(200, 145);
  canvas.closePath();
  canvas.stroke();

  canvas.lineWidth = 0.5;
  canvas.beginPath();
  canvas.moveTo(10, 49.5);
  canvas.lineTo(290, 49.5);
  canvas.closePath();
  canvas.stroke();

  canvas.beginPath();
  canvas.moveTo(10, 99.5);
  canvas.lineTo(290, 99.5);
  canvas.closePath();
  canvas.stroke();
}

//reset boardPositions
var resetBoard = function(){
  for (var i = 1; i <= 9; i++) {
      boardPositions[i] = '';
  }
}

// Remove existing squares and append new squares
var resetSquares = function() {
  $('.boxes').html('');
  for (var i = 1; i <= 9; i++) {
    var box = '<li class="box' + i + '"><i class="letter"><span></span></i></li>';
    $(box).appendTo($('.boxes'));
  }
}

// Who goes first
var randomizePlayer = function(){
  var random = Math.floor(Math.random()* 2 + 1);
  return random;
}


var checkWin = function(symbol){
  var currentBoard = boardPositions;
  var wins = winCombos;
  var winningCombo = [];
  var winner = wins.some(function(combination){
    var winning = true;
    for (var i = 0; i < combination.length; i++) {
      if (currentBoard[combination[i]] !== symbol) {
        winning = false;

      }
    }
    if (winning) {
      winningCombo = combination;
    }
    return winning;
  });
  return [winner, winningCombo];
}
// Game start - Show Main Screen Game Options // Go with the flow baby
var initializeGame = function(){

  // Show Main Screen | Game Mode selection screen
  $('.header').hide();
  $('.symbol-select').hide();
  //$('.player1Prompt, .player2Prompt').hide();
  $('#canvas').hide();
  $('.boxes').hide();
  $('.game-options').fadeIn(); //***

    // Show Symbol selection screen
    $('.gameMode').off().click(function(){
      $('.game-options').hide();
      $('.symbol-select').fadeIn(); //***
      secondPlayer = function(){
        if (gameMode === 'Single Player') {
          return false;
        } else {
          return true;
        }
      }
      console.log(secondPlayer());

      var gameMode = $(this).text();


      // Back button to go back to main screen
      $('.go-back').click(function(e) {
        e.stopPropagation();
        $('.game-options').fadeIn(500); //***
        $('.symbol-select').fadeOut(300);
      });

        // Symbol selection and assignment to players



      $('.symbol-x, .symbol-O').off().click(function(e){
        e.stopPropagation();
        console.log('I am recrusive!');
        player1Symbol = $(this).text();
        player2Symbol = player1Symbol == 'X' ? 'O' : 'X';

          turn = randomizePlayer();
          console.log('turn: '+turn);

        $('.symbol-select').fadeOut(300);
        drawBoard();
        $('#canvas').fadeIn(700); //***
        $('.boxes').fadeIn(700); //***
        $('.header').fadeIn(300); //***
        resetSquares(); //***
        //$('.player1Prompt, .player2Prompt').show();


          //Game start
          gameInPlay = true;
          setTimeout(function(){
            if (turn === 1) {
                //Animate Player 1 prompt
                if (secondPlayer()) {
                  $('.player1Prompt').text('Go Player 1!');
                }
                else {
                  $('.player1Prompt').text('Your turn!');
                }
                $('.player1Prompt').fadeIn().animate({'margin-top': '-60px'}, 500);
            }
            else if (turn === 2) {
              // Animate Player 2 prompt
              if (secondPlayer()) {
                $('.player2Prompt').text('Go Player 2!');
              }
              else {
                $('.player2Prompt').text('Computer turn!');
              }
              $('.player2Prompt').fadeIn().animate({'margin-top': '-60px'}, 500);
            }
          }, 600);




          $('.boxes li').click(function(){
            var symbol = turn === 1 ? player1Symbol : player2Symbol;
            var box = $(this).children('i').children('span');
            if (box.text() === '' && gameInPlay && (turn === 1 || (turn === 2 && secondPlayer))) {
              box.text(symbol);

              //updateboard and switch turns // check winner/draw //here

              //update boardPosition
              numPositionsFilled += 1
              var position = ($(this).attr('class'));
                  position = position[position.length - 1];
              boardPositions[position] = symbol;
              console.log('numPositionsFilled: '+numPositionsFilled);
              console.log('current position: '+position);
              console.log(boardPositions);

              //Check Win combo
              if (gameInPlay) {
                if (checkWin(symbol)[0]) {
                  //updateScore here
                  turn === 1 ? player1Score +=1 : player2Score += 1;
                  var currentScore = turn === 1 ? player1Score : player2Score;
                  console.log(turn + " : " +currentScore);
                  $('.score-'+ turn).text(currentScore);

                  if (secondPlayer) {
                    // display win message for that turn player
                    setTimeout(function(){
                      alert("Player "+ turn +" wins!!")

                    }, 400);

                  } else {
                    //if turn === 1 show winmessage or lose message (computer wins case)
                  }
                  gameInPlay = false;
                  //show winning combination
                  //hide player prompts
                  //reset game
                }
                // draw
                else if (numPositionsFilled >= 9) {
                  gameInPlay = false;
                  //hide player prompts
                  //show draw message
                  //randomize turn
                  //reset game
                } else {
                  if (turn === 1) { //switch turns
                    //prompt player 2
                    if (secondPlayer()) {
                      $('.player2Prompt').text('Go Player 2!');
                    }
                    else {
                      $('.player2Prompt').text('Computer turn!');
                    }
                    $('.player1Prompt').animate({'margin-top': '-20px'}, 500);
                    $('.player2Prompt').fadeIn().animate({'margin-top': '-60px'}, 500);

                    turn = 2;
                    if (!secondPlayer) {
                      //computer turn
                    }
                  }else if (turn === 2) {
                    //prompt player 1

                    if (secondPlayer()) {
                      $('.player1Prompt').text('Go Player 1!');
                    }
                    else {
                      $('.player1Prompt').text('Your turn!');
                    }
                    $('.player2Prompt').animate({'margin-top': '-20px'}, 500);
                    $('.player1Prompt').fadeIn().animate({'margin-top': '-60px'}, 500);
                    turn = 1;
                  }
                }
              }
            }
          });
    });
  });

  // Reset All

}

$('.resetAll').click(function(){
  $('.header').hide();
  $('.symbol-select').hide();
  $('#canvas').hide();
  $('.boxes').hide();
  $('.game-options').fadeIn();
  resetBoard();
  resetSquares();
  numPositionsFilled = 0;
  player1Symbol = '';
  player2Symbol = '';
  player1Score = 0;
  player2Score = 0;
  $('.score-1, .score-2').text(0);

  $('.player1Prompt, .player2Prompt').animate({'margin-top': '-20px'}, 500).fadeOut();
  //secondPlayer = false;

});


//End of Line


$(document).ready(function(){

initializeGame();

});


/*

$('.square').click(function(){
    for (var i = 1; i <= 9; i++) {
      if ($('.box'+i).text() === '') {
        $(('.box'+i)).text('O').addClass('symbol-player-1');
    }

    }
});



*/
