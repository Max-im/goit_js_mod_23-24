requirejs.config({
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery'
  },
  shim: { jquery: { exports: 'jQuery' } }
});

require(['jquery', 'tmpl', 'Model', 'View', 'Controller'], function(
  $,
  tmpl,
  Model,
  View,
  Controller
) {
  // // ajax
  // 	var myObj;
  // 	var myArr = [];
  // 	$.getJSON("../json/db.json",function(result){
  // 		// myObj = success.start;
  // 		// var myText = $.parseJSON(myObj.responseText);
  // 		myArr = $.each(result, function(i, field, j){
  //             var len = field.length;
  //             var newArr = [];
  //             for(var j = 0; j < len; j++){
  //             	newArr[j] = field[j];
  //             	// console.log(field[j]);
  //             	// console.log(myArr);
  //             }
  //             	// return myArr;
  //         });
  // 	});
  //     console.log(newArr);

  // init
  // var firstData = myArr;
  var firstData = ['todo1', 'name', 'js', 'gulp', 'babel'];
  var model = new Model(firstData);
  var view = new View(model);
  var controller = new Controller(model, view);
});
