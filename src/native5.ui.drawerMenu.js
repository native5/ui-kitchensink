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
 *	This widget creates touch (swipe) supported drawer style menu. The menu can be placed on any side of the screen. With the touch event, the drawer can be opened or closed and the same feature can be emulated through click event as well. This widget concerns about the supplied element and amount of entities the element holds is of no consequence.
 *	@class Drawer
 *	@constructor
 *	@param element {Object} It's the `HTML DOM element` which will act as drawer menu.
 *	@param [options] {Object} Options which can be used to modify the ImageGallery as per the need.
 *	@param [options.shown=true] {Boolean} Determines if the drawer is shown by default.
 *	@param [options.position='bottom'] {String} Determines the position of drawer menu. Can be `bottom`, `top`, `left`, or `right`.
 *	@param [options.height=160] {Number} Height of drawer in pixels.
 *	@example
 *		var drawer = new native5.ui.drawer(element, {height: 80});
*/

var native5 = {ui: {}};
native5.ui.Drawer = function(element, options) { 
	if (!element) return null;
	
	this.element = element;
	
	this.options = options || {};
	this.shown = this.options.shown || true;
	this.position = this.options.position || 'bottom';
	this.height = this.options.height || 160;
	this.height = "-"+this.height+"px";
	
	$(this.element).css("z-index", "999");
	
	this.swipeToShow();
};

native5.ui.Drawer.prototype = {

	/**
	 *	This method adds the swipe events to the drawer menu and is called internally by the drawer object. This can also be used to add swipe functionality to different elements, once the DrawerMenu object is created.
	 *	@method swipeToShow
	 *	@param element {Object} `HTML DOM element` on which swipe action is to be binded.
	 *	@example
	 *		drawer.swpeToShow(element);
	*/ 
	swipeToShow: function (el) {
		var elm;
		var _this = this;
		
		if(el) {
			elm = el;
		}
		else {
			elm = _this.element;
		}
		
		if((_this.position).toLowerCase() == "bottom") {
			$(elm).on("swipedown", function(e){
				e.preventDefault();
				$(_this.element).animate({bottom: _this.height}, "fast", "linear");
				_this.shown = false;
			});
			$(elm).on("swipeup", function(e){
				e.preventDefault();
				$(_this.element).animate({bottom: "0px"}, "fast", "linear");
				_this.shown = true;
			});
		}
		if((_this.position).toLowerCase() == "top") {
			$(elm).on("swipeup", function(e){
				e.preventDefault();
				$(_this.element).animate({top: _this.height}, "fast", "linear");
				_this.shown = false;
			});
			$(elm).on("swipedown", function(e){
				e.preventDefault();
				$(_this.element).animate({top: "0px"}, "fast", "linear");
				_this.shown = true;
			});
		}
		if((_this.position).toLowerCase() == "left") {
			$(elm).on("swipeleft", function(e){
				e.preventDefault();
				$(_this.element).animate({left: _this.height}, "fast", "linear");
				_this.shown = false;
			});
			$(elm).on("swiperight", function(e){
				e.preventDefault();
				$(_this.element).animate({left: "0px"}, "fast", "linear");
				_this.shown = true;
			});
		}
		if((_this.position).toLowerCase() == "right") {
			$(elm).on("swiperight", function(e){
				e.preventDefault();
				$(_this.element).animate({right: _this.height}, "fast", "linear");
				_this.shown = false;
			});
			$(elm).on("swipeleft", function(e){
				e.preventDefault();
				$(_this.element).animate({right: "0px"}, "fast", "linear");
				_this.shown = true;
			});
		}
	},

	/**
	 *	This method adds click events to the element. Using this function, user can toggle between opening and closing of drawer menu. This method in turn calls two different function for opening and closing action.
	 *	This accepts no argument.
	 *	@method clickToToggle
	 *	@example
	 *		$(newElement).click(function() {
	 *			drawer.clickToToggle();
	 *		});
	*/ 
	clickToToggle: function() {
		var _this = this;
		
		if(!_this.shown) {
			_this.clickToShow();
		} else {
			_this.clickToHide();
		}
	},

	/**
	 *	This method adds click event to the element which works for opening the drawer.
	 *	This accepts no argument.
	 *	@method clickToShow
	 *	@example
	 *		$(newElement).click(function() {
	 *			drawer.clickToShow();
	 *		});
	*/ 
	clickToShow: function() {
		var _this = this;
		if((_this.position).toLowerCase() == "bottom") {
			$(_this.element).animate({bottom:"0px"}, "fast", "linear");
			_this.shown = true;
		}
		if((_this.position).toLowerCase() == "top") {
			$(_this.element).animate({top:"0px"}, "fast", "linear");
			_this.shown = true;
		}
		if((_this.position).toLowerCase() == "left") {
			$(_this.element).animate({left:"0px"}, "fast", "linear");
			_this.shown = true;
		}
		if((_this.position).toLowerCase() == "right") {
			$(_this.element).animate({right:"0px"}, "fast", "linear");
			_this.shown = true;
		}
	},

	/**
	 *	This method adds click event to the element which works for closing the drawer. 
	 *	This accepts no argument.
	 *	@method clickToHide
	 *	@example
	 *		$(newElement).click(function() {
	 *			drawer.clickToHide();
	 *		});
	*/ 
	clickToHide: function() {
		var _this = this;
		if((_this.position).toLowerCase() == "bottom") {
			$(_this.element).animate({bottom:_this.height}, "fast", "linear");
			_this.shown = false;
		}
		if((_this.position).toLowerCase() == "top") {
			$(_this.element).animate({top:_this.height}, "fast", "linear");
			_this.shown = false;
		}
		if((_this.position).toLowerCase() == "left") {
			$(_this.element).animate({left:_this.height}, "fast", "linear");
			_this.shown = false;
		}
		if((_this.position).toLowerCase() == "right") {
			$(_this.element).animate({right:_this.height}, "fast", "linear");
			_this.shown = false;
		}
	}
};