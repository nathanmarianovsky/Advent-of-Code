// Declare the necessary variables
var fs = require("fs");

// Given the next step and the list of current steps already taken, this returns the new reduced list of steps.
var check = (value, steps) => {
	if(value == "e" && steps.indexOf("w") != -1) { steps.splice(steps.indexOf("w"), 1); }
	else if(value == "w" && steps.indexOf("e") != -1) { steps.splice(steps.indexOf("e"), 1); }
	else if(value == "n" && steps.indexOf("s") != -1) { steps.splice(steps.indexOf("s"), 1); }
	else if(value == "s" && steps.indexOf("n") != -1) { steps.splice(steps.indexOf("n"), 1); }
	else if(value == "ne" && steps.indexOf("sw") != -1) { steps.splice(steps.indexOf("sw"), 1); }
	else if(value == "sw" && steps.indexOf("ne") != -1) { steps.splice(steps.indexOf("ne"), 1); }
	else if(value == "nw" && steps.indexOf("se") != -1) { steps.splice(steps.indexOf("se"), 1); }
	else if(value == "se" && steps.indexOf("nw") != -1) { steps.splice(steps.indexOf("nw"), 1); }
	else if(value == "e" && steps.indexOf("nw") != -1) { steps[steps.indexOf("nw")] = "ne"; }
	else if(value == "nw" && steps.indexOf("e") != -1) { steps[steps.indexOf("e")] = "ne"; }
	else if(value == "e" && steps.indexOf("sw") != -1) { steps[steps.indexOf("sw")] = "se"; }
	else if(value == "sw" && steps.indexOf("e") != -1) { steps[steps.indexOf("e")] = "se"; }
	else if(value == "n" && steps.indexOf("sw") != -1) { steps[steps.indexOf("sw")] = "nw"; }
	else if(value == "sw" && steps.indexOf("n") != -1) { steps[steps.indexOf("n")] = "nw"; }
	else if(value == "n" && steps.indexOf("se") != -1) { steps[steps.indexOf("se")] = "ne"; }
	else if(value == "se" && steps.indexOf("n") != -1) { steps[steps.indexOf("n")] = "ne"; }
	else if(value == "w" && steps.indexOf("se") != -1) { steps[steps.indexOf("se")] = "sw"; }
	else if(value == "se" && steps.indexOf("w") != -1) { steps[steps.indexOf("w")] = "sw"; }
	else if(value == "w" && steps.indexOf("ne") != -1) { steps[steps.indexOf("ne")] = "nw"; }
	else if(value == "ne" && steps.indexOf("w") != -1) { steps[steps.indexOf("w")] = "nw"; }
	else if(value == "s" && steps.indexOf("ne") != -1) { steps[steps.indexOf("ne")] = "se"; }
	else if(value == "ne" && steps.indexOf("s") != -1) { steps[steps.indexOf("s")] = "se"; }
	else if(value == "s" && steps.indexOf("nw") != -1) { steps[steps.indexOf("nw")] = "sw"; }
	else if(value == "nw" && steps.indexOf("s") != -1) { steps[steps.indexOf("s")] = "sw"; }
	else if(value == "se" && steps.indexOf("sw") != -1) { steps[steps.indexOf("sw")] = "s"; }
	else if(value == "sw" && steps.indexOf("se") != -1) { steps[steps.indexOf("se")] = "s"; }
	else if(value == "ne" && steps.indexOf("se") != -1) { steps[steps.indexOf("se")] = "e"; }
	else if(value == "se" && steps.indexOf("ne") != -1) { steps[steps.indexOf("ne")] = "e"; }
	else if(value == "ne" && steps.indexOf("nw") != -1) { steps[steps.indexOf("nw")] = "n"; }
	else if(value == "nw" && steps.indexOf("ne") != -1) { steps[steps.indexOf("ne")] = "n"; }
	else if(value == "sw" && steps.indexOf("nw") != -1) { steps[steps.indexOf("nw")] = "w"; }
	else if(value == "nw" && steps.indexOf("sw") != -1) { steps[steps.indexOf("sw")] = "w"; }
	else { steps.push(value); }
	return steps;
};

// Read the file and parse. Iterate through the given steps and reduce the number of steps required while walking. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var input = data.split("\n")[0].split(","),
		steps = [];
	steps[0] = input[0];
	for(var i = 1; i < input.length; i++) { steps = check(input[i], steps); }
	console.log("The fewest number of steps required to reach the child process is " + steps.length + ".");
});