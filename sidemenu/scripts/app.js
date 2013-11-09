var test = {};
window.onload = function() {
	var menu = new native5.ui.SideMenu({'bodySelector':".body",'refresh':false, 'displacement':"200"});
	
	menu.addItem({itemText: "Link 1", itemClass: "sitem", itemStyle: "", itemId: "li01", itemClick: "showAlert(this);" });
	menu.addItem({itemText: "Link 2", itemClass:"sitem", itemId:"li02"});
	menu.addItem({itemText: "Link 3", itemClass: "sitem", itemStyle: "", itemId: "li03"});
	menu.addItem({itemText: "Link 4", itemClass: "sitem", itemStyle: "", itemId: "li04"});
	menu.addItem({itemText: "Link 5", itemClass: "sitem", itemStyle: "", itemId: "li05"});
	
	menu.addItem({itemText: "Link 6", itemClass: "sitem", itemStyle: "", itemId: "li06"});
	menu.addItem({itemText: "Link 7", itemClass: "sitem", itemStyle: "", itemId: "li07"});
	menu.addItem({itemText: "Link 8", itemClass: "sitem", itemStyle: "", itemId: "li08"});
	menu.addItem({itemText: "Link 9", itemClass: "sitem", itemStyle: "", itemId: "li09"});
	
	$("#menu li a").click(function(){
		var p = $(this).parent();
		if($(p).hasClass('active')){
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	});

	menu.render();

	$(".menuShow").on("click", function() {
		menu.toggle();
	});
}

function showAlert(elem) {
	alert(elem.innerHTML);
}

