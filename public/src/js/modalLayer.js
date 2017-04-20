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
