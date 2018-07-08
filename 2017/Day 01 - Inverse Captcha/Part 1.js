// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. At each step compare the digits and add if they match.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var	container = data.split(""),
		sum = 0;
	container.splice(container.length - 1,1);
	for(var j = 0; j < container.length; j++) {
		var current = parseInt(container[j]);
		if(j != container.length - 1) {
			var next = parseInt(container[j+1]);
			if(current == next) { sum += current; }
		}
		else {
			if(current == parseInt(container[0])) { sum += current; }
		}
	}
	console.log("The solution to the captcha is " + sum + ".");
});