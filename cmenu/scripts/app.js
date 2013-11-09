$(function(){
	var v1 = new native5.ui.CircleMenu($('#menu'),{direction:'bottom-right'});
	var subv = new native5.ui.CircleMenu($('#submenu'),{direction:'bottom-right'});
	var v16 = new native5.ui.CircleMenu($('#menu2'), {
		direction:'full',
		step_in:0, 
		step_out:0
	});
	
	$('.menu a').on('click',function(evt){if($(this).attr('href')==='#'){evt.preventDefault();}});
	
	$('#examples > div:first-child').css('display','block');
	$('.menu li:first-child a').addClass('active');
	$('#menu a').each(function(){
		var $link = $(this);
		$link.on('click', function(evt){
			$('#menu a').removeClass('active');
			$('#'+$link.attr('rel')).css('display','block');
			$link.addClass('active');
			if(subv._state === "open" || subv._state === "opening")
				subv.close(true);
		});
	})
	$('#menu2 a').each(function(){
		var $link = $(this);
		$link.on('click', function(evt){
			$('#menu2 a').removeClass('active');
			$('#'+$link.attr('rel')).css('display','block');
			$link.addClass('active');
		});
	})
});