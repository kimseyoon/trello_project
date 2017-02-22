function Board(board){
  this.initBoardClick(board);
}

Board.prototype.initBoardClick = function(board){
  board.addEventListener("click", function(){
    var boardId = board.getAttribute("data-boardid");
    var boardTitle = board.querySelector(".title").innerHTML;
    new LoadCard(boardId, boardTitle);
  })
}
