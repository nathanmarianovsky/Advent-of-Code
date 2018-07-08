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

// Returns a deep copy of a given object.
var copy = obj => {
	var output, v, key;
	output = Array.isArray(obj) ? [] : {};
	for(key in obj) {
	   v = obj[key];
	   output[key] = (typeof v === "object") ? copy(v) : v;
	}
	return output;
};

// Read the file and parse. For each picosecond take the necessary steps and add to the counter if caught. Keep iterating until a delay is found in which the packet goes undetected. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		initial = [];
	container.forEach(iter => {
		var arr = iter.split(":").map(elem => parseInt(elem.trim())),
			obj = {
				depth: arr[0],
				range: arr[1],
				position: 0,
				direction: 1
			};
		initial.push(obj);
	});
	var total = initial[initial.length - 1].depth,
		states = copy(initial);
		counter = 0,
		delay = 0;
	for(var j = 0; j <= total + 1; j++) {
		var holder = states.findIndex(elem => elem.depth == j && elem.position == 0);
		if(holder != -1) {
			counter += 1;
		}
		states = advance(states);
	}
	while(counter != 0) {
		delay++;
		counter = 0;
		states = advance(copy(initial));
		initial = copy(states);
		for(var j = 0; j <= total + 1; j++) {
			holder = states.findIndex(elem => elem.depth == j && elem.position == 0);
			if(holder != -1) {
				counter += 1;
			}
			if(counter != 0) { break; }
			states = advance(states);
		}
	}
	console.log("The fewest number of picoseconds needed to delay the packet to pass undetected is " + delay + ".");
});