/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7)
__webpack_require__(1)
__webpack_require__(6)
__webpack_require__(3)
__webpack_require__(9)
__webpack_require__(8)
__webpack_require__(2)
__webpack_require__(4)
__webpack_require__(5)
__webpack_require__(10)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
  //boardWrap.innerHTML = title;
  boardList.insertBefore(boardWrap, boardAdd);
  new Board(boardWrap);
  //this.initBoardClick(boardWrap);
  target.closest(".input-compo01-box").querySelector(".input-compo01-text").value = "";
}
/*
AddBoard.prototype.initBoardClick = function(board){
  board.addEventListener("click", function(){
    var boardId = board.getAttribute("data-boardid");
    new LoadCard(boardId);
    new AddList();
  })
}*/


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function AddList(){
  this.listAdd = document.querySelector(".listAdd");
  this.cardWrap = document.querySelector(".cardList");
  this.clickListAdd();
}

AddList.prototype.clickListAdd = function(){
  var thisObj = this;
  this.listAdd.addEventListener("click", function(e){
    e.preventDefault();
    var target = e.target;
    if(target.classList.contains("input-compo01-add")){
      thisObj.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
      return;
    }
    if(target.classList.contains("input-compo01-btn-cancel")){
      thisObj.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
      return;
    }
    if(target.classList.contains("input-compo01-btn-save")){
      thisObj.saveCard(target);
      //thisObj.addCard(target);
      return;
    }
  })
}

AddList.prototype.toggleClass = function(target, className, allObj){
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

AddList.prototype.saveCard = function(target){
  var inputCompo01 = target.closest(".input-compo01");
  var list_title = inputCompo01.querySelector(".input-compo01-text");
  var list_title_value = list_title.value;
  if(list_title_value === ""){
    return;
  }

  var titleInput = target.closest(".listAdd").querySelector(".input-compo01-text").value;
  var position = Array.prototype.indexOf.call(this.cardWrap.children, target.closest(".listAdd"));
  var cardWrapId = target.closest(".cardListWrap").getAttribute("data-cardWrapId");

  var data = {"title" : titleInput, "position" : position, "cardWrapId" : cardWrapId};
  data = JSON.stringify(data);

  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var cardId = JSON.parse(this.responseText);
    thisObj.addCard(target, cardId);
  })
  oReq.open("POST", "http://localhost:3000/board/make_card");
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}

