/**
* @preserve Copyright 2012 Native5
* version 0.5
* author: Native5 Solutions Inc.
*/

/**
 * This is the functin which will convert the appropriate DOM node to a Hozinatally Scrollable Menu.
 * The expected syntax will be <br />
 * <pre style="background:#EFEEED; border: 1px solid #BABABA; padding: 5px; color: #336699">
&lt;ParentNode&gt;  <span style="color:#339966">-- Parent container holding all the DOM elements of Horizontal Scroll Menu.</span>
	&lt;Left Navigation Menu /&gt;
	&lt;Container&gt; <span style="color:#339966">-- Fixed width container. This will be the width of scroll menu.</span>
		&lt;Container&gt; <span style="color:#339966">-- Container for all the scrollable items. It's size should at least equal to sum of all items.</span>
			&lt;Scrollable Items /&gt; <span style="color:#339966">--Menu items.</span>
			&lt;Scrollable Items /&gt;
			...
		&lt;/Container&gt;
	&lt;/Container&gt;
	&lt;Right Navigation Menu /&gt;
&lt;/ParentNode&gt;
</pre>
 * User can now call TouchScroll function on <span style="border: 1px solid #BABABA;">&lt;ParentNode&gt;</span>. If the <span style="border: 1px solid #BABABA;">&lt;ParentNode&gt;</span> doesn't have any child node, the function will return <i>null</i>.
 * @class jQuery
*/

(function($) {
	
	/**
	 *	This jQuery method converts the DOM node with proper syntax to a Horizontal Scroll Menu.
	 *	@method TouchScroll
	 *  @param [options] {Object}
	 *	@param [options.leftElm] {Object} DOM node which will act as `left` controller. On click, one item will move to the right.
	 *	@param [options.rightElm] {Object} DOM node which will act as `right` controller. On click, one item will move to the left.
	 *	@example
	 *		$(element).TouchScroll({leftElm: $("#left element")});
	*/ 
    $.fn.TouchScroll = function(options) {
        return this.each(function() {
            var defaults = {leftElm: null, rightElm: null};
            var settings  = $.extend(true, {}, defaults, options);

            var left      = settings.leftElm;
            var right     = settings.rightElm;
            var container = null;
			
			if($(this).children().length === 0) {
				return null;
			}
			else if($(this).children().length === 1) {
				container = $(this).children()[0];
			}
			else {
				container = $(this).children()[1];
			}
            
			var content   = $(container).children()[0];
            var touch = { start: {}, end: {} };
			var startTime = 0;
			var endTime = 0;

			var width = 0;
			var itemWidth = 0;
			$('> *', content).each(function() {
				width += $(this).outerWidth(true);
				var tempWidth = $(this).outerWidth(true);
				if(itemWidth < tempWidth) {
					itemWidth = tempWidth;
				}
				$(this).css("float", "left");
			});
			$(content).width(width);

            var max  = $(content).width() - $(container).width();
			touch.end.position = 0;
			$(content).bind('touchmove', touchmove);
			$(content).bind('touchstart', touchstart);
			
			applyCSS();

			$(left ).bind('touchstart', function(event) { move(event, 'left' ); });
			$(right).bind('touchstart', function(event) { move(event, 'right'); });

			function touchstart(event) {
				touch.start.x = event.originalEvent.targetTouches[0].pageX;
				touch.start.y = event.originalEvent.targetTouches[0].pageY;
				touch.start.position = touch.end.position;
				touch.start.time = Number(new Date());
				$(content).css('-webkit-transition', '');
				startTime = new Date().getTime();
			}

			function touchmove(event) {
				event.preventDefault();
				touch.end.x = event.originalEvent.targetTouches[0].pageX;
				touch.end.y = event.originalEvent.targetTouches[0].pageY;

				var deltaX = touch.end.x - touch.start.x;
				
				endTime = new Date().getTime();
				
				var touchSpeed = Math.abs(deltaX / (endTime - startTime));
				if(deltaX >= 0) {
					deltaX = 2 * touchSpeed * max;
				}
				else {
					deltaX = -(2* touchSpeed * max);
				}
				
				var target = touch.start.position + deltaX;

				/* constrain the target */
				if (target > 0) target = 0;
				if (target < -max) target = -max;
				
				checkArrows(target);
				$(content).css("-webkit-transition", "all linear 500ms");
				$(content).css('-webkit-transform', 'translate3d(' + target + 'px, 0, 0)');
				touch.end.position = target;
			}

			function move(event, direction) {
				var target = touch.end.position;

				if (direction == 'left') target += itemWidth;
				if (direction == 'right') target -= itemWidth;

				/* constrain the target */
				if (target > 0) target = 0;
				if (target < -max) target = -max;
				
				checkArrows(target);
				$(content).css('-webkit-transition', '-webkit-transform 0.5s ease-in-out');
				$(content).css('-webkit-transform', 'translate3d(' + target + 'px, 0, 0)');
				touch.end.position = target;
			}
			
			function checkArrows(target) {
				if(target === 0) {
					$(left).hide();
				}
				else {
					$(left).show();
				}
				
				if(target === -max) {
					$(right).hide();
				}
				else {
					$(right).show();
				}
			}
			
			function applyCSS() {
				$(this).css("position", "relative");
				$('*', this).css('-webkit-user-select', 'none');
				$('ul', this).css({'padding': 0, 'margin' : 0});
				$('li', this).css('list-style', 'none');
				
				$(container).css({"position": "relative", "overflow": "hidden"});
				$(content).css({
					'-webkit-transform': 'translate3d(0, 0, 0)',
					'position': 'absolute',
					'top': 0
				});
				$(left).css({
					'display': 'block',
					'position': 'absolute',
					'top': 0,
					'z-index': 999,
					'left': 0
				});
				$(right).css({
					'display': 'block',
					'position': 'absolute',
					'top': 0,
					'z-index': 999,
					'right': 0
				});
				$(left).hide();
			}
        });
    }
}(jQuery));
