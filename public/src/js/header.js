function Header(){
  this.initHeaderClick();
}

Header.prototype.initHeaderClick = function(){
  var head = document.querySelector(".head");
  head.addEventListener("click", function(e){
    var target = e.target;
    if(target.classList.contains("board_list_btn")){
      this.toggleClass(target.closest(".schBox").querySelector(".myBoardList"), "show");
      this.getBoardList();
      return;
    }
  }.bind(this))
}

Header.prototype.toggleClass = function(target, className){
  if(target.classList.contains(className)){
    target.classList.remove(className);
  }
  else{
    target.classList.add(className);
  }
}

Header.prototype.getBoardList = function(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(e){
    var target = e.target;
    var obj = JSON.parse(e.target.responseText);
    this.makeBoardList(obj);
  }.bind(this))
  oReq.open("GET", "http://localhost:3000/board/get_board");
  oReq.send();
}

Header.prototype.makeBoardList = function(obj){
  var myBoardList= document.querySelector(".myBoardList");
  var list = myBoardList.querySelector(".list");
  for(var i=0; i<obj.length;i++){
    var liWrap = document.createElement("LI");
    liWrap.setAttribute("data-boardId", obj[i].ID);
    liWrap.innerHTML = obj[i].TITLE;
    list.appendChild(liWrap);
    this.clickBoardList(liWrap);
  }
}

Header.prototype.clickBoardList = function(liWrap){
  liWrap.addEventListener("click", function(e){
    var target = e.target;
    var boardId = target.getAttribute("data-boardId");
    var boardTitle = target.innerHTML;
    new LoadCard(boardId, boardTitle);
    this.toggleClass(target.closest(".schBox").querySelector(".myBoardList"), "show");
  }.bind(this))
}