AddList.prototype.addCard = function(target, cardId){

  var cardTemplate = document.getElementById("cardTemplate").innerHTML;
  var inputCompo01 = target.closest(".input-compo01");
  var list_title = inputCompo01.querySelector(".input-compo01-text");
  var list_title_value = list_title.value;

  var cardList = document.querySelector(".cardList");
  var cardWrap = document.createElement("ARTICLE");
  cardWrap.classList.add("card");
  cardWrap.setAttribute("draggable", "true");
  cardWrap.setAttribute("data-cardid", cardId);
  cardWrap.insertAdjacentHTML("beforeend", cardTemplate);
  cardWrap.querySelector(".input-compo01-add").innerHTML = list_title_value;
  cardList.insertBefore(cardWrap, this.listAdd);
  inputCompo01.querySelector(".input-compo01-text").value = "";
  this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");

  new Card(cardWrap);
  new DragAndDrop(cardWrap, {wrap:".cardList", dragTarget:"head-drag", dragWrap:".card"});
  return;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Card(card){
  this.clickCard(card);
}

Card.prototype.clickCard = function(card){
  var thisObj = this;
  card.addEventListener("click", function(e){
    e.preventDefault();
    var target = e.target;
    if(target.classList.contains("input-compo01-add")){
      thisObj.routerAddButton(target);
      return;
    }

    if(target.classList.contains("input-compo01-btn-cancel")){
      thisObj.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
      return;
    }

    if(target.classList.contains("todo")){
      //thisObj.openModalLayer(target.getAttribute("data-todoid"));
      thisObj.openModalLayer(target);
      return;
    }

    if(target.classList.contains("input-compo01-btn-save")){
      thisObj.routerSaveButton(target);
      return;
    }

    if(target.classList.contains("input-compo01-pop-open") || target.classList.contains("popOver-close")){
      //thisObj.popOver(target);
      thisObj.toggleClass(target.closest(".input-compo01-wrap-add").querySelector(".popOver"), "show", ".popOver");
      return;
    }

    if(target.classList.contains("card-list-delete")){
      thisObj.deleteCard(target);
      return;
    }

  })
}
/*
Card.prototype.popOver = function(target){
  var card = target.closest(".card");
  var cardList = document.querySelector(".cardList");
  var compo01WrapAdd = card.querySelector(".input-compo01-wrap-add");
  var popOverTemplate = document.getElementById("popOverTemplate").innerHTML;
  var popWrap = document.createElement("DIV");
  popWrap.classList.add("popOver");
  popWrap.insertAdjacentHTML("beforeend", popOverTemplate);
  compo01WrapAdd.appendChild(popWrap);
}*/

Card.prototype.toggleClass = function(target, className, allObj){
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

Card.prototype.routerAddButton = function(target){
  if(target.closest(".headCard")){
    var cardTitle = target.innerHTML;
    target.closest(".input-compo01").querySelector(".input-compo01-text").value = cardTitle;
    this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
    return;
  }
  if(target.closest(".footCard")){
    this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
    return;
  }
}

Card.prototype.openModalLayer = function(target){
  //var modal = document.querySelector(".modal-layer");
  //modal.classList.add("show");
  //new ModalLayer(todoid);
  new ModalLayer(target);
}

Card.prototype.routerSaveButton = function(target){
  if(target.closest(".headCard")){
    this.updateCardTitle(target);
    this.setCardTitle(target);
    return;
  }
  if(target.closest(".footCard")){
    this.saveTodo(target);
    //this.addTodo(target);
    return;
  }
}

Card.prototype.updateCardTitle = function(target){
  var cardId = target.closest(".card").getAttribute("data-cardid");
  var title = target.closest(".headCard").querySelector(".input-compo01-text").value;

  var data = {"cardId" : cardId, "title" : title};
  data = JSON.stringify(data);

  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    return;
  })
  oReq.open("POST", "http://localhost:3000/board/update_card")
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}

Card.prototype.setCardTitle = function(target){
  //console.log("aaa")
  var afterTitle = target.closest(".headCard").querySelector(".input-compo01-text").value;
  target.closest(".headCard").querySelector(".input-compo01-add").innerHTML = afterTitle;
  this.toggleClass(target.closest(".input-compo01"), "change", ".input-compo01");
}


Card.prototype.saveTodo = function(target){
  if(target.closest(".footCard").querySelector(".input-compo01-text").value === ""){
    return;
  }
  var cardId = target.closest(".card").getAttribute("data-cardid");
  var title = target.closest(".footCard").querySelector(".input-compo01-text").value;
  var data = {"title":title, "cardId":cardId};
  data = JSON.stringify(data);

  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var todoId = JSON.parse(this.responseText);
    thisObj.addTodo(target, todoId);
  })
  oReq.open("POST", "http://localhost:3000/board/make_todo")
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}


Card.prototype.addTodo = function(target, todoId){
  var cardTodoTemplate = document.getElementById("cardTodoTemplate").innerHTML;
  //target.closest(".footCard").querySelector(".input-compo01-text").value;

  var text = target.closest(".footCard").querySelector(".input-compo01-text").value;
  var todoList = target.closest(".card").querySelector(".todoList");
  var todoWrap = document.createElement("DIV");
  todoWrap.classList.add("todo");
  todoWrap.setAttribute("draggable", "true");
  todoWrap.setAttribute("data-todoid", todoId);
  cardTodoTemplate = cardTodoTemplate.replace("{{todo_text}}", text);
  todoWrap.insertAdjacentHTML("beforeend", cardTodoTemplate);
  todoList.appendChild(todoWrap);
  var text = target.closest(".footCard").querySelector(".input-compo01-text").value = "";
  //var drag = new DragAndDrop(this.todoWrap, {wrap:".todoList", dragTarget:"todo", dragWrap:".todo"});
}


