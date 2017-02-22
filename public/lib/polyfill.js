/*
element.closest();
https://developer.mozilla.org/ko/docs/Web/API/Element/closest
*/
  if (window.Element && !Element.prototype.closest) {
      Element.prototype.closest =
      function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
              i,
              el = this;
          do {
              i = matches.length;
              while (--i >= 0 && matches.item(i) !== el) {};
          } while ((i < 0) && (el = el.parentElement));
          return el;
      };
  }

//http://snipplr.com/view/2107/insertafter-function-for-the-dom/
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;

	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}
