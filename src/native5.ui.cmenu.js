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
 *	This widget creates Path like circular menu - that is, on click of button the menu opens up in a circular manner. Based on the requirements, it can be full circular, semi-circular or on any arc.
 *	@class CircleMenu
 *	@constructor
 *	@param element {Object} `HTML DOM element` which will be converted to circular menu.
 *	@param [options] {Object} Options which can be used to modify the ImageGallery as per the need.
 *	@param [options.depth=0] {Number} Starting z-index of the eleemnt.
 *	@param [options.item_diameter=30] {Number} Diameter of each item of circular menu. Helps setting width, height and border-radius property.
 *	@param [options.circle_radius=80] {Number} Radius of circle to be formed.
 *	@param [options.start_angle=0] {Number} Angle at which first element gets expanded when menu opens.
 *	@param [options.end_angle=90] {Number} Angle at which last element expands to when menu opens.
 *	@param [options.speed=500] {Number} Animation speed (in ms).
 *	@param [options.delay=1000] {Number} In case of hover (auto collapse), it's the time (in ms) after the wiget falls back to initial state.
 *	@param [options.step_out=20] {Number} Number of milliseconds when the next element gets out after circle menu is opened. Negative value indicates reverse direction.
 *	@param [options.step_in=-20] {Number} Number of milliseconds when the next element gets in after circle menu is closed. Negative value indicates reverse direction.
 *	@param [options.trigger='click'] {String} Determines which function to be assigned to open/close circular menu. Options can be `click` or `hover`.
 *	@param [options.transition_function='ease'] {String} Determines which transition function to use while opening/closing circular menu.
 *	@param [options.direction='bottom-right'] {String} Determines the direction in which the circular menu will open, assuming the close state is at (0,0). Options can be - `top`, `left`, `right`, `bottom`, `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-half`, `right-half`, `bottom-half`, `left-half`, full.
 *	@example
 *		var cmenu = new native5.ui.circlemenu(element,{direction:'bottom-right'});
*/

var native5 = {ui: {}};
native5.ui.CircleMenu = function(element, options) {
	if (!element) return null;
	
	this.pluginName = 'circlemenu';
	this.options = options || {};
	this.depth = this.options.depth || 0;
	this.item_diameter = this.options.item_diameter || 30;
	this.circle_radius = this.options.circle_radius || 80;
	this.start_angle = this.options.start_angle || 0;
	this.end_angle = this.options.end_angle || 90;
	this.speed = this.options.speed || 500;
	this.delay = this.options.delay || 1000;
	this.step_out = this.options.step_out || 20;
	this.step_in = this.options.step_in || -20;
	this.trigger = this.options.trigger || 'click';
	this.transition_function = this.options.transition_function || 'ease';
	this.direction = this.options.direction || 'bottom-right';
	
	this._timeouts = [];
	this.element = $(element);
	this.init();
	this.hook();
}

