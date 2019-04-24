// This is the javascript file for the Authentication assignment
// Web 3200 spring 2019
var main = document.querySelector('#MainPage');
var create = document.querySelector("#CreateAccount");
var login = document.querySelector('#LoginPage');

main.style.display = 'none';
create.style.display = 'none';
login.style.display = 'block';


console.log("Connected");

var Todos = null;

var createTodo = function(todo, ddate, clas, subject) {
	var data = "todo=" + encodeURIComponent(todo);
	data += "&ddate=" + encodeURIComponent(ddate);
	data += "&clas=" + encodeURIComponent(clas);
	data += "&subject=" + encodeURIComponent(subject);

	fetch("http://localhost:8080/todos", {
	    method: 'POST',
	    body: data,
	    credentials: 'include',
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
		credentials: 'include'
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



// ----->>>>> This is the Authentication portion of javascript <<<<<----- \\
// ----->>>>> Authentication <<<<<----- \\
// ----->>>>> Both Login and new users <<<<<----- \\

// ----->>>>> Login Page <<<<<----- \\
// ----->>>>> onclick login <<<<<----- \\

var LoginButton = document.querySelector("#login");
LoginButton.onclick = function() {
	var uName = document.querySelector("#userName");
 	var password = document.querySelector("#Password");

 	var uNameInput = uName.value;
 	var passwordInput = password.value;

 	if( uNameInput == "" ){
 		alert("You need to enter a username and password!");
 		document.getElementById('userName').value = "";
 		document.getElementById('Password').value = "";
 		
 	} else if( passwordInput == ""){
 		alert("You need to enter a username and password!");
 		document.getElementById('userName').value = "";
 		document.getElementById('Password').value = "";
 	} else{
 		login(uNameInput, passwordInput);
 	};
 };

// Authenticate(Logging in) is /sessions
// ----->>>>> Goes to server from here <<<<<----- \\
var login = function( uNameInput, passwordInput) {
	var h2 = document.querySelector("#h2")
	datdastring = 'email='+encodeURIComponent(uNameInput)+'&password='+encodeURIComponent(passwordInput)
	fetch("http://localhost:8080/sessions", {
		method: 'POST',
		body: datdastring,
		credentials: 'include'
	}).then(function(response){
	if( response.status == 201 ){ // not logged in
			// show the login/ register form
		h2.innerHTML = 'Login Sucessful';	
		console.log("Login Sucessful")
		var main = document.querySelector('#MainPage');
		var create = document.querySelector("#CreateAccount");
		var login = document.querySelector('#LoginPage');

		getTodos()
		login.style.display = 'none';
		create.style.display = 'none';
		main.style.display = 'block';
		getTodos()
	}else{
		//var h2 = document.querySelector("#h2")
		h2.innerHTML= "Invalid attempt, try again"
		h2.style.color = 'red'
		console.log("Invalid Login Attempt")
		document.getElementById('userName').value = "";
 		document.getElementById('Password').value = "";

	};
});
};

// ----->>>>> Login Page Create New User <<<<<----- \\
// ----->>>>> takes you to create page <<<<<----- \\
var NewUser = document.querySelector("#newUser");
NewUser.onclick = function(){
	var h2 = document.querySelector("#h2")
	h2.style.display = 'none';
	var main = document.querySelector('#MainPage');
	var create = document.querySelector("#CreateAccount");
	var login = document.querySelector('#LoginPage');
	login.style.display = 'none';
	create.style.display = 'block';
	main.style.display = 'none';
	register()
};


var createNewUser = function(fname, lname, email, password) {
	var data = "fname=" + encodeURIComponent(fname);
	data += "&lname=" + encodeURIComponent(lname);
	data += "&email=" + encodeURIComponent(email);
	data += "&password=" + encodeURIComponent(password);

	fetch("http://localhost:8080/users", {
		method: 'POST',
		body: data,
		credentials: 'include'
	}).then(function(response){
	if( response.status == 201 ){ // not logged in
			// show the login/ register form	
		console.log("Account Created")
		var main = document.querySelector('#MainPage');
		var create = document.querySelector("#CreateAccount");
		var login = document.querySelector('#LoginPage');
		login.style.display = 'block';
		create.style.display = 'none';
		main.style.display = 'none';
		getTodos()
	} else if( response.status == 422){
		var InUse = document.querySelector("#InUse");
		InUse.innerHTML = "That email is already in use, Try again"
		InUse.style.color = 'red'
		var firstName = document.querySelector("#fname");
 		var lastName = document.querySelector("#lname");
 		var email = document.querySelector("#email");
 		var password = document.querySelector("#password");

 		document.getElementById('fname').value = "";
 		document.getElementById('lname').value = "";
 		document.getElementById('email').value = "";
 		document.getElementById('password').value = "";

		console.log("That user name is already in use")
	};

	});
};


// ----->>>>> Sign Up Page<<<<<----- \\
var register = document.querySelector("#signup");
register.onclick = function(){
	var firstName = document.querySelector("#fname");
 	var lastName = document.querySelector("#lname");
 	var email = document.querySelector("#email");
 	var password = document.querySelector("#password");

 	var firstNameInput = firstName.value;
 	var lastNameInput = lastName.value;
 	var emailInput = email.value;
 	var passwordInput = password.value;

 	if( firstNameInput == "" ){
 		alert("You need to enter all the fields to sign up!");
 		document.getElementById('fname').value = "";
 		document.getElementById('lname').value = "";
 		document.getElementById('email').value = "";
 		document.getElementById('password').value = "";

 	} else if( lastNameInput == "" ){
 		alert("You need to enter all the fields to sign up!");
 		document.getElementById('fname').value = "";
 		document.getElementById('lname').value = "";
 		document.getElementById('email').value = "";
 		document.getElementById('password').value = "";

 	} else if( emailInput == "" ){
 		document.getElementById('fname').value = "";
		document.getElementById('lname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";

 	} else if( passwordInput == "" ){
 		alert("You need to enter all the fields to sign up!");
		document.getElementById('fname').value = "";
		document.getElementById('lname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";

 	}else{
 		createNewUser(firstNameInput, lastNameInput, emailInput, passwordInput);
 	}
};


// ----->>>>> Get Todos <<<<<----- \\

var getTodos = function() {
	fetch("http://localhost:8080/todos", { 
		credentials: 'include'
	}).then(function (response) {
		var stat = response.status
		if( stat == 401 ){
			// show the login/register forms
			var main = document.querySelector('#MainPage');
			var create = document.querySelector("#CreateAccount");
			var login = document.querySelector('#LoginPage');
			login.style.display = 'block';
			create.style.display = 'none';
			main.style.display = 'none';
			return;
		}

		response.json().then(function (data) {
			// show the approperiate div for the data
			// hide the login/register forms
			var main = document.querySelector('#MainPage');
			var create = document.querySelector("#CreateAccount");
			var login = document.querySelector('#LoginPage');
			login.style.display = 'none';
			create.style.display = 'none';
			main.style.display = 'block';


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
			    	updateTodo(todos.id);
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
