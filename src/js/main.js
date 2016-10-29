$(function(){
	// ajax
	var jsonElem = $.ajax({
		url: "../json/db.json",
		async: false
	});
	var myObj = $.parseJSON(jsonElem.responseText);



	// init
	var firstData = myObj.start;
	var model = new Model(firstData);
	var view = new View(model);
	var controller = new Controller(model, view);


	
});