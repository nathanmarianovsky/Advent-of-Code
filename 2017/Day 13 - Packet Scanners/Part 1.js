// Declare the necessary variables
var fs = require("fs");

// Given a list of current states this advances all of them by one step.
var advance = current => {
	for(var i = 0; i < current.length; i++) {
		if(current[i].direction == 1) {
			if(current[i].position + 1 == current[i].range - 1) {
				current[i].direction = -1;
			}
			current[i].position += 1;
		}
		else if(current[i].direction == -1) {
			if(current[i].position - 1 == 0) {
				current[i].direction = 1;
			}
			current[i].position -= 1;
		}
	}
	return current;
};

// Read the file and parse. For each picosecond take the necessary steps and add to the counter if caught.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		states = [];
	container.forEach(iter => {
		var arr = iter.split(":").map(elem => parseInt(elem.trim())),
			obj = {
				depth: arr[0],
				range: arr[1],
				position: 0,
				direction: 1
			};
		states.push(obj);
	});
	var total = states[states.length - 1].depth,
		counter = 0;
	for(var j = 0; j <= total + 1; j++) {
		var holder = states.findIndex(elem => elem.depth == j && elem.position == 0);
		if(holder != -1) {
			counter += states[holder].depth * states[holder].range;
		}
		states = advance(states);
	}
	console.log("The severity of the whole trip seems to be " + counter + ".");
});