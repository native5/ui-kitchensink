var jsonData = '{"arcs":[{"function":"console.log(\'Data 1\');","color":"#FF0000"},{"function":"console.log(\'Data 2\');","color":"#0000FF"},{"function":"console.log(\'Data 3\');","color":"#008000"},{"function":"console.log(\'Data 4\');","color":"#FFFF00"},{"function":"console.log(\'Data 5\');","color":"#808080"}],"center":[{"radius":"50","color":"rgba(77, 88, 9, 1)"}]}';

$(document).ready(function() {
	var tw = new native5.ui.TaskWheel(document.getElementById("canvas"), {data: jsonData});
});