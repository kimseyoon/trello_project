/*
1. 처음 들어가면 board를 보여주는 페이지
2. 원하는 board를 클릭하면 해당 boardId값을 만들어서 loadCard(boardId) 전달
3. 일단 있다면? 지우고

*/

function LoadBoard(){
  this.changeWrap();
}

LoadBoard.prototype.changeWrap = function(){
  var content = document.querySelector(".content");
  var cardListWrap = document.querySelector(".cardListWrap");
  if(cardListWrap){
    content.removeChild(cardListWrap);
  }
  var boardWrapTemplate = document.getElementById("boardWrapTemplate");
  var boardWrap = document.createElement("DIV");
  boardWrap.classList.add("boardWrap");
  boardWrap.innerHTML = boardWrapTemplate.innerHTML;
  content.appendChild(boardWrap);
  this.initLoadBoard();
}

LoadBoard.prototype.initLoadBoard = function(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(e){
    var boardObj = JSON.parse(e.target.responseText);
    this.makeBoard(boardObj);
  }.bind(this))
  oReq.open("GET", "http://localhost:3000/board/load_board");
  oReq.send();
}

LoadBoard.prototype.makeBoard = function(boardObj){
  if(boardObj.length === 0){
    return;
  }
  var boardTemplate = document.getElementById("boardTemplate").innerHTML;
  var boardAdd = document.querySelector(".boardAdd");
  var boardList = document.querySelector(".boardList");
  var result = "";
  for(var i=0; i<boardObj.length;i++){
    var boardWrap = document.createElement("ARTICLE");
    var boardTit = boardObj[i].TITLE;
    boardWrap.classList.add("board");
    boardWrap.setAttribute("data-boardid", boardObj[i].ID);
    result = boardTemplate.replace("{{board_title}}", boardObj[i].TITLE);
    boardWrap.insertAdjacentHTML("beforeend", result);
    //boardWrap.innerHTML = boardObj[i].TITLE;
    boardList.insertBefore(boardWrap, boardAdd);
    //console.log(boardWrap)
    new Board(boardWrap);
    //this.initBoardClick(boardWrap);
  }
}
/*
LoadBoard.prototype.initBoardClick = function(board){
  board.addEventListener("click", function(){
    var boardId = board.getAttribute("data-boardid");
    new LoadCard(boardId);
    new AddList();
  })
}*/
