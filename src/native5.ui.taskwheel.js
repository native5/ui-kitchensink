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
 * This widget will create roulette style rotating task wheel. User can rotate the wheel to go to he particular menu and the nexecute the function associated with it. This widget works on existing canvas element, so the developers needs to make sure that the canvas element is present in the DOM and is unused (canvas is cleared when creating the Task Wheel).
 * @class TaskWheel
 * @constructor
 * @param element {object} The canvas element that needs to b converted into a Task Wheel.
 * @param options {Object}
 * @param data {object} jSon object containing function and color of the wheel. Optionally, center wheel (radius and color) can also be provided.Without this parameter, Task Whell will not be created.
 * @example
 * 		var tw = new native5.ui.TaskWheel(document.getElementById("canvas"), {data: jsonData});
*/

var native5 = {ui: {}};
var circle = new Array();
var arcs = new Array();
var rotateAngle = 0;
var deg = 0;
var length = 0;
var functions = new Array();
var centRad = 0;
var centCol = "";

native5.ui.TaskWheel = function(element, options) {
	if (!element) return null;
	this.element = element;
	
	this.options = options || {};
	this.data = this.options.data || null;
	if(this.data.length === 0) return null;
	
	var colors = new Array();
	var data = null;
	
	this.startPos = new Array();
	this.coord = new Array();
	
	if(this.data instanceof Object) {
		data = this.data;
	}
	else {
		data = jQuery.parseJSON(this.data);
	}
	
	$.each(data.arcs, function(key, value) {
		functions[key] = value.function;
		colors[key] = value.color;
	});
	
	if(data.center !== undefined) {
		$.each(data.center, function(i, val) {
			centRad = parseInt(val.radius);
			centCol = val.color;
		});
	}
	
	this.colors = colors;
	
	length = functions.length;
	
	this.plotData();
}

native5.ui.TaskWheel.prototype = {
	
	/**
	 * This is an internal method used to plot the Task Wheel on the canvas. User defined clicks (on click on each piece of wheel) and touch events is applied here. It's called by the constructor itself and doesn't require separate callback.
	 * @method plotData
	*/

	plotData: function() {
		var canvas;
		var ctx;
		var lastend = 0;
		var myTotal = length;
		var self = this;

		canvas = self.element;
		var ctxWidth = ($(canvas).width())/2;
		var ctxHeight = ($(canvas).height())/2;
		ctx = $(canvas)[0].getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		circle.push(ctxWidth);
		circle.push(0);
		circle.push(ctxHeight);

		for (var i = 0; i < length; i++) {
			ctx.fillStyle = self.colors[i];
			ctx.beginPath();
			ctx.moveTo(ctxWidth, ctxHeight);
			arcs.push([lastend, lastend + (Math.PI * 2  / myTotal)]);
			ctx.arc(ctxWidth, ctxHeight, ctxHeight, lastend, lastend + (Math.PI * 2  / myTotal), false);
			ctx.lineTo(ctxWidth, ctxHeight);
			ctx.fill();
			lastend += Math.PI * 2  / myTotal;
		}

		if(centRad > 0) {
			ctx.fillStyle = centCol;
			ctx.beginPath();
			ctx.arc(ctxWidth, ctxHeight, centRad, 0, Math.PI * 2, false);
			ctx.fill();
		}

		deg = self.calcDig(length);
		var css = '-webkit-transform: rotate(' + deg + 'deg);';
		canvas.setAttribute('style', css);
		canvas.onclick = this.selectiveClick;

		canvas.addEventListener('touchstart', self.onTouchStart, false);
		canvas.addEventListener('touchmove', self.onTouchMove, false);
		canvas.addEventListener('touchend', self.onTouchEnd, false);
	},
	
	/**
	 * This method assigns the onclick events to each of the task wheel sections. Like, plotData, it's an internal function and doesn't require user intervention.
	 * @method selectiveClick
	*/
	
	selectiveClick: function(e) {
		var self = this;
		
		var x = circle[0];
		var y = circle[1];
		var radius = circle[2];
		var point = [e.clientX, e.clientY];

		var pointAngle = Math.atan2(point[1] - y, point[0] - x);
		// if(pointAngle > 0 && pointAngle < deg) {
			// pointAngle = 2 * Math.PI;
		// }
		// if(pointAngle < 0) {
			// pointAngle += 2 * Math.PI;
		// }

		for(var i = 0; i < length; i++) {
			var startAngle = (arcs[i][0] + deg) *  0.0174532925;
			var endAngle = (arcs[i][1] + deg) *  0.0174532925;

			if((point[0]-x)*(point[0]-x) + (point[1]-y)*(point[1]-y) <= radius*radius) {
				if(pointAngle >= startAngle && pointAngle <= endAngle) {
					if(!((point[0]-x)*(point[0]-x) + (point[1]-y)*(point[1]-y) <= radius/3*radius/3)) {
						eval(functions[i]);
						break;
					}
				}
			}
		}
	},
	onTouchStart: function(e) {
		this.startPos = [e.touches[0].clientX, e.touches[0].clientY];
	},
	onTouchMove: function(e) {
		var self = this;
		e.preventDefault();
		self.coord = [e.touches[0].clientX, e.touches[0].clientY];
		var ctxWidth = (self.width)/2;
		var ctxHeight = (self.height)/2;
		
		theta = Math.round((Math.atan2(self.coord[0], self.coord[1]) - Math.atan2(self.startPos[0], self.startPos[1]))*180/Math.PI);
		var finalDeg = rotateAngle - theta;
		rotateAngle = finalDeg;
		var css = '-webkit-transform: rotate(' + finalDeg + 'deg);';
		self.setAttribute('style', css);
	},
	onTouchEnd: function(e) {
		var self = this;
		self.ontouchmove = null;
	},
	calcDig: function(i) {
		var baseVal = 55;
		var minVal = 5;
		if(i <= 2) {
			return 0;
		}
		else if(i == 3) {
			return 30;
		}
		else if(i == 4) {
			return 45;
		}
		else if(i >= 5 && i <= 8) {
			val = baseVal + (i - minVal) * 5;
			return val;
		}
		else if(i >= 9) {
			return 75;
		}
		return null;
	}
}