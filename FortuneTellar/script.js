
// This is the Javascript for the fortune teller assignment
// spring 2019


var button = document.querySelector("#go");
console.log("My Button Is", button);


var heading = document.querySelector("#eat");
button.onclick = function() {

	var sandwichCheckbox = document.querySelector("#sandwich");
	var fastfoodCheckbox = document.querySelector("#fastfood");
	var sitdownCheckbox = document.querySelector("#sitdown");

	if (sandwichCheckbox.checked) {
		var s = Math.floor(Math.random() * sandwiches.length);
		console.log("random sandwich", sandwiches[s]);
		var nameInput = document.querySelector("#inputName");
		var name = nameInput.value;
		var yes = heading.innerHTML =  name + ", looks like you are eating " + sandwiches[s]
		console.log("your name is", name);
		var newItem = document.createElement("ul")
		newItem.innerHTML = "- " + yes;
		theList.appendChild(newItem);

	} else if (fastfoodCheckbox.checked) {
		var f = Math.floor(Math.random() * fastfood.length);
		console.log("random fast food", fastfood[f]);
		var nameInput = document.querySelector("#inputName");
		var namee = nameInput.value
		var yes = heading.innerHTML =  namee + ", looks like you are eating " + fastfood[f]
		console.log("your name is", name);
		var newItem = document.createElement("ul")
		newItem.innerHTML = "- " + yes;
		theList.appendChild(newItem);

	} else if (sitdownCheckbox.checked){ 
		var d = Math.floor(Math.random() * sitdown.length);
		console.log("random sitdown", sitdown[d]);
		var nameInput = document.querySelector("#inputName");
		var namme = nameInput.value
		var yes = heading.innerHTML =  namme + ", looks like you are eating " + sitdown[d]
		console.log("your name is", name);
		var newItem = document.createElement("ul")
		newItem.innerHTML = "- " + yes;
		theList.appendChild(newItem);
	}
}

var sandwiches = null;
var fastfood = null;
var sitdown = null;


//class notes on getting JSON Data
fetch("https://api.myjson.com/bins/11ijq2").then(function(response) { //step 1, staring the task
 	response.json().then(function (data) {
	    sandwiches = data.Sandwich;
	    fastfood = data.Fastfood
	    sitdown = data.Sitdown
 		console.log("the data is: ", data);  //step2, 
 		
 	})
 });




