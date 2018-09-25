class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (event => {
      const $square = $(event.currentTarget);
      if (this.game.board.isEmptyPos($square.data("pos"))) {
          this.makeMove($square);
      }
    }));
  }

  makeMove($square) {
    $square.text(this.game.currentPlayer);
    $square.addClass(this.game.currentPlayer);
    this.game.playMove($square.data("pos"));
    
    if (this.game.winner()) {
      this.$el.off("click");
      const $winner = $(`<h1>${this.game.winner()} Wins!</h1>`);
      this.$el.append($winner);
    } else if (this.game.isOver()) {
      this.$el.off("click");
      const $drawmessage = $(`<h1>You tied!</h1>`);
      this.$el.append($drawmessage);
    }
  }

  setupBoard() {
    const $ul = $('<ul>');
    
    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (var colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $('<li>');
        $li.data("pos", [rowIdx, colIdx]);
        
        $ul.append($li);
      }
    }
    
    this.$el.append($ul);
  }
}

module.exports = View;