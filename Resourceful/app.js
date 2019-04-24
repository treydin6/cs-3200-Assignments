// This is the javascript file for the resourceful assignment
// Web 3200 spring 2019

console.log("Connected");

// login page
var hide = function (elem) { elem.style.display = 'none'; 
console.log("hello");

var Todos = null;

var createTodo = function(todo, ddate, clas, subject) {
	var data = "todo=" + encodeURIComponent(todo);
	data += "&ddate=" + encodeURIComponent(ddate);
	data += "&clas=" + encodeURIComponent(clas);
	data += "&subject=" + encodeURIComponent(subject);
	// data += "&completed" + encodeURIComponent(completed);

	fetch("http://localhost:8080/todos", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("todo saved.");
    // load the new list of restaurants!
    getTodos();
  });
};

var deleteTodo = function( id ) {
	console.log(id)
	// put an alert saying do you really want to delete the entry.
	fetch(`http://localhost:8080/todos/${id}`, {
		method: 'DELETE',
	}).then(function(response){
		//alert("do you really want to delete this item?" confirm())
		getTodos();
		console.log("todo deleted");
	});
}; 








// var updateTodo = function( id, assignment, date, clas, subject ) {
// 	console.log(id)
// 	var todoInput = document.querySelector("#ToDoInput");
// 	var dueDate = document.querySelector("#date");
// 	var whatClass = document.querySelector("#class");
// 	var whatSubject = document.querySelector("#subject");
// 	var updateButton = document.querySelector("#SubmitUpdate");

// 	todoInput.value = assignment;
// 	dueDate.value = date;
// 	whatClass.value = clas;
// 	whatSubject.value = subject;
// 	updateButton.innerHTML = "Update Entry"

// 	updateButton.onclick = function(){
// 		assignment = ToDoInput.value;
// 		date = dueDate.value;
// 		clas = whatClass.value;
// 		subject = whatSubject.value;

// 		console.log(id, assignment, date, clas, subject);
// 		var data = "todo=" + encodeURIComponent(todo);
// 		data += "&ddate=" + encodeURIComponent(ddate);
// 		data += "&clas=" + encodeURIComponent(clas);
// 		data += "&subject=" + encodeURIComponent(subject);
	
// 		fetch(`http://localhost:8080/todos/${id}`, {
// 			method: 'PUT',
// 			body: data,
// 			headers: {
//                 "Content-type": "application-x-www-form-urlencoded"
//             }
// 		}).then(function(response){
// 			getTodos()
// 			console.log("todo updated")
// 		});
// };









// <<<<<<----- Clear all button ----->>>>>>
// <<<<<<----- Not yet working ----->>>>>>
// var CLearBut = document.querySelector("#clear");
// 	CLearBut.onclick = function() {
// 		console.log("this is a start to clear button");
// 		clearALLTODOS();
// 	};

// var clearALLTODOS = function(){
// 	fetch(`http://localhost:8080/todos/`, {
// 		method: 'DELETE',
// 	}).then(function(response){
// }

// <<<<<<----- Add Item button ----->>>>>>
var buttonAppend = document.querySelector("#go");
buttonAppend.onclick = function() {
	var todoInput = document.querySelector("#ToDoInput");
	var dueDate = document.querySelector("#date");
	var whatClass = document.querySelector("#class");
	var whatSubject = document.querySelector("#subject");

	var input = todoInput.value;
	var date = dueDate.value;
	var Class = whatClass.value;
	var subject = whatSubject.value;
	if( input != ""){ 
		document.getElementById('ToDoInput').value = "";
		document.getElementById('date').value = "";
		document.getElementById('class').value = "";
		document.getElementById('subject').value = "";
		console.log(input, date, Class, subject);
		createTodo(input, date, Class, subject);
	} else {
		alert("You need to enter a valid homework item!");
	}
};

var getTodos = function() {
	fetch("http://localhost:8080/todos").then(function (response) {
		response.json().then(function (data) {
		    // save all of the data into a global variable (to use later)
		    Todos = data;
		    
		    // data is an array of string values
		    var suggestionList = document.querySelector("#AppendTODOs");
		    suggestionList.innerHTML = "";

		    // add the restaurants to the suggestions list
		    data.forEach(function (todos) { // for restaurant in data
			    var newItem = document.createElement("li");
			    newItem.className = "Assignment-style";
			    //class notes
			    var nameDiv = document.createElement("div");
			    nameDiv.innerHTML = `Assignment: <span style="font-style:italic;">${todos.todo}<span>`;
			    nameDiv.className = "todos-name";
		        newItem.appendChild(nameDiv);

	    	    var dateDiv = document.createElement("div");
			    if (todos.ddate) {
			    dateDiv.innerHTML = `Due Date: <span style="font-style:italic;">${todos.ddate}<span>`;
			    } else {
			      dateDiv.innerHTML = "No due Date";
			    }
			    dateDiv.className = "todos-ddate";
			    newItem.appendChild(dateDiv);

			    var classDiv = document.createElement("div");
			    if (todos.clas) {
			      classDiv.innerHTML = `Class: <span style="font-style:italic;">${todos.clas}<span>`;
			    } else {
			    	classDiv.innerHTML = "No specified class";
			    }
			    classDiv.className = "todos-class";
			    newItem.appendChild(classDiv);

			    var subjectDiv = document.createElement("div");
			    if (todos.subject) {
			    	subjectDiv.innerHTML = `Subject: <span style="font-style:italic;">${todos.subject}<span>`;
			     } else {
			      	subjectDiv.innerHTML = "No Specified subject";
			    }
			    subjectDiv.className = "todos-subject";
			    newItem.appendChild(subjectDiv);

			    var deleteButton = document.createElement("button");
			    deleteButton.innerHTML = "Delete";
			    deleteButton.onclick = function(){
			    var proceed = confirm(`do you want to delete ${todos.todo}?`);
			    	if( proceed ){
			      	// write methid for this.
			      		deleteTodo(todos.id);
			      	}
			    };
			    deleteButton.className = "todos-delete";

			    var updateButton = document.createElement("button");
			    updateButton.innerHTML = "Update";
			    updateButton.onclick = function(){
			    	updateTodo(todos.id, todos.todo, todos.ddate, todos.clas, todos.subject);
			    	//var update = document.createElement("input")
			    	//newItem.appendChild(update);
			    };
			    updateButton.className = "todos-update";

			    newItem.appendChild(deleteButton);
			    newItem.appendChild(updateButton);

			    suggestionList.appendChild(newItem);
		      
		    });
		});
	});
};

getTodos();
};
