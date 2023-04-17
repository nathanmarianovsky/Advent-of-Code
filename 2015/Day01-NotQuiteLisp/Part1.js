// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each opening parenthesis add one to counter, otherwise subtract one from counter. The solution corresponds to the final value of counter.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	let counter = 0;
	for(let i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
	}
	console.log("The instructions take Santa to floor number " + counter + ".");
});