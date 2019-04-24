// This is the javascript file for the message log assignment
// Web 3200 spring 2019

console.log("Connected");

var Todos = null;

var buttonAppend = document.querySelector("#go");
console.log("My button is, ", buttonAppend);

buttonAppend.onclick = function() {
	var toDoInputt = document.querySelector("#ToDoInput");
	var input = toDoInputt.value;
	console.log(input);
	var data = "todo=" + encodeURIComponent(input);
	if (input != ""){
		document.getElementById('ToDoInput').value = "";

		fetch("http://localhost:8080/todos", {
			method: 'POST',
			body: data,
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			}
		}).then(function (response){
			console.log("Todo saved.");
			Todo();
		});
	} else {
		alert("You need to enter a valid To-Do item!")
	}	
};

var Todo = function() {
	fetch("http://localhost:8080/todos").then(function (response) {
	  response.json().then(function (data) {
	    // save all of the data into a global variable (to use later)
	    
	    console.log(data)
	    Todos = data;
	    
	    // data is an array of string values
	    var todos = document.querySelector("#AppendTODOs");
	    todos.innerHTML = "";

	    // add the restaurants to the suggestions list
	    data.forEach(function (todo) { // for restaurant in data
	      var newItem = document.createElement("li");
	      console.log(todo);
	      newItem.innerHTML = todo;
	      newItem.className = "todo";
	      todos.appendChild(newItem);
	    });
	  });
	});
};

Todo();



