function AddBoard(){
  this.clickBoardAdd();
}

AddBoard.prototype.clickBoardAdd = function(){
  var boardAdd = document.querySelector(".boardAdd");
  boardAdd.addEventListener("click", function(e){
    var target = e.target;
    if(target.classList.contains("input-compo01-add")){
      this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
      return;
    }
    else if(target.classList.contains("input-compo01-btn-save")){
      this.saveBoad(target);
    }
    else if(target.classList.contains("input-compo01-btn-cancel")){
      this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
      return;
    }
  }.bind(this))
}

AddBoard.prototype.toggleClass = function(target, className, allObj){
  var allEle = document.querySelectorAll(allObj);
  if(target.classList.contains(className)){
    target.classList.remove(className);
  }
  else{
    for(var i = 0 ; i<allEle.length ;i++){
      allEle[i].classList.remove(className);
    }
    target.classList.add(className);
  }
}

AddBoard.prototype.saveBoad = function(target){
  var inputText =  target.closest(".input-compo01-box").querySelector(".input-compo01-text").value;
  if(inputText === ""){
    return;
  }
  var data = {"title" : inputText};
  data = JSON.stringify(data);
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(e){
    var boardId = JSON.parse(e.target.responseText);
    this.addBoard(target, boardId);
  }.bind(this))
  oReq.open("POST", "http://localhost:3000/board/make_board");
  oReq.setRequestHeader("Content-Type", "application/json")
  oReq.send(data);
}

AddBoard.prototype.addBoard = function(target, boardId){
  this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
  var boardAdd = document.querySelector(".boardAdd");
  var boardList = document.querySelector(".boardList");
  var boardWrap = document.createElement("ARTICLE");
  var title = target.closest(".input-compo01-box").querySelector(".input-compo01-text").value;
  var boardTemplate = document.getElementById("boardTemplate").innerHTML;
  var result= "";
  boardWrap.classList.add("board");
  boardWrap.setAttribute("data-boardid", boardId);
  result = boardTemplate.replace("{{board_title}}", title);
  boardWrap.insertAdjacentHTML("beforeend", result);
  boardList.insertBefore(boardWrap, boardAdd);
  new Board(boardWrap);
  target.closest(".input-compo01-box").querySelector(".input-compo01-text").value = "";
}
