// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Transverse through the given commands and keep track of the steps.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var	container = data.split("\n").map(elem => parseInt(elem)),
		sum = 0;
	container.splice(container.length - 1,1);
	var position = {
		index: 0,
		steps: 0
	};
	while(position.index < container.length) {
		var currentindex = position.index;
		position.index += container[currentindex];
		container[currentindex]++;
		position.steps++;
	}
	console.log("The number of steps needed to reach the exit is " + position.steps + ".");
});