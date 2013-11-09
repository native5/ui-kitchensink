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
 *	This widget creates Drop-Down menu implementation using jQuery. User can click the menu button to display/hide the drop-down menu. Each item can have it's own individual action.
 *	@class ListMenu
 *	@constructor
 *	@param element {Object} It's the `HTML DOM element` on which the Drop-Down menu will be applied.
 *	@param [options] {Object}
 *	@param [options.menuClass=null] {String} Class to be applied to the container for menu items, i.e. &lt;ul&gt; item.
 *	@example
 *		var abc = new native5.ui.ListMenu(element, {menuClass: "myClass"});
*/

var native5 = {ui: {}};
native5.ui.ListMenu = function(element, options) { 
	if (!element) return null;
	var self = this;
	this.element = element;
	this.options = options || {};
	this.menuClass = this.options.menuClass || null;
	
	$(element).click(function() {
		$(this).children().toggle("fast");
	});
}

native5.ui.ListMenu.prototype = {
	
	/**
	 *	This method allows users to add menu items to the Drop-down menu. All parameters are optional but if none is provided, empty `<li>` tag will be created.
	 *	@method addItem
	 *  @param [opts] {Object}
	 *  @param [opts.itemText] {String} Text for the menu item. User can provide either `String` or `html` with `<li>` tag with it.
	 *  @param [opts.itemClass] {String} `Class` property of the `<li>` element that defines the menu item. If `html` with `<li>` is provided as text, this feature will be neglected.
	 *  @param [opts.itemId] {String} `Id` property of the `<li>` element that defines the menu item. If `html` with `<li>` is provided as text, this feature will be neglected.
	 *  @param [opts.itemStyle] {String} `Style` property of the `<li>` element that defines the menu item. If `html` with `<li>` is provided as text, this feature will be neglected.
	 *  @param [opts.itemClick] {String} `Onclick` property of the `<li>` element that defines the menu item. If `html` with `<li>` is provided as text, this feature will be neglected. Note: function is accepted in a `String` format and applied to onlcik of the list.
	 *	@example
	 *		menu.addItem({itemText: "Hi", itemClass: "abc", itemStyle: "margin-left: 10px;", itemId: "list", itemClick: "alert('Hi')" });
	*/
	addItem: function(opts) {
		if(!opts) return null;
		
		var itemText = opts.itemText || "";
		var itemClass = opts.itemClass || null;
		var itemId = opts.itemId || null;
		var itemStyle = opts.itemStyle || null;
		var itemClick = opts.itemClick || null;
		var self = this;
		var ulItem = $(self.element).children('ul')[0];
		var content = "";
		
		if(itemText.indexOf("<li") !== 0) {
			content = "<li";
			if(itemClass) {
				content+= " class = '" + itemClass + "'";
			}
			if(itemStyle) {
				content+= " style = '" + itemStyle + "'";
			}
			if(itemId) {
				content+= " id = '" + itemId + "'";
			}
			if(itemClick) {
				content+= " onclick = " + itemClick;
			}
			content += ">" + itemText + "</li>";
		}
		else {
			content = itemText;
			if(itemClick) {
				$(content).attr("onclick", itemClick);
			}
		}
		
		if(ulItem !== undefined) {
			$(ulItem).append(content);
		}
		else {
			$(self.element).append("<ul>"+content+"</ul>");
		}
		
		if(self.menuClass) {
			$(ulItem).addClass(self.menuClass);
		}
		$(ulItem).css({"list-style": "none", "padding": 0, "margin": 0, "display": "none"});
	},
	
	/**
	 *	This method allows users to remove menu items from the drop-down menu. Either item index or id is necessary for this funtion to operate.
	 *	@method removeItem
	 *  @param [opts] {Object}
	 *  @param [opts.index] {Number} Index (0 based) of `<li>` element to be deleted.
	 *  @param [opts.itemId] {String} `Id` of `<li>` element to be deleted.
	 *	@example
	 *		menu.removeItem({index: 5});
	*/
	removeItem: function(opts) {
		if(!opts) return null;
		
		var self = this;
		var index = opts.index || -1;
		var itemId = opts.itemId || null;
		
		if(index === -1 && itemId === null) return null;
		var ulItem = $(self.element).children('ul')[0];
		if(ulItem === undefined) return null;
		
		if(index !== -1) {
			var removeEl = $(ulItem).children()[index];
			$(removeEl).remove();
		}
		else {
			$("#"+itemId).remove();
		}
	}
}