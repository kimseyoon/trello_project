function LoadCard(boardId, boardTitle){
  this.cardTemplate = document.getElementById("cardTemplate").innerHTML;
  this.todoTemplate = document.getElementById("cardTodoTemplate").innerHTML;
  this.changeWrap(boardId, boardTitle);
}

LoadCard.prototype.changeWrap = function(boardId, boardTitle){
  var content = document.querySelector(".content");
  var cardListWrap = document.querySelector(".cardListWrap");
  var boardWrap = document.querySelector(".boardWrap");
  if(boardWrap){
    content.removeChild(boardWrap);
  }
  else if(cardListWrap){
    content.removeChild(cardListWrap);
  }

  var result = "";
  var cardListWrapTemplate = document.getElementById("cardListWrapTemplate").innerHTML;
  result = cardListWrapTemplate.replace("{{board_title}}", boardTitle);

  var cardListWrap = document.createElement("DIV");
  cardListWrap.classList.add("cardListWrap");
  cardListWrap.setAttribute("data-cardWrapId", boardId);
  cardListWrap.innerHTML = result;
  content.appendChild(cardListWrap);
  new AddList();
  this.initLoadCard(boardId);
}

LoadCard.prototype.initLoadCard = function(boardId){
  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var obj = JSON.parse(this.responseText);
    thisObj.makeCard(obj);
  });
  oReq.open("GET", "http://localhost:3000/board/load_card?id="+boardId);
  oReq.send();
}

LoadCard.prototype.makeCard = function(obj){
  var result = "";
  for(var i = 0; i<obj[0].length;i++){
    result = this.cardTemplate.replace("{{card_title}}", obj[0][i].TITLE);
    var cardList = document.querySelector(".cardList");
    var cardWrap = document.createElement("ARTICLE");
    cardWrap.classList.add("card");
    cardWrap.setAttribute("data-cardid", obj[0][i].ID);
    cardWrap.setAttribute("draggable", "true");
    cardWrap.insertAdjacentHTML("beforeend", result);
    var listAdd= document.querySelector(".listAdd");
    cardList.insertBefore(cardWrap, listAdd);
    this.makeTodo(obj[1], obj[0][i].ID, cardWrap);

    new Card(cardWrap);
    new DragAndDrop(cardWrap, {wrap:".cardList", dragTarget:"head-drag", dragWrap:".card"});
  }
}


LoadCard.prototype.makeTodo = function(todo, cardid, cardWrap){
  var result = "";
  for(var i=0; i<todo.length;i++){
    if(todo[i].CARDID !== cardid){
      continue;
    }
    result = this.todoTemplate.replace("{{todo_text}}", todo[i].TITLE);
    var todoList = cardWrap.querySelector(".todoList");
    var todoWrap = document.createElement("DIV");
    todoWrap.classList.add("todo");
    todoWrap.setAttribute("draggable", "true");
    todoWrap.setAttribute("data-todoid", todo[i].ID);
    todoWrap.insertAdjacentHTML("beforeend", result);
    todoList.appendChild(todoWrap);
  }
}
