// Declare the necessary variables
var fs = require("fs"),
	code = [];

// Evolves any given state on the keypad according to the rules defined below.
var evolution = (current, path) => {
	var state = 0;
	if(current == 1) {
		if(path == "U" || path == "L") { state = 1; }
		else if(path == "D") { state = 4; }
		else if(path == "R") { state = 2; }
	}
	else if(current == 2) {
		if(path == "U") { state = 2; }
		else if(path == "R") { state = 3; }
		else if(path == "D") { state = 5; }
		else if(path == "L") { state = 1; }
	}
	else if(current == 3) {
		if(path == "U" || path == "R") { state = 3; }
		else if(path == "D") { state = 6; }
		else if(path == "L") { state = 2; }
	}
	else if(current == 4) {
		if(path == "U") { state = 1; }
		else if(path == "R") { state = 5; }
		else if(path == "D") { state = 7; }
		else if(path == "L") { state = 4; }
	}
	else if(current == 5) {
		if(path == "U") { state = 2; }
		else if(path == "R") { state = 6; }
		else if(path == "D") { state = 8; }
		else if(path == "L") { state = 4; }
	}
	else if(current == 6) {
		if(path == "U") { state = 3; }
		else if(path == "R") { state = 6; }
		else if(path == "D") { state = 9; }
		else if(path == "L") { state = 5; }
	}
	else if(current == 7) {
		if(path == "U") { state = 4; }
		else if(path == "R") { state = 8; }
		else if(path == "D" || path == "L") { state = 7; }
	}
	else if(current == 8) {
		if(path == "U") { state = 5; }
		else if(path == "R") { state = 9; }
		else if(path == "D") { state = 8; }
		else if(path == "L") { state = 7; }
	}
	else if(current == 9) {
		if(path == "U") { state = 6; }
		else if(path == "R" || path == "D") { state = 9; }
		else if(path == "L") { state = 8; }
	}
	return state;
};

// Read the file and parse. For each each line of instructions evolve the start state accordingly and record the states at the end of each line.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		start = 5;
	for(var i = 0; i < container.length; i++) {
		if(container[i] != "") {
			var instructions = container[i].split("");
			for(var j = 0; j < instructions.length; j++) {
				start = evolution(start, instructions[j]);
			}
			code.push(start);
		}
	}
	var rep  = "";
	for(var p = 0; p < code.length; p++) {
		rep += code[p];
	}
	console.log("The bathroom code is " + rep + ".");
});