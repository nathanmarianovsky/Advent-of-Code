// Declare the necessary variables
var fs = require("fs");

// Read and parse. Identify the number of parentheses and commas in the string, namely 'Ar/Rn' and 'Y', and subtract from the number of elements in the molecule to obtain the number of steps. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var str = data.split("\n")[data.split("\n").length - 2],
		arr = str.split(""),
		length = arr.filter(elem => elem == elem.toUpperCase()).length,
		paren = str.split("Ar").length,
		comma = arr.filter(elem => elem == "Y").length;
	if(paren % 2 != 0) { paren--; }
	console.log("The fewest number of steps that are needed to go from 'e' to the medicine molecule is " + (length - (2 * paren) - (2 * comma) - 1) + ".");
});