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
 *	This widget creates Tag Cloud in 3D spherical display. User can swipe to rotate the cloud and alternatively select (click) the tag to perform action associated with it.
 *	@class TagCloud
 *	@constructor
 *	@param [options] {Object} Options which can be used to modify the TagCloud as per the need.
 *	@param [options.divId='tagDiv'] {String} `id` of the `<div>` which will contain the tag cloud. If this option is not set by user, a new `<div>` is created with default `id`.
 *	@param [options.zoom=90] {Number} Zoom state of tag cloud formed.
 *	@param [options.max_zoom=120] {Number} Maximum zoom possible.
 *	@param [options.min_zoom=25] {Number} Minimum zoom possible.
 *	@param [options.zoom_factor=5] {Number} Amount of zoom added/subtracted when zoomed in or out.
 *	@param [options.rotate_factor=2] {Number} Amount of rotation/movement done per swipe.
 *	@param [options.fps=20] {Number} Frames per second movement for tag cloud. More fps means faster movement.
 *	@param [options.centrex=125] {Number} Determines the center of x-axis.
 *	@param [options.centrey=125] {Number} Determines the center of y-axis.
 *	@param [options.min_font_size=12] {Number} Minimum font size for any tag.
 *	@param [options.max_font_size=32] {Number} Maximum font size for any tag.
 *	@param [options.font_units='px'] {String} unit of font. Can be `px`, `em`, or `%`.
 *	@param [options.initial_rotation_x=0] {Number} Determines the initial motion around x-axis when tag cloud is created.
 *	@param [options.initial_rotation_y=0] {Number} Determines the initial motion around y-axis when tag cloud is created.
 *	@param [options.decay=0.90] {Number} It's the factor by which the rotation of tag cloud decays till it stops completely. Maximum accepted value is `1.0` where there will be no auto stopping of tag cloud.
 *	@param [options.bgcolor=''] {String} Determines the background color of tag cloud. It can be of form `String (e.g. red)`, `hash`, `rgb`, or `rgba`.
 *	@param [options.width='250px'] {String} Determines width of tag cloud. User can use `px` or `em` values.
 *	@param [options.height='250px'] {String} Determines height of tag cloud. User can use `px` or `em` values.
 *	@example
 *		var tCloud = = new native5.ui.tagcloud({divId: "tgd", fps: 50, width: "300px", height: "300px", rotate_factor: 5, zoom: 100});
*/

var native5 = {ui: {}};
native5.ui.TagCloud = function(options) {
	var self = this;
	this.options = options || {};
	this.zoom = this.options.zoom || 90;
	this.max_zoom = this.options.max_zoom || 120;
	this.min_zoom = this.options.min_zoom || 25;
	this.zoom_factor = this.options.zoom_factor || 5;
	this.rotate_factor = this.options.rotate_factor || 2;
	this.fps = this.options.fps || 20;
	this.centrex = this.options.centrex || 125;
	this.centrey = this.options.centrey || 125;
	this.min_font_size = this.options.min_font_size || 12;
	this.max_font_size = this.options.max_font_size || 32;
	this.font_units = this.options.font_units || 'px';
	this.initial_rotation_x = this.options.initial_rotation_x || 0;
	this.initial_rotation_y = this.options.initial_rotation_y || 0;
	this.decay = this.options.decay || 0.90;
	this.bgcolor = this.options.bgcolor || '';
	this.width = this.options.width || '250px';
	this.height = this.options.height || '250px';
	this.divName = this.options.divId || 'tagDiv';
	
	if(this.decay > 1.0)
		this.decay = 1.0;
	
	this.jsonObj = {"tags": [], "colors": []};
}

