window.onload = function() {
	var menu = new native5.ui.ListMenu($('#menu'), {menuClass: "ui-dropdown-div"});
	
	menu.addItem({itemText: "List 1", itemClass: "ui-dropdown-head", itemStyle: "padding-left: 10px;", itemClick: "alert('Hello')"});
	menu.addItem({itemText: "<li style='padding-left: 10px;' onclick=\"alert('Hi')\">List 2</li>"});
}