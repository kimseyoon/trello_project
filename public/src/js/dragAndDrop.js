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
