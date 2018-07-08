// Declare the necessary variables
var fs = require("fs");

// Returns the factorial of a given number.
var fac = num => num > 1 ? num * fac(num - 1) : 1; 

// Read the file and parse the two necessary lines to extract the output.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		value1 = parseInt(container[19].split(" ")[1]),
		value2 = parseInt(container[20].split(" ")[1]);
	console.log("The value left in register 'a' post executing the assembunny code is " + (fac(12) + (value1 * value2)) + ".");
});