native5.ui.CircleMenu.prototype = {
	vendorPrefixes: function(items,prop,value){
        ['-webkit-','-moz-','-o-','-ms-',''].forEach(function(prefix){
            items.css(prefix+prop,value);
        });
    },
	init: function() {
		var self = this,
            directions = {
                'bottom-left':[180,90],
                'bottom':[135,45],
                'right':[-45,45],
                'left':[225,135],
                'top':[225,315],
                'bottom-half':[180,0],
                'right-half':[-90,90],
                'left-half':[270,90],
                'top-half':[180,360],
                'top-left':[270,180],
                'top-right':[270,360],
                'full':[-90,270-Math.floor(360/(self.element.children('li').length - 1))],
                'bottom-right':[0,90]
            },
            dir;
			
		self._state = 'closed';
        self.element.addClass(self.pluginName+'-closed');

        if(typeof self.direction === 'string'){
            dir = directions[self.direction.toLowerCase()];
            if(dir){
                self.start_angle = dir[0];
                self.end_angle = dir[1];
            }
        }

        self.menu_items = self.element.children('li:not(:first-child)');
        self.initCss();
        self.item_count = self.menu_items.length;
        self._step = (self.end_angle - self.start_angle) / (self.item_count-1);
        self.menu_items.each(function(index){
            var $item = $(this),
                angle = (self.start_angle + (self._step * index)) * (Math.PI/180),
                x = Math.round(self.circle_radius * Math.cos(angle)),
                y = Math.round(self.circle_radius * Math.sin(angle));

            $item.data('plugin_'+self.pluginName+'-pos-x', x);
            $item.data('plugin_'+self.pluginName+'-pos-y', y);
            $item.click(function(){
                self.select(index+2);
            });
        });

        // Initialize event hooks from options
        ['open','close','init','select'].forEach(function(evt){
            var fn;

            if(self.options[evt]){
                fn = self.options[evt];
                self.element.on(self.pluginName+'-'+evt, function(){
                    return fn.apply(self,arguments);
                });
                delete self.options[evt];
            }
        });

        // self.init();
	},
	trigger: function() {
		var _this = this;
		var args = [],
            i, len;

        for(i = 0, len = arguments.length; i < len; i++){
            args.push(arguments[i]);
        }
        _this.element.trigger(_this.pluginName+'-'+args.shift(), args);
	},
	hook: function() {
		var self = this;

        if(self.trigger === 'hover'){
            self.element.on('mouseenter',function(evt){
                self.open();
            }).on('mouseleave',function(evt){
                self.close();
            });
        }else if(self.trigger === 'click'){
            self.element.children('li:first-child').on('click',function(evt){
                evt.preventDefault();
                if(self._state === 'closed' || self._state === 'closing'){
                    self.open();
                }else{
                    self.close(true);
                }
                return false;
            });
        }else if(self.trigger === 'none'){
            // Do nothing
        }
	},
	

	/**
	 *	This method allows to open the circualr menu through the trigger method set while creating circle menu object. This method modifies `_state` variable which helps in determining the state of circle menu (open/closed).
	 *	This assumes no argument while invoking.
	 *	@method open
	 *	@return {Object} element
	 *	@example
	 *		cmenu.open();
	*/
	open: function() {
		var self = this,
            $self = this.element,
            start = 0,
            set;

        self.clearTimeouts();
        if(self._state === 'open') return self;
        $self.addClass(self.pluginName+'-open');
        $self.removeClass(self.pluginName+'-closed');
        if(self.step_out >= 0){
            set = self.menu_items;
        }else{
            set = $(self.menu_items.get().reverse());
        }
        set.each(function(index){
            var $item = $(this);

            self._timeouts.push(setTimeout(function(){
                $item.css({
                    left: $item.data('plugin_'+self.pluginName+'-pos-x')+'px',
                    top: $item.data('plugin_'+self.pluginName+'-pos-y')+'px'
                });
                self.vendorPrefixes($item,'transform','scale(1)');
            }, start + Math.abs(self.step_out) * index));
        });
        self._timeouts.push(setTimeout(function(){
            if(self._state === 'opening') self.open();
            self._state = 'open';
        },start+Math.abs(self.step_out) * set.length));
        self._state = 'opening';
        return self;
	},
	

	/**
	 *	This method allows to close the circualr menu through the trigger method set while creating circle menu object. This method modifies `_state` variable which helps in determining the state of circle menu (open/closed).
	 *	This assumes no argument while invoking.
	 *	@method close
	 *	@param [immediate] {Boolean} If set to true, the circle menu closes immediately. Else it'll wait for timeout.
	 *	@return {Object} element
	 *	@example
	 *		cmenu.close();
	*/
	close: function(immediate) {
		var self = this,
            $self = this.element,
            do_animation = function do_animation(){
            var start = 0,
                set;

            self.clearTimeouts();
            if(self._state === 'closed') return self;
            if(self.step_in >= 0){
                set = self.menu_items;
            }else{
                set = $(self.menu_items.get().reverse());
            }
            set.each(function(index){
                var $item = $(this);

                self._timeouts.push(setTimeout(function(){
                    $item.css({top:0,left:0});
                    self.vendorPrefixes($item,'transform','scale(.5)');
                }, start + Math.abs(self.step_in) * index));
            });
            self._timeouts.push(setTimeout(function(){
                if(self._state === 'closing') self.close();
                self._state = 'closed';
            },start+Math.abs(self.step_in) * set.length));
            $self.removeClass(self.pluginName+'-open');
            $self.addClass(self.pluginName+'-closed');
            self._state = 'closing';
            return self;
        };
        if(immediate){
            do_animation();
        }else{
            self._timeouts.push(setTimeout(do_animation,self.delay));
        }
        return this;
	},
	select: function(index) {
		var self = this,
            selected, set_other;

        if(self._state === 'open' || self._state === 'opening'){
            self.clearTimeouts();
            set_other = self.element.children('li:not(:nth-child('+index+'),:first-child)');
            selected = self.element.children('li:nth-child('+index+')');
            self.vendorPrefixes(selected.add(set_other), 'transition', 'all 500ms ease-out');
            self.vendorPrefixes(selected, 'transform', 'scale(2)');
            self.vendorPrefixes(set_other, 'transform', 'scale(0)');
            selected.css('opacity','0');
            set_other.css('opacity','0');
            self.element.removeClass(self.pluginName+'-open');
            setTimeout(function(){self.initCss();},500);
        }
	},
	clearTimeouts: function() {
		var timeout;

        while(timeout = this._timeouts.shift()){
            clearTimeout(timeout);
        }
	},
	initCss: function() {
		var self = this, 
            $items;

        self._state = 'closed';
        self.element.removeClass(self.pluginName+'-open');
        self.element.css({
            'list-style': 'none',
            'margin': 0,
            'padding': 0,
            'width': self.item_diameter+'px'
        });
        $items = self.element.children('li');
        $items.attr('style','');
        $items.css({
            'display': 'block',
            'width': self.item_diameter+'px',
            'height': self.item_diameter+'px',
            'text-align': 'center',
            'line-height': self.item_diameter+'px',
            'position': 'absolute',
            'z-index': 1,
            'opacity': ''
        });
        self.element.children('li:first-child').css({'z-index': 1000-self.depth});
        self.menu_items.css({
            top:0,
            left:0
        });
        self.vendorPrefixes($items, 'border-radius', self.item_diameter+'px');
        self.vendorPrefixes(self.menu_items, 'transform', 'scale(.5)');
        setTimeout(function(){
            self.vendorPrefixes($items, 'transition', 'all '+self.speed+'ms '+self.transition_function);
        },0);
	}
}