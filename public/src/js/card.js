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
      thisObj.openModalLayer(target);
      return;
    }

    if(target.classList.contains("input-compo01-btn-save")){
      thisObj.routerSaveButton(target);
      return;
    }

    if(target.classList.contains("input-compo01-pop-open") || target.classList.contains("popOver-close")){
      thisObj.toggleClass(target.closest(".input-compo01-wrap-add").querySelector(".popOver"), "show", ".popOver");
      return;
    }

    if(target.classList.contains("card-list-delete")){
      thisObj.deleteCard(target);
      return;
    }

  })
}

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
