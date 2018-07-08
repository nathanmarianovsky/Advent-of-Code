// Declare the necessary variables
var fs = require("fs"),
	counter = 0;

// Read the file and parse. For each opening parenthesis add one to counter, otherwise subtract one from counter. The solution corresponds to the first position that causes the counter to equate to -1.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
		if(counter == -1) {
			console.log("Position When Counter == -1: " + (i + 1));
			break;
		}
	}
});