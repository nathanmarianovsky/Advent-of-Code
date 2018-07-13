// Declare the necessary variables
var fs = require("fs");

var check = str => {
	var holder = str.split("");
	for(var i = 0; i < holder.length; i++) {
		if(i % 2 != 0) {
			if(holder[i] != "0") { return 0; }
		}
		else {
			if(holder[i] != "1") { return 0; }
		}
	}
	return 1;
};

var bin = dec => (dec >>> 0).toString(2);

// Read the file and parse the two necessary lines. Keep iterating the counter until the desired binary representation is found.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var commands = data.split("\n").slice(0, data.split("\n").length - 1),
		value = parseInt(commands[1].split(" ")[1]) * parseInt(commands[2].split(" ")[1]),
		counter = 1;
	while(!check(bin(counter + value))) { counter++; }
	console.log("The lowest positive integer that can be used to initialize register a cause the code to output 0,1,0,1,... repreating forever is " + counter + ".");
});