Card.prototype.deleteCard = function(target){
  var cardList = document.querySelector(".cardList");
  cardList.removeChild(target.closest(".card"));

  var cardId = target.closest(".card").getAttribute("data-cardid");
  var data = {"cardId" : cardId};
  data = JSON.stringify(data);
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
  })
  oReq.open("POST", "http://localhost:3000/board/del_card");
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
1. obj는 drag 이벤트를 걸 객체
2.

*/


function DragAndDrop(obj, attr){
  this.wrap = attr.wrap;
  this.dragWrap = attr.dragWrap;
  this.dragTarget = attr.dragTarget;

  //console.log(this.wrap, this.dragWrap, this.dragTarget);
  this.initDragEvent(obj);
}

// 동적으로 생성된 obj 이벤트 걸어주기
DragAndDrop.prototype.initDragEvent = function(obj){
  this.dragStart(obj);
  this.drag(obj);
  this.dragOver(obj);
  this.dragEnter(obj);
  this.dragLeave(obj);
  this.drop(obj);
  this.dragEnd(obj);
}

DragAndDrop.prototype.dragStart = function(obj){
  //e.preventDefault();
  //e.stopPropagation();
  var thisObj = this;
  obj.addEventListener("dragstart", function(e){
    if(e.target.classList.contains(thisObj.dragTarget)){
      //console.log(e.clientX);
      e.dataTransfer.setDragImage(e.target.closest(thisObj.dragWrap), 0, 0);
      e.target.closest(thisObj.dragWrap).classList.add("over");

      //var wrap = document.querySelector(thisObj.wrap);

      var wrap = e.target.closest(thisObj.wrap);
      var dragIndex = Array.prototype.indexOf.call(wrap.children, e.target.closest(thisObj.dragWrap));
      e.dataTransfer.setData("Text", dragIndex);
      return;
    }else{
      return;
    }
  })
}

DragAndDrop.prototype.dragEnter = function(obj){
  var thisObj = this;
  obj.addEventListener("dragenter", function(e){

  });
}


DragAndDrop.prototype.dragEnd = function(obj){
  var thisObj = this;
  obj.addEventListener("dragend", function(e){
    //console.log(e.target)
    e.target.closest(thisObj.dragWrap).classList.remove("over");
  });
}

DragAndDrop.prototype.drag = function(obj){
  var thisObj = this;
  obj.addEventListener("drag", function(e){
    //console.log(e.target)
  });
}

DragAndDrop.prototype.dragOver = function(obj){
  var thisObj = this;
  obj.addEventListener("dragover", function(e){
    e.preventDefault();
  })
}

DragAndDrop.prototype.dragLeave = function(obj){
  obj.addEventListener("dragleave", function(e){

    //e.target.closest(thisObj.dragWrap).classList.add("over");
  })

}

