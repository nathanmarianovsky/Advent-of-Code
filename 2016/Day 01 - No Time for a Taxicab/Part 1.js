// Declare the necessary variables
var fs = require("fs"),
	east = 0,
	north = 0,
	direction = "north";

// Given a path such as right or left, the global direction is changed accordingly.
var change_direction = path => {
	if(direction == "north" && path == "R") { direction = "east"; }
	else if(direction == "north" && path == "L") { direction = "west"; }
	else if(direction == "east" && path == "R") { direction = "south"; }
	else if(direction == "east" && path == "L") { direction = "north"; }
	else if(direction == "south" && path == "R") { direction = "west"; }
	else if(direction == "south" && path == "L") { direction = "east"; }
	else if(direction == "west" && path == "R") { direction = "north"; }
	else if(direction == "west" && path == "L") { direction = "south"; }
};

// Read the file and parse. For each instruction calculate the changes in east and north and add at the very end to obtain the answer.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split(", ");
	for(var i = 0; i < container.length; i++) {
		var path = container[i][0],
			steps = parseInt(container[i].split(path)[1]);
		change_direction(path);
		if(direction == "north") { north += steps; }
		else if(direction == "south") { north -= steps; }
		else if(direction == "east") { east += steps; }
		else if(direction == "west") { east -= steps; }
	}
	var sum = north + east;
	console.log("Easter Bunny HQ is " + sum + " blocks away.");
});