$(document).ready( function() {
	var drawer = new native5.ui.Drawer($('#drawerDiv'), {height: 80});
	$(".ui-drawer-handle").click(function() {
		drawer.clickToToggle($("#drawerDiv"));
	});
});