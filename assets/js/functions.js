var drawCanvasGid = function(){
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

$(document).ready(function(){

drawCanvasGid();

$('.header').hide();
//$('.game-options').hide();
$('.symbol-select').hide();
$('#canvas').hide();
$('.boxes').hide();

$('.single-player').click(function(){
  $('.game-options').fadeOut(400);
  $('.symbol-select').fadeIn(400);
  $('.symbol-select .prompt').text('Would you like to be X or O?');
});

$('.two-player').click(function(){
  $('.game-options').fadeOut(400);
  $('.symbol-select').fadeIn(400);
  $('.symbol-select .prompt').text('Player-1: Would you like to be X or O?');
});


$('.go-back').click(function(){
  $('.symbol-select').fadeOut(400);
  $('.game-options').fadeIn(400);

});

$('.symbol-x, .symbol-O').click(function(){
  $('.symbol-select').fadeOut(400);
  $('#canvas, .boxes').fadeIn(800);
  $('.header').fadeIn(300);
});

$('.resetAll').click(function(){
  $('.header').hide();
  $('#canvas, .boxes').hide();
  $('.game-options').fadeIn(600);
});


});
