var initLoc;

$(document).ready(function() {
	// var abc = new native5.ui.dragdrop('testElement', 'drop', {callback: function() {console.log('Successfully dropped.')}});
	$("#drop").setDroppable();
	$("#testElement").setDraggable({callback: checkdrop});
	initLoc = $("#testElement").initPosition();
});

function checkdrop() {
	var drag = $("#testElement");
	var drop = $("#drop");
	var dropLoc = getCoordinates($(drop));
	var dragLoc = getCoordinates($(drag));
	var dragWidth = $(drag).width();
	var dragHeight = $(drag).height();
	
	if(!(dragLoc[0] >= dropLoc[0] && (dragLoc[0] + dragWidth) <= dropLoc[2] && dragLoc[1] >= dropLoc[1] && (dragLoc[1] + dragHeight) <= dropLoc[3])) {
		$(drag).css("left", initLoc[0] + 'px');
		$(drag).css("top", initLoc[1] + 'px');
	}
	else {
		initLoc = [$(drag).offset().left, $(drag).offset().top];
	}
}