native5.ui.TagCloud.prototype = {
	
	/**
	 *	This method modfies the values of tag cloud object once it's created. It's useful if the tag cloud is altered and requires `UI` adjustment. If this function is called without any argument, the it simply returns the values given during the object formation, but won't fail because of that.
	 *	@method modify
	 *	@param [options] {Object} Options to modify values of tagcloud object.
	 *	@param [options.zoom=90] {Number} Zoom state of tag cloud formed.
	 *	@param [options.max_zoom=120] {Number} Maximum zoom possible.
	 *	@param [options.min_zoom=25] {Number} Minimum zoom possible.
	 *	@param [options.zoom_factor=5] {Number} Amount of zoom added/subtracted when zoomed in or out.
	 *	@param [options.rotate_factor=2] {Number} Amount of rotation/movement done per swipe.
	 *	@param [options.fps=20] {Number} Frames per second movement for tag cloud. More fps means faster movement.
	 *	@param [options.centrex=125] {Number} Determines the center of x-axis.
	 *	@param [options.centrey=125] {Number} Determines the center of y-axis.
	 *	@param [options.min_font_size=12] {Number} Minimum font size for any tag.
	 *	@param [options.max_font_size=32] {Number} Maximum font size for any tag.
	 *	@param [options.font_units='px'] {String} unit of font. Can be `px`, `em`, or `%`.
	 *	@param [options.initial_rotation_x=0] {Number} Determines the initial motion around x-axis when tag cloud is created.
	 *	@param [options.initial_rotation_y=0] {Number} Determines the initial motion around y-axis when tag cloud is created.
	 *	@param [options.decay=0.90] {Number} It's the factor by which the rotation of tag cloud decays till it stops completely. Maximum accepted value is `1.0` where there will be no auto stopping of tag cloud.
	 *	@param [options.bgcolor=''] {String} Determines the background color of tag cloud. It can be of form `String (e.g. red)`, `hash`, `rgb`, or `rgba`.
	 *	@param [options.width='250px'] {String} Determines width of tag cloud. User can use `px` or `em` values.
	 *	@param [options.height='250px'] {String} Determines height of tag cloud. User can use `px` or `em` values.
	 *	@return options {Object}
	 *	@example
	 *		tCloud.modify({centrex: 120, centrey: 120});
	*/
	modify: function(options) {
			var self = this;
			self.options = options || self.options;
			self.zoom = options.zoom || self.zoom;
			self.max_zoom = options.max_zoom || self.max_zoom;
			self.min_zoom = options.min_zoom || self.min_zoom;
			self.zoom_factor = options.zoom_factor || self.zoom_factor;
			self.rotate_factor = options.rotate_factor || self.rotate_factor;
			self.fps = options.fps || self.fps;
			self.centrex = options.centrex || self.centrex;
			self.centrey = options.centrey || self.centrey;
			self.min_font_size = options.min_font_size || self.min_font_size;
			self.max_font_size = options.max_font_size || self.max_font_size;
			self.font_units = options.font_units || self.font_units;
			self.initial_rotation_x = options.initial_rotation_x || self.initial_rotation_x;
			self.initial_rotation_y = options.initial_rotation_y || self.initial_rotation_y;
			self.decay = options.decay || self.decay;
			self.bgcolor = options.bgcolor || self.bgcolor;
			self.width = options.width || self.width;
			self.height = options.height || self.height;
			self.divName = options.divId || self.divName;
			
			if(this.decay > 1.0)
				this.decay = 1.0;
	},
	
	/**
	 *	This method initializes the data used for creating the tag cloud. The data can be provided through url to jSon file or jSon object. This method removes the existing data and replace with the new data provided. <br />Please note: This only creates the data but not append to the DOM yet.
	 *	@method init
	 *	@param [options] {Object} Options for data.
	 *	@param [options.url=null] {String} URL containing the jSon data.
	 *	@param [options.jsonData=null] {Object|Array} inline jSon data.
	 *	@example
	 *		tCloud.init({url: 'path to json data'});
	*/
	init: function(options) {
		var self = this;
		var opts = options || {};
		if(!opts) return null;
		var url = opts.url || null;
		var jsonData = opts.data || null;
		
		self.jsonObj = {"tags": [], "colors": []};
		
		if(url != null) {
			$.ajax({
				url: url,
				async: false,
				dataType: 'json',
				success: function(data) {
					if(data.colors != undefined) {
						$.merge(self.jsonObj.colors, data.colors);
					}
					
					$.merge(self.jsonObj.tags, data.tags);
				}
			});
		}
		
		if(jsonData != null) {
			var data = null;
			
			if(jsonData instanceof Object) {
				data = jsonData;
			}
			else {
				data = jQuery.parseJSON(jsonData);
			}

			if(data.colors != undefined) {
				$.merge(self.jsonObj.colors, data.colors);
			}
			
			$.merge(self.jsonObj.tags, data.tags);
		}
	},
	
	/**
	 *	This method appends the tag data to existing data for tag clod creation. The data can be provided through url to jSon file or jSon object. It differs from `init()` method as it preserves the existing data as well. <br />Please note: This only creates the data but not append to the DOM yet.
	 *	@method append
	 *	@param [options] {Object} Options for data.
	 *	@param [options.url=null] {String} URL containing the jSon data.
	 *	@param [options.jsonData=null] {Object|Array} inline jSon data.
	 *	@example
	 *		tCloud.append({data: jsonData});
	*/
	append: function(options) {
		var self = this;
		var opts = options || {};
		if(!opts) return null;
		var url = opts.url || null;
		var jsonData = opts.data || null;
		
		if(url) {
			$.ajax({
				url: url,
				async: false,
				dataType: 'json',
				success: function(data) {
					if(data.colors != undefined) {
						$.merge(self.jsonObj.colors, data.colors);
					}
					
					$.merge(self.jsonObj.tags, data.tags);
				}
			});
		} else if(jsonData) {
			var data = null;
			
			if(jsonData instanceof Object) {
				data = jsonData;
			}
			else {
				data = jQuery.parseJSON(jsonData);
			}

			if(data.colors != undefined) {
				$.merge(self.jsonObj.colors, data.colors);
			}
			
			$.merge(self.jsonObj.tags, data.tags);
		}	
	},
	
	/**
	 *	This method adds the data to the DOM structure for the tag cloud creation. Property of DOM elements created is determined through given data (size, color, importance, etc.). Thois method accepts no arguments.
	 *	@method refresh
	 *	@example
	 *		tCloud.refresh();
	*/
	refresh: function() {
		var self = this;
		var items = [];
		var tagCol = ['#fff', '#eee', '#ddd', '#ccc', '#bbb', '#aaa', '#999', '#888', '#777', '#666'];
		
		if(self.jsonObj.colors != undefined) {
			$.each(self.jsonObj.colors, function(key, val) {
				tagCol[key] = val.color;
			});
		}
		
		if($('.exist').length == 0) {
			items.push("<ul class='ui-listview'>");
			$.each(self.jsonObj.tags, function(key, val) {
				var fontSize = 16 + parseInt(val.imp)*3 + parseInt(val.weight) - Math.round((parseInt(val.age) - 1)/2);
				fontSize += "px";
				items.push("<li style='font-size:"+ fontSize +"; color:"+ tagCol[parseInt(val.weight)] +"'>" + val.name + '</li>');
			});
			items.push("</ul>");
			
			$('<div/>', {
				'id': self.divName,
				class: 'exist',
				'style': 'background-color: '+ self.bgcolor +'; width: '+ self.width +'; height: '+ self.height +';',
				html: items.join('')
				}).appendTo('#divcontent').each(function() {
					self.render();
			});
		}
		else {
			$.each(self.jsonObj.tags, function(key, val) {
				var fontSize = 16 + parseInt(val.imp)*3 + parseInt(val.weight) - Math.round((parseInt(val.age) - 1)/2);
				fontSize += "px";
				items.push("<li style='font-size:"+ fontSize +"; color:"+ tagCol[parseInt(val.weight)] +"'>" + val.name + '</li>');
			});
			$('.exist').html(items.join(''));
		}
		
		
		self.render();
	},
	
	/**
	 *	This method renders the DOM structure provided by the user (obtained through `divId` and it's children) or through `refresh()` method into a tag cloud. Without this method, the tags will appear as a list. This method accepts no arguments.
	 *	<br /> note: `refresh()` method calls the `render()` method internally, so it's not required by the user to call this function if he's not applying tag cloud on existing DM structure.
	 *	@method render
	 *	@example
	 *		tCloud.render();
	*/
	render: function() {
		var self = this;
		var element = $("#"+self.divName);
		$(element).css('position', 'relative');
		$(element).css('background-color', self.bgcolor);
		
		var eyez = -500;

		// set rotation (in this case, 5degrees)
		var rad = Math.PI/180;
		var global_cos = Math.cos(0);

		// per-instance values
		var dirty = true;
		var container = $(element);
		var id_stub = 'tc_' + $(element).attr('id') + "_";
		var zoom = this.zoom;
		var depth;
		var points_meta = [];
		var points_data = [];

		var vectorx = this.initial_rotation_x;
		var vectory = this.initial_rotation_y;
		var motionx = new this.mqueue(50, true);
		var motiony = new this.mqueue(50, false);
		var dragging = false;
		var clicked = false;
		var mousex = 0;
		var mousey = 0;

		var drawing_interval =  1/(self.fps/1000);
		var cmx = self.centrex; 
		var cmy = self.centrey;
		var bg_colour;
		if (self.bgcolor){
			bg_colour = parsecolour(self.bgcolor);
		}else{
			bg_colour = parsecolour($(element).css('background-color'));
		}
		
		function parsecolour(colour){
			function parse_rgb_colour(colour){
				rgb = colour.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				if(!rgb) return {"r":255, "g":255, "b":255};

				if(rgb.length > 3){
					return {"r" : parseInt(rgb[1]), "g": parseInt(rgb[2]), "b" : parseInt(rgb[3])};                 
				}else{  
					return {"r":0, "g":0, "b":0};
				}
			}
			function parse_hex_colour(colour){
				var r = 0, g = 0, b = 0;
				if(colour.length > 4)
				{
					r = parseInt(colour.substr(1,2), 16);
					g = parseInt(colour.substr(3,2), 16);
					b = parseInt(colour.substr(5,2), 16);
				}
				else
				{
					r = parseInt(colour.substr(1,1)+colour.substr(1,1), 16);
					g = parseInt(colour.substr(2,1)+colour.substr(2,1), 16);
					b = parseInt(colour.substr(3,1)+colour.substr(3,1), 16);
				}
				return {"r" : r, "g" : g, "b" : b};
			}

			if(colour) {
				if(colour.substr(0, 1) === '#')
				{
					return parse_hex_colour(colour);
				}
				else if (colour.substr(0,3) === 'rgb')
				{
					return parse_rgb_colour(colour);
				}
				else{
					//somehow we've got a plain old string as a colour
					if(window.console != undefined)
					console.log("unable to parse:'" + colour + "' please ensure background and foreground colors for the container are set as hex values");
					return null;
				}
			}
		}

		function getcolour(num, fg_colour){
			if(num>256){num=256;}
			if(num<0){num=0;}

			var r = 255, g = 255, b = 255;
			
			if(bg_colour && fg_colour) {
				r = getshade(bg_colour.r, fg_colour.r, num);
				g = getshade(bg_colour.g, fg_colour.g, num);
				b = getshade(bg_colour.b, fg_colour.b, num);
			}

			var ret  = "rgb(" + r + ", "+ g + ", " + b + ")"; 
			return ret;
		}

		function getshade(lbound, ubound, dist){
			var scope = ubound - lbound;
			var dist_percent = scope / 100;
			var shade = Math.round(lbound + (dist * dist_percent));
			return shade;
		}

		function zoomed(by){
			zoom += by * opts.zoom_factor;

			if (zoom > opts.max_zoom) {
				zoom = opts.max_zoom;
			}
			if (zoom < opts.min_zoom) {
				zoom = opts.min_zoom;
			}

			depth = -(zoom * (eyez - opts.max_zoom) / 100) + eyez;
			dirty = true;
		}
		
		function decay_me(vector){ 
			if(Math.abs(vector) < 0.5){
				vector = 0;
			}
			else{
				if(vector > 0){
					vector *= self.decay;
				}
				if (vector < 0){
					vector *= self.decay;
				}
			}
			return vector;
		}

		function move(){
			if(vectorx != 0 || vectory != 0){
				var factor = self.rotate_factor;
				var tx = -(vectorx * rad * factor);
				var ty = vectory * rad * factor;

				for(var p in points_data)
				{                 
					var sin_x = Math.sin(tx);
					var cos_x = Math.cos(tx);
					var sin_y = Math.sin(ty);
					var cos_y = Math.cos(ty);

					var x = points_data[p].x;
					var z = points_data[p].z;
					points_data[p].x = x * cos_x + z * sin_x;
					points_data[p].z = z * cos_x - x * sin_x;

					var y = points_data[p].y;
					var z = points_data[p].z;
					points_data[p].y = y * cos_y - z * sin_y;
					points_data[p].z = y * sin_y + z * cos_y;
				}                
				dirty = true;
			}
		}

		function decay_all(){
			vectorx = decay_me(vectorx);
			vectory = decay_me(vectory);
			if(!dragging){
				motionx.add(0);
				motiony.add(0);
			}
		}

		function draw(){
			// calculate 2D coordinates
			if(dirty){
				var smallz = 10000; 
				var bigz = -10000;

				for(var r_p in points_data){
					if(points_data[r_p].z < smallz){smallz = points_data[r_p].z;}
					if(points_data[r_p].z > bigz){bigz = points_data[r_p].z;}
				}
				var minz = Math.min(smallz, bigz);
				var maxz = Math.max(smallz, bigz);
				var diffz = maxz - minz;

				for(var s_p in points_data){ 
					//normalise depth
					var u = (depth - eyez)/(points_data[s_p].z - eyez);

					// calculate normalised grey value
					var dist = Math.round(((maxz - points_data[s_p].z)/diffz) * 100);
					var dist_colour = getcolour(dist, points_data[s_p].colour);
					//set new 2d positions for the data
					points_data[s_p].element.css('color',dist_colour);
					var dist = Math.round(((maxz - points_data[s_p].z)/diffz) * 100);
					points_data[s_p].element.css('z-index', dist);
					points_data[s_p].element.css('left', u * points_data[s_p].x + cmx - points_data[s_p].cwidth);
					points_data[s_p].element.css('top', u * points_data[s_p].y + cmy); 
				}			
				dirty = false;
			}
			move(vectorx, vectory);
			decay_all();
		}
		
		points_meta.count = $('li', container).length;
		points_meta.largest = 1;
		points_meta.smallest = 0;

		$('li', container).each(function(idx, val){
			var sz = parseInt($(this).css("font-size"));
			if(sz == 0) 
			sz = 1;
			var point_id = id_stub + idx;
			points_data[idx] = {
				size:sz
			};

			var h = -1 + 2*(idx)/(points_meta.count-1);
			points_data[idx].theta = Math.acos(h);
			if(idx == 0 || idx == points_meta.count-1){
				points_data[idx].phi = 0;
			}
			else{
				points_data[idx].phi = (points_data[idx-1].phi + 3.6/Math.sqrt(points_meta.count*(1-Math.pow(h,2)))) % (2 * Math.PI);
			}

			points_data[idx].x = Math.cos(points_data[idx].phi) * Math.sin(points_data[idx].theta) * (cmx/2);
			points_data[idx].y = Math.sin(points_data[idx].phi) * Math.sin(points_data[idx].theta) * (cmy/2);
			points_data[idx].z = Math.cos(points_data[idx].theta) * (cmx/2);
			points_data[idx].colour = parsecolour($(this).css('color'));

			if(sz > points_meta.largest) points_meta.largest = sz;
			if(sz < points_meta.smallest) points_meta.smallest = sz;

			$(this).css('position','absolute');
			$(this).addClass('point');
			$(this).attr('id', point_id);
			
			points_data[idx].element = $('#'+point_id);

		});

		//tag size and font size ranges 
		var sz_range = points_meta.largest - points_meta.smallest + 1; 
		var sz_n_range = self.max_font_size - self.min_font_size + 1;

		//set font size to normalised tag size
		for(var p in points_data){
			var sz = points_data[p].size;
			var sz_n = parseInt((sz / sz_range) * sz_n_range) + parseInt(self.min_font_size);
			if(!points_data[p].element.hasClass('background')){
				points_data[p].element.css('font-size', sz_n); 
			}
			//store element width / 2 so we can centre the text around the point later.
			points_data[p].cwidth = points_data[p].element.width()/2;
		}
		// bin original html
		//$('ul', container).remove();

		//set up initial view
		depth = -(zoom * (eyez - self.max_zoom) / 100) + eyez;
		draw();


		//call draw every so often
		drawing_interval = setInterval(draw, drawing_interval);
		
		var divId = container.attr('id');
		if(divId) {
			var divElement = document.getElementById(divId);
			divElement.addEventListener("touchstart", touchHandler, false);
			divElement.addEventListener("touchmove", touchHandler, false);
			divElement.addEventListener("touchend", touchHandler, false);
		}
		
		function touchHandler(e) {
			if (e.type == "touchstart") {
				clicked = true;
				motionx.reset();
				motiony.reset();
				vectorx = 0; 
				vectory = 0;
			}
			else if (e.type == "touchmove") {
				if (clicked) dragging = true;

				if(dragging){
					motionx.add(e.touches[0].pageX);
					motiony.add(e.touches[0].pageY);
					vectorx = motionx.avg();
					vectory = motiony.avg();                                
				}

				e.preventDefault();
			}
			else if (e.type == "touchend" || e.type == "touchcancel") {
				clicked = false;
				dragging = false;
				motionx.reset();
				motiony.reset();
			}
		}

		container.mousedown(function(evt){
			if(evt.which == 1){
				clicked = true;
				motionx.reset();
				motiony.reset();
				vectorx = 0; 
				vectory = 0;
			}
			evt.preventDefault();
			return false;
		});

		container.mousemove(function(evt){   
			if(clicked) dragging = true;

			if (dragging){
				motionx.add(evt.pageX);
				motiony.add(evt.pageY);
				vectorx = motionx.avg();
				vectory = motiony.avg();
			}
			evt.preventDefault();
		});

		container.mouseup(function(evt){
			if(evt.which == 1){
				clicked = false;
				dragging = false;
				motionx.reset();
				motiony.reset();                            
			}
		});
		
		
	},
	mqueue: function(size){
		this.items = new Array();
		this.size = size;
		this.last = 0;

		this.reset = function(){
			this.items = new Array();  
		};

		this.add = function(abs_val){
			var val = 0;

			//if we have no last value, store the current value as the last
			//that way movement starts out at 0 rather than jumping about
			if (this.last == 0) this.last = abs_val;

			// calculate val as movement rather than absolute coordinates
			val = abs_val - this.last;

			this.last = abs_val;
			// add item to list and remove last item if list is too large
			this.items.push(val);

			if(this.items.length > this.size){
				this.items.shift();
			}
		};

		this.avg = function(){
			var total = 0;
			var rv = 0;

			if (this.items.length > 1){
				for(i in this.items){
					total += this.items[i];
				}
				rv = (total / size);
			}

			return rv;
		};
	}
}