DragAndDrop.prototype.drop = function(obj){
  var thisObj = this;
  obj.addEventListener("drop", function(e){
    var dragIndex = e.dataTransfer.getData("Text");
    if(dragIndex === ""){
      return;
    }
    //var wrap = document.querySelector(thisObj.wrap);
    var wrap = e.target.closest(thisObj.wrap);
    if(e.target.closest(thisObj.dragWrap)){
      var dropIndex = Array.prototype.indexOf.call(wrap.children, e.target.closest(thisObj.dragWrap));
      if(dragIndex < dropIndex){
        insertAfter(wrap.children[dragIndex], e.target.closest(thisObj.dragWrap));
      }

      else{
        wrap.insertBefore(wrap.children[dragIndex], e.target.closest(thisObj.dragWrap));
      }
      e.dataTransfer.clearData("Text");
      e.stopPropagation();
      return;
    }
  })
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

function LoadCard(boardId, boardTitle){
  //history.pushState({}, boardTitle, "/board/"+boardTitle);

  this.cardTemplate = document.getElementById("cardTemplate").innerHTML;
  this.todoTemplate = document.getElementById("cardTodoTemplate").innerHTML;
  //this.getBoardTit(boardId);
  this.changeWrap(boardId, boardTitle);
}
/*
LoadCard.prototype.getBoardTit = function(boardId){
  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var obj = JSON.parse(this.responseText);
    thisObj.changeWrap(boardId, obj)
  });
  oReq.open("GET", "http://localhost:3000/board/get_boardTit?id="+boardId);
  oReq.send();
}*/

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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", function(){
  new LoadBoard();
  new AddBoard();
  new Header();
  //new LoadCard();
  //new AddList();
  //add.clickListAdd();
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
1. todo를 누르면 해당 id값을 가져온다.
2. ajax post로 해당 id를 문자열로 바꿔서 서버로 보낸다.
3. 서버에서는 해당 id값을 가지고 todo 테이블에서 해당하는 내용을 찾는다
4. 디비에서 조회한 것들을 json화 시켜서 클라이언트로 보낸다.
5. 받은 json 데이터를 문자열로 바꾼뒤 템플릿에 원하는 값들을 담아서 화면에 뿌린다.

저장하는법
1. form 태그 안에 있는 데이터를 객체에 저장하고 그것을 문자열화 시킨다.
2. 문자열을 서버로 보낸다.
3. 서버에서 받은 문자열을 가지고 인서트한다.
4. 성공적으로 insert 하면 다시 데이터를 json으로 보낸다.
5. 받은 json데이터를 문자열로 바꾼뒤 템플릿에 원하는 값들로 보여준다.

dataAttribute
*/

function ModalLayer(target){
  this.todoTarget = target;
  this.todoId = target.getAttribute("data-todoid");
  this.modalTemplate = document.getElementById("modalTemplate").innerHTML;
  this.commentTemplate = document.getElementById("layerCommentTemplate").innerHTML;
  this.content = document.querySelector(".content");
  this.loadTodo(this.todoId);
}

ModalLayer.prototype.loadTodo = function(todoId){
  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var obj = JSON.parse(this.responseText);
    thisObj.makeModal(obj, todoId);
  })
  oReq.open("GET", "http://localhost:3000/board/load_modal?id="+todoId);
  oReq.send();
}

ModalLayer.prototype.makeModal = function(obj, todoid){
  var result ="";
  var modalWrap = document.createElement("DIV");

  if(obj[0].DESCRIPTION === null){
    obj[0].DESCRIPTION = "";
  }

  modalWrap.classList.add("modal-layer");
  result = this.modalTemplate.replace("{{modal_title}}", obj[0].TITLE)
                              .replace("{{modal_desciption}}", obj[0].DESCRIPTION);
  modalWrap.innerHTML = result;
  this.content.appendChild(modalWrap);

  var layerActivity = document.querySelector(".layer-activity");
  //this.commentTemplate;


  var commentResult = "";
  for(var i=0;i<obj[1].length;i++){

    var commentWrap = document.createElement("DIV");
    commentWrap.classList.add("comment-wrap");
    commentResult = this.commentTemplate.replace("{{modal_reply_text}}", obj[1][i].CONTENT)
                                        .replace("{{now_date}}", obj[1][i].DATE);
    commentWrap.innerHTML = commentResult;
    layerActivity.appendChild(commentWrap);
  }
  this.clickModal(todoid);
}

