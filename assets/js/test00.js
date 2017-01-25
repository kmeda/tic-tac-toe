var MYAPP = MYAPP || {
  gameInPlay: false,
  winCombos: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ],
  playerOneScore: 0,
  playerTwoScore: 0,
  timeOuts: [],
  initializeVars: function() {
    this.numFilledIn = 0;
    this.currentBoard = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    };
  },
  initializeGame: function() {
    MYAPP.initializeVars();
    MYAPP.display.drawBoard();
    $('.game-choice button').click(function() {
      MYAPP.secondPlayer = MYAPP.game.gameSelection(this);
      MYAPP.display.hideGameChoice();
      MYAPP.display.showGameStarter(MYAPP.secondPlayer);
      $('.game-starter .choose-x, .game-starter .choose-o').off().click(MYAPP.game.firstGame);

      $('.back-button').on('click', function() {
        MYAPP.display.hideGameStarter();
        MYAPP.display.showGameChoice();
      });
    });
    $('.hard-reset').on('click', MYAPP.game.resetGame);
  }
};
