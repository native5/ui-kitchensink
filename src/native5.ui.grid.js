/**
* @preserve Copyright 2012 Native5
* version 0.5
* author: Native5 Solutions Inc.
*/

/**
 *	This is the parent module which holds all the custom widgets, UI elements, libraries, configurations (both client and server side), etc. done in Javascript/jQuery for Native5 Software Solutions &trade;.
 *	@module native5
*/

/**
 *	This is the container for all the custom UI elements and widgets created by Native5 Software Solutions &trade;.
 *	@submodule ui
*/

/**
 *	This widget provides the Grid View implementation required by ImageGallery and supposed to be called internally by ImageGallery. It's created in pure JavaScript.
 *	@class ImageGrid
 *	@constructor
 *	@param element {Object} It's the `HTML DOM element` which contains the set of images.
 *	@param [options] {Object} Options which can be used to modify the ImageGrid as per the need.
 *	@param [options.column=3] {Number} Number of columns to display.
*/

native5.ui.ImageGrid = function(element, options) {
	if (!element) return null;
	var _this = this;
	
	this.options = options || {};
	this.column = this.options.column || 3;
	
	this.container = element;
	this.element = this.container.children[0];
	this.lists = this.element.children;
	
	$(this.element).width($(this.container).width());
	
	var index = this.lists.length;	
	for (i = 0; i < index; i++) {
		var el = this.lists[i];
		width = ($(this.element).width()/this.column)+"px";
		el.style.width = width;
		el.style.listStyleType = "none";
		el.style.display = "inline";
		if((i+1) % this.column == 0) {
			var val = el.innerHTML + "<br />";
			el.innerHTML = val;
		}
	}
}