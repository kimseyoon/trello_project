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
