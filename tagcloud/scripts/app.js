var jsonData = '{"tags":[{"name":"Bikas","imp":"1","weight":"9","age":"0"},{"name":"Vaibhav","imp":"0","weight":"5","age":"2"},{"name":"Rahul","imp":"1","weight":"1","age":"1"},{"name":"Rohit","imp":"1","weight":"9","age":"9"},{"name":"Raj","imp":"0","weight":"8","age":"1"},{"name":"Bikas","imp":"0","weight":"0","age":"9"},{"name":"Bikas","imp":"1","weight":"7","age":"1"},{"name":"Bikas","imp":"1","weight":"5","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"9","age":"1"},{"name":"Bikas","imp":"1","weight":"3","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"2","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"4","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"2","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"1","age":"1"},{"name":"Bikas","imp":"1","weight":"8","age":"1"},{"name":"Bikas","imp":"1","weight":"0","age":"1"}],"colors":[{"color":"red"},{"color":"blue"},{"color":"green"},{"color":"yellow"},{"color":"#454520"},{"color":"#202099"}]}';

var tc;

$(document).on("pageinit", "#Home", function(event) {
	tc = new native5.ui.TagCloud({divId: "tgd", fps: 50, width: "100%", height: "300px", rotate_factor: 5, zoom: 100});
	
	tc.render();
	tc.modify({centrex: 120, centrey: 120});
	tc.append({data: jsonData});
	tc.refresh();
});

 $(document).ready(function() {
	var new_data = new Array();
	$("#btnTagShow").bind("click", function(e) {
		new_data = new Array();
		str = $("#basic").val();
		tags = str.split(" ");
		tags.forEach(function(elem, idx) {
			new_data.push({"name":elem, "imp":"1", "weight":"7", "age":"2"}); 
		});
		tc.append({data:{tags:new_data}});
		tc.refresh();
	});
});
