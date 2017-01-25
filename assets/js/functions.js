//Display options

var player1Symbol = '';
var player2Symbol = '';
var gameInPlay = false;

var secondPlayer = function(){
  if ($('.gameMode').text === 'Single Player') {
    return false;
  } else {
    return true;
  }
}

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
var turn = randomizePlayer();
console.log('turn: '+turn);


// Game start - Show Main Screen Game Options // Go with the flow baby
var initializeGame = function(){

  // Show Main Screen | Game Mode selection screen
  $('.header').hide();
  $('.symbol-select').hide();
  $('#canvas').hide();
  $('.boxes').hide();
  $('.game-options').fadeIn(); //***

    // Show Symbol selection screen
    $('.gameMode').click(function(){
      $('.game-options').hide();
      $('.symbol-select').fadeIn(500); //***

      secondPlayer();

      // Back button to go back to main screen
      $('.go-back').click(function() {
        $('.game-options').fadeIn(500); //***
        $('.symbol-select').fadeOut(300);
      });

        // Symbol selection and assignment to players
        $('.symbol').click(function(){
          $('.symbol-select').fadeOut(300);

          player1Symbol = $(this).text();
          player2Symbol = player1Symbol == 'X' ? 'O' : 'X';

            // Game board | scores
            $('.header').fadeIn(500); //***
            drawBoard();
            $('#canvas').fadeIn(500); //***
            $('.boxes').fadeIn(500); //***
            resetSquares(); //***

              //Game start
              gameInPlay = true;
              if (turn === 1) {
                //Animate Player one
              } else if (turn === 2) {
                // Animate Player 2
              }

              $('.boxes li').click(function(){
                var symbol = turn === 1 ? player1Symbol : player2Symbol;
                var box = $(this).children('i').children('span');
                if (box.text() === '' && gameInPlay && (turn === 1 || (turn === 2 && secondPlayer))) {
                  box.text(symbol);

                  var position = ($(this).attr('class'));
                      position = position[position.length - 1];
                  boardPositions[position] = symbol;
                  console.log(position);
                  console.log(boardPositions);


                  //updateboard and switch turns // check winner/draw //here
                }

              });
        });
    });

  // Reset All
  $('.resetAll').click(function(){
    $('.header').hide();
    $('.symbol-select').hide();
    $('#canvas').hide();
    $('.boxes').hide();
    $('.game-options').fadeIn(); //***
    resetSquares();
    //reset boardPositions
    player1Symbol = '';
    player2Symbol = '';

  });
}



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
