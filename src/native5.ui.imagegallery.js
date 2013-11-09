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
 *	This widget arranges images, present inside given element, in differnet views. There is currently three views possible through this widget -<br />
 *	<ol>
 *	<li> <b>none</b> - Images are displayed as is without any changes. This view is good if someone wants to use available functions of the widget without making any changes in image display.</li>
 *	<li> <b>grid</b> - Images are aranged in the grid of user given rows and columns.</li>
 *	<li> <b>slide</b> - Images are arranged in carousel and can be swiped with the touch.</li>
 *	</ol>
 *	*For <b>slide</b> view, <b>ImageGallery</b> currently uses external library, <a href='http://swipejs.com/'>swipe.js</a>.
 *	@class ImageGallery
 *	@constructor
 *	@uses swipe
 *	@uses ImageGrid
 *	@param element {Object} It's the `HTML DOM element` which contains the set of images.
 *	@param [options] {Object} Options which can be used to modify the ImageGallery as per the need.
 *	@param [options.view='none'] {String} Type of Image Gallery to display. It can be `none`, `grid`, or `swipe`.
 *	@param [options.column=3] {Number} Number of columns to display. Applicalbe only in Grid view.
 *	@param [options.startSlide=0] {Number} Default slide to display when ImageGallery is constructed. Applicalbe only in Slide view.
 *	@param [options.speed=300] {Number} Speed (in ms) at which images changes on swipe. Applicalbe only in Slide view.
 *	@param [options.callback] {Function} Function to be called once the change of slide occurs. Applicalbe only in Slide view.
 *	@param [options.auto=0] {Number} Duration after which the slide changes. If set to `0`, no auto slide will occur. Applicalbe only in Slide view.
 *	@example
 *		var grid = new native5.ui.ImageGallery(element, {view: 'grid', column: 4});
*/

var native5 = {ui: {}};
native5.ui.ImageGallery = function(element, options) {
	if (!element) return null;
	var self = this;
	
	this.options = options || {};
	this.view = this.options.view || 'none';
	
	//Property for Image Grid.
	this.column = this.options.column || 3;
	
	//Property for Image Slideshow.
	this.index = this.options.startSlide || 0;
	this.speed = this.options.speed || 300;
	this.callback = this.options.callback || function() {};
	this.delay = this.options.auto || 0;
	
	this.container = element;
	this.element = this.container.children[0];
	this.lists = this.element.children;
	this.length = this.lists.length;
	
	if(this.view.toLowerCase() == 'slide'.toLowerCase()) {
		$('head').append('<script type="text/javascript" src="../src/swipe.min.js"></script>');
		var slider = new Swipe(element, {startSlide: this.index, speed: this.speed, auto:this.delay, callback: this.callback});
	}
	else if(this.view.toLowerCase() == 'grid'.toLowerCase()) {
		$('head').append('<script type="text/javascript" src="../src/native5.ui.grid.js"></script>');
		var grid = new native5.ui.ImageGrid(element, {column: this.column});
	}
	else {
		this.defaultDisplay();
	}
	
	// this.loadContent(this.imgCount, this.refreshDelay);
};

native5.ui.ImageGallery.prototype = {

	/**
	 *	This method allows the images in ImageGallery to delay load. User can define the time after which iamges to load and the number of images to load in each burst. It works on the principle that each `img` tag has src of image but stored in different attribute.
	 *	@method loadContent
	 *	@param [options] {Object} Set of parameters to modify the delay loading behaviour.
	 *	@param [options.count=1] {Number} Number of images to load in a single burst.
	 *	@param [options.delay=300] {Number} Time (in ms) after which next set of images are to be loaded.
	 *	@param [options.fromAttr="data-src"] {String} Name of attribute which stores the url of image.
	 *	@param [options.toAttr="src"] {String} Name in which the fromAttr to be changed to. Its useful if the user wants to use images in some other forms, like `bckground image`.
	 *	@example
	 *		grid.loadContent({count: 2, delay: 500});
	*/
	loadContent: function(val) {
		this.val = val || {};
		this.count = this.val.count || 1;
		this.timeout = this.val.delay || 300;
		this.fromAttr = this.val.fromAttr || "data-src";
		this.toAttr = this.val.toAttr || "src";
		var self = this;
		var counter = 0;
		var i = 0;
		this.imgLoad = setInterval(function() {
			for (i; i < (counter+self.count); i++) {
				if((counter+self.count) >= self.length)
					clearInterval(self.imgLoad);
					
				if (i < self.length) {
					var elm = self.lists[i].getElementsByTagName('img')[0];
					var attr = elm.getAttribute(self.fromAttr);
					elm.removeAttribute(self.fromAttr);
					
					if(attr != null)
						elm.setAttribute(self.toAttr, attr);
				}
			}
			counter += self.count;
		}, self.timeout);
	},

	/**
	 *	This method essentially used by ImageGallery internally when view is `none`, but can be used by the user as well.This method does not require any argument. This method simply removes all the padding and margin of the element and it's immediate children (structure which is used for ImageGallery widget) keeping all other feature intact. This way user can remove `grid` or `slide` view as per his need.
	 *	@method defaultDisplay
	 *	@example
	 *		grid.defaultDisplay();
	*/

	defaultDisplay: function() {
		this.container.style.margin = 0;
		this.container.style.padding = 0;
		this.element.style.margin = 0;
		this.element.style.padding = 0;
		for(i = 0; i < this.length; i++) {
			var el = this.lists[i];
			el.style.margin = 0;
			el.style.padding = 0;
		}
	}
};