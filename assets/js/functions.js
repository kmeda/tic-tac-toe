

$(document).ready(function(){

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

drawCanvasGid();

});
