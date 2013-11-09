/**
* @preserve Copyright 2012 Native5
* version 0.5
* author: Native5 Solutions Inc.
*/

/**
 * This is set of functions that enables drag and drop capability to any HTML DOM Element. A draggable widget can move with the user touch input whereas a droppable widget is an element where draggable widget can interact (dropped, removed of the DOM, etc.).
 * @class jQuery
*/
 
var dragElements = new Array();
var dragInitPos = new Array();
var dropElements = new Array();

var dragType, dropObject, dragCallback;

$.fn.extend ({
	
	/**
	 *	This jQuery method makes the element draggable, i.e. it adds touch events to the element and on touch cancel (end of the drag), fires the callback function if provided by the user.
	 *	@method setDraggable
	 *  @param [options] {Object} Contains the array of optional parameters.
	 *	@param [options.callback=null] {function} Callback function which will be fired on completion of drag.
	 *	@example
	 *		$(element).setDraggable({callback: function() {console.log("Successful drag.")}});
	*/ 
	setDraggable: function(options) {
		var opts = options || {};
		dragCallback = opts.callback || null;
		
		$(this).bind('touchstart mousedown', startDrag);
		dragElements.push($(this));
		dragInitPos.push([$(this).offset().left, $(this).offset().top]);
	},
	
	/**
	 *	This jQuery method checks whether the element is Draggable or not. Return true if the element is draggable. This assumes no parameter.
	 *	@method isDraggable
	 *  @return {Boolean}
	 *	@example
	 *		$(element).isDraggable();
	*/ 
	isDraggable: function() {
		var result = false;
		var obj = $(this)[0];
		$.each(dragElements, function(key, val) {
			if(val[0] === obj) {
				result = true;
			}
		});
		return result;
	},
	
	/**
	 *	This jQuery method returns the initial position (left and top distance) of an element when it is set as Draggable. The element must be draggable widget. This assumes no parameters.
	 *	@method initPosition
	 *	@return {Array}
	 *	@example
	 *		$(element).initPosition;
	*/ 
	initPosition: function() {
		var result = new Array();
		var obj = $(this)[0];
		$.each(dragElements, function(key, val) {
			if(val[0] === obj) {
				result = dragInitPos[key];
			}
		});
		return result;
	},
	
	/**
	 *	This jQuery method makes the element droppable. Functionality-wise, it doesn't add any new behavior to the element, but it jsut mark the element as droppable widget. Additionally, callback functions can be fired after the creation of droppable widget.
	 *	@method setDroppable
	 *  @param [options] {Object} Contains the array of optional parameters.
	 *	@param [options.callback=null] {function} Callback function which will be fired on completion of drag.
	 *	@example
	 *		$(element).setDroppable({callback: function() {console.log("Successful drag.")}});
	*/ 
	setDroppable: function(options) {
		var opts = options || {};
		var callback = opts.callback || null;
		
		dropElements.push($(this));
		if(callback && typeof(callback) === "function") {
			callback();
		}
	},
	
	/**
	 *	This jQuery method checks whether the element is Droppable or not. Return true if the element is droppable. This assumes no parameter.
	 *	@method isDroppable
	 *  @return {Boolean}
	 *	@example
	 *		$(element).isDroppable();
	*/ 
	isDroppable: function() {
		var result = false;
		var obj = $(this)[0];
		$.each(dropElements, function(key, val) {
			if(val[0] === obj) {
				result = true;
			}
		});
		return result;
	}
});

function startDrag(e) {
	var self = this;
	
	self.ontouchmove = moveDrag;
	self.ontouchend = cancelTouch;
	self.onmousemove = moveDrag;
	self.onmouseup = cancelMouse;
	
	var origin = [self.offsetLeft, self.offsetTop];
	var pos = [self.offsetLeft, self.offsetTop];
	
	function cancelTouch(e) {
		var self = this;
		e.preventDefault();
		var currentPos = [self.offsetLeft, self.offsetTop];
		self.onmousemove = null;
		self.onmouseup = null;
		if(dragCallback && typeof(dragCallback) === "function") {
			dragCallback();
		}
	}
	
	function cancelMouse(e) {
		var self = this;
		e.preventDefault();
		var currentPos = [self.offsetLeft, self.offsetTop];
		self.onmousemove = null;
		self.onmouseup = null;
		if(dragCallback && typeof(dragCallback) === "function") {
			dragCallback();
		}
	}
	
	function moveDrag(e) {
		var self = this;
		e.preventDefault();
		var currentPos = getCoors(e);
		var deltaX = currentPos[0] - origin[0];
		var deltaY = currentPos[1] - origin[1];
		self.style.left = (pos[0] + deltaX) + 'px';
		self.style.top  = (pos[1] + deltaY) + 'px';
		return false;
	}
	
	function getCoors(e) {
		var coors = [];
		if (e.touches && e.touches.length) { 
			coors[0] = e.touches[0].clientX;
			coors[1] = e.touches[0].clientY;
		} else {
			coors[0] = e.clientX;
			coors[1] = e.clientY;
		}
		return coors;
	}
}

	
/**
 *	This method returns the cordinates of any widget. It return both start and end coordinates along the x and y-axis.
 *	@method getCoordinates
 *	@param element {Object} The element whose coordinates is to get.
 *  @return {Array}
 *	@example
 *		var coords = getCoordinates(element);
*/ 
function getCoordinates(elm) {
	var startx = $(elm).offset().left;
	var starty = $(elm).offset().top;
	var endx = startx + $(elm).width();
	var endy = starty + $(elm).height();
	
	return [startx, starty, endx, endy];
}