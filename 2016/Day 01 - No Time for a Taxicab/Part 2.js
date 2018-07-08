// Declare the necessary variables
var fs = require("fs"),
	east = 0,
	north = 0,
	direction = "north",
	grid = [[0,0]];

// Given a pair of coordinates in the plane, the function checks whether it was visited or not yet.
var check = (x,y) => {
	var k = 0;
	for(; k < grid.length; k++) {
		if(grid[k][0] == x && grid[k][1] == y) { break; }
	}
	if(k == grid.length) { return "missing"; }
	else{ return "present"; }
};

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

// Read the file and parse. For each instruction calculate the changes in east and north, check if the point has been visited before, and return the first such point.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split(", "),
		presence = "missing";
	for(var i = 0; i < container.length; i++) {
		var path = container[i][0],
			steps = parseInt(container[i].split(path)[1]);
		change_direction(path);
		for(var j = 1; j <= steps; j++) {
			if(direction == "north") { north += 1; }
			else if(direction == "south") { north -= 1; }
			else if(direction == "east") { east += 1; }
			else if(direction == "west") { east -= 1; }
			presence = check(east, north);
			if(presence == "missing") { grid.push([east,north]); }
			else { break; } 
		}
		if(presence == "present") { break; }
	}
	var sum = Math.abs(north) + Math.abs(east);
	console.log("Easter Bunny HQ is " + sum + " blocks away.");
});