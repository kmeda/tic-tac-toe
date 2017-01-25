/*=========================
      Game Logic
==========================*/
MYAPP.game = {
  whoStarts: function() {
    var random = Math.floor(Math.random() * 2 + 1);
    return random;
  },
  gameSelection: function(item) {
    if ($(item).text() === 'One Player') {
      // returns what secondPlayer value to set
      return false;
    }
    else {
      return true;
    }
  },
  firstGame: function() {
    MYAPP.playerOneSymbol = $(this).text();
    MYAPP.playerTwoSymbol = MYAPP.playerOneSymbol == 'X' ? 'O' : 'X';
    MYAPP.turn = MYAPP.game.whoStarts();
    MYAPP.display.hideGameStarter();
    $('#myCanvas').animate({'opacity': '1'}, 1200);
    $('.hard-reset').fadeIn(600);
    MYAPP.display.showScore();
    MYAPP.display.resetSquares();
    MYAPP.game.play();
  },
  play: function() {

    MYAPP.gameInPlay = true;
    $('.boxes li').on('click', function() {
     MYAPP.game.playerTurn(this);
    });

    MYAPP.timeOuts.push(
      setTimeout(function(){
      if (MYAPP.turn === 1) {
        MYAPP.display.showPlayerOnePrompt();
      }
      else if (MYAPP.turn === 2) {
        MYAPP.display.showPlayerTwoPrompt();
      }
    }, 1500),
    setTimeout(function() {
      if (MYAPP.turn === 2 && !MYAPP.secondPlayer) {
        MYAPP.game.computerPlay();
      }
    }, 1200));
  },
  playerTurn: function(square) {
    var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
    var box = $(square).children('i').children('span');
    if (box.text() === '' && MYAPP.gameInPlay && (MYAPP.turn === 1 || (MYAPP.turn === 2 && MYAPP.secondPlayer))) {
      box.text(symbol);
      var number = $(square).attr('class');
      MYAPP.game.updateSquare(number, symbol);
      MYAPP.game.endTurn(symbol);
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
  },
  endTurn: function(symbol) {
    MYAPP.numFilledIn = MYAPP.numFilledIn + 1;
    if (MYAPP.gameInPlay) {
      if (MYAPP.game.checkWin(symbol)[0]) {
        MYAPP.game.updateScore(MYAPP.turn);
        if (MYAPP.secondPlayer) {
          MYAPP.display.showWinMessage();
        }
        else {
          MYAPP.turn === 1 ? MYAPP.display.showWinMessage() : MYAPP.display.showLoseMessage();
        }
        MYAPP.gameInPlay = false;
        MYAPP.game.showWinningCombination();
        MYAPP.display.hidePlayerOnePrompt();
        MYAPP.display.hidePlayerTwoPrompt();
        MYAPP.game.reset();
      }
      // stop if it is a draw
      else if (MYAPP.numFilledIn >= 9) {
        MYAPP.gameInPlay = false;
        MYAPP.display.hidePlayerOnePrompt();
        MYAPP.display.hidePlayerTwoPrompt();
        MYAPP.display.showDrawMessage();
        MYAPP.turn = MYAPP.game.whoStarts();
        MYAPP.game.reset();
      } else {
        if (MYAPP.turn === 1) {
          MYAPP.display.hidePlayerOnePrompt();
          MYAPP.display.showPlayerTwoPrompt();
          MYAPP.turn = 2;
          // call computer turn if no second player
          if (!MYAPP.secondPlayer) {
            MYAPP.game.computerPlay();
          }
        } else if (MYAPP.turn === 2) {
          MYAPP.display.showPlayerOnePrompt();
          MYAPP.display.hidePlayerTwoPrompt();
          MYAPP.turn = 1;
        }
      }
    }
  },
  updateSquare: function(number, symbol) {
    MYAPP.currentBoard[number] = symbol;
  },
  checkWin: function(symbol) {
    var currentBoard = MYAPP.currentBoard;
    var wins = MYAPP.winCombos;
    var winningCombo = [];
    var winner = wins.some(function(combination) {
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
  },
  showWinningCombination: function() {
    var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
    var combo = MYAPP.game.checkWin(symbol)[1];
    for (var i = 0; i < combo.length; i++) {
      var currentBox = '.' + combo[i];
   // Black box and rotating test for winning combo
        $(currentBox).children('i').addClass('win').children('span').addClass('rotate');
     }
  },
  updateScore: function(turn) {
    turn === 1 ? MYAPP.playerOneScore += 1 : MYAPP.playerTwoScore += 1;

    MYAPP.display.updateScore(turn);

  },
  reset: function() {
    MYAPP.initializeVars();

    MYAPP.timeOuts.push(
      setTimeout(function() {
        MYAPP.display.hideDrawMessage();
        MYAPP.display.hideLoseMessage();
        MYAPP.display.hideWinMessage();
        $('.boxes li').fadeOut();
      }, 5000),
      setTimeout(function(){
        MYAPP.display.resetSquares();
        $('.boxes li').fadeIn();
        MYAPP.numFilledIn = 0;
      }, 6000),
    //Make sure time for next timeout is long enough
    //to not cause problems after first game
      setTimeout(function() {
        MYAPP.gameInPlay = true;
        MYAPP.game.play();
      }, 6000)
      );
  },
  resetGame: function() {
    $('#myCanvas').css('opacity', '0');
    $('.hard-reset').fadeOut();
    $('.points-divider, .score-1, .score-2').fadeOut();
    MYAPP.playerOneScore = 0;
    MYAPP.playerTwoScore = 0;
    MYAPP.display.resetSquares();
    MYAPP.initializeVars();
    MYAPP.gameInPlay = false;
    MYAPP.playerOneSymbol = null;
    MYAPP.playerTwoSymbol = null;
    MYAPP.timeOuts.forEach(function(timer) {
      clearTimeout(timer);
    });
    $('.draw-message, .win-message, .lose-message').hide();
    MYAPP.display.hidePlayerOnePrompt();
    MYAPP.display.hidePlayerTwoPrompt();
    MYAPP.display.showGameChoice();
  }
};
