// Declare the necessary variables
var fs = require("fs"),
	counter = 0;

// Read the file and parse. For each opening parenthesis add one to counter, otherwise subtract one from counter. The solution corresponds to the final value of counter.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
	}
	console.log("Height:" + counter);
});