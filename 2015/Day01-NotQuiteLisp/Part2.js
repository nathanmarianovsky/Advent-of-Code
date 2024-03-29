// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each opening parenthesis add one to counter, otherwise subtract one from counter. The solution corresponds to the first position that causes the counter to equate to -1.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	let counter = 0;
	for(let i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
		if(counter == -1) {
			console.log("The position of the character that causes Santa to first enter the basement is " + (i + 1) + ".");
			break;
		}
	}
});