ModalLayer.prototype.clickModal = function(todoid){
  var thisObj = this;
  this.modal = document.querySelector(".modal-layer");
  this.modal.addEventListener("click", function(e){
    e.preventDefault();
    var target = e.target;
    if(target.classList.contains("layer-close")){
      thisObj.content.removeChild(thisObj.modal);
      return;
    }

    if(target.classList.contains("layer-edit-btn")){
      thisObj.show(target, ".layer-todo");
      thisObj.getLayerTodo(target, thisObj.modal);
      //console.log(target.closest(".layer-todo").querySelector(".todo-write-text"));
      return;
    }

    if(target.classList.contains("todo-cancle-btn")){
      thisObj.hide(target, ".layer-todo");
      return;
    }

    if(target.classList.contains("todo-save-btn")){
      if(target.closest(".layer-todo-write").querySelector(".todo-textarea").value === ""){
        return;
      }
      thisObj.updateTodo(target, todoid);
      thisObj.setLayerTodo(target);
      //target.closest(".layer-todo").querySelector(".desc-txt").innerHTML = target.closest(".layer-todo-write").querySelector(".todo-textarea").value;
      thisObj.hide(target, ".layer-todo");
      return;
    }

    if(target.classList.contains("comment-save")){
      thisObj.makeComment(target, todoid);
      return;
    }
  })
}

ModalLayer.prototype.getLayerTodo = function(target, modal){
  var layerTodo = target.closest(".layer-todo");
  layerTodo.querySelector(".todo-write-text").value = modal.querySelector(".layer-tit").innerHTML;
  layerTodo.querySelector(".todo-textarea").value = modal.querySelector(".desc-txt").innerHTML;
}

ModalLayer.prototype.show = function(target, parent){
  var obj = target.closest(parent);
  obj.classList.add("show");
}

ModalLayer.prototype.hide = function(target, parent){
  var obj = target.closest(parent);
  obj.classList.remove("show");
}

ModalLayer.prototype.updateTodo = function(target, todoId){
  var title = target.closest(".layer-todo-write").querySelector(".todo-write-text").value;
  var description =  target.closest(".layer-todo-write").querySelector(".todo-textarea").value;

  var data = {"title":title, "description":description, "todoId":todoId};
  data = JSON.stringify(data);

  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    return;
  })
  oReq.open("POST", "http://localhost:3000/board/update_todo")
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}

ModalLayer.prototype.setLayerTodo = function(target){
  var layerTodo = target.closest(".layer-todo");
  layerTodo.querySelector(".layer-tit").innerHTML = layerTodo.querySelector(".todo-write-text").value;
  layerTodo.querySelector(".desc-txt").innerHTML = layerTodo.querySelector(".todo-textarea").value;
  this.todoTarget.innerHTML = layerTodo.querySelector(".todo-write-text").value;
}

ModalLayer.prototype.makeComment = function(target, todoId){
  var content = target.closest(".input-box").querySelector(".comment-text").value;
  if(content === ""){
    return;
  }
  var data = {"content" : content, "todoId" : todoId};
  data = JSON.stringify(data);
  var thisObj = this;
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    var objCommt = JSON.parse(this.responseText);
    thisObj.addComment(target, objCommt);
  })
  oReq.open("POST", "http://localhost:3000/board/make_commt");
  oReq.setRequestHeader("Content-Type", "application/json");
  oReq.send(data);
}

ModalLayer.prototype.addComment = function(target, objCommt){
  var commentId = objCommt.commentId;
  var nowDate = objCommt.date;
  var content = target.closest(".input-box").querySelector(".comment-text").value;
  var commentWrap = document.createElement("DIV");
  var commentReuslt = "";
  commentWrap.classList.add("comment-wrap");
  commentResult = this.commentTemplate.replace("{{modal_reply_text}}", content)
                                      .replace("{{now_date}}", nowDate);
  commentWrap.innerHTML = commentResult;
  commentWrap.setAttribute("data-commtid", commentId);
  var layerActivity = document.querySelector(".layer-activity");
  layerActivity.appendChild(commentWrap);
  target.closest(".input-box").querySelector(".comment-text").value = "";
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);