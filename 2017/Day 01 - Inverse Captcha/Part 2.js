// Declare the necessary variables
var fs = require("fs"),
	math = require("mathjs");

// Read the file and parse. At each step compare the digits and add if they match.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var	container = data.split(""),
		sum = 0;
	container.splice(container.length - 1,1);
	var step = container.length / 2;
	for(var j = 0; j < container.length; j++) {
		var current = parseInt(container[j]),
			compare = parseInt(container[math.mod(j + step, container.length)]);
		if(current == compare) { sum += current; }
	}
	console.log("The solution to the captcha is " + sum + ".");
});