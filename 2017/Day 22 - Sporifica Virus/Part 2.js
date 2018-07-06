// Declare the necessary variables
var fs = require("fs");

// Read and parse the grid. Start at the middle and keep moving, modifying the grid as needed, and return the number of nodes that were infected.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var grid = data.split("\n").slice(0, data.split("\n").length - 1).map(line => line.split("")),
		current = {x: Math.floor(grid.length / 2), y: Math.floor(grid.length / 2), dir: "u"},
		count = 0;
	for(var i = 0; i < 10000000; i++) {
		if(grid[current.y][current.x] == "#") {
			if(current.dir == "u") { current.dir = "r"; }
			else if(current.dir == "l") { current.dir = "u"; }
			else if(current.dir == "d") { current.dir = "l"; }
			else if(current.dir == "r") { current.dir = "d"; }
			grid[current.y][current.x] = "F";
		}
		else if(grid[current.y][current.x] == ".") {
			if(current.dir == "u") { current.dir = "l"; }
			else if(current.dir == "l") { current.dir = "d"; }
			else if(current.dir == "d") { current.dir = "r"; }
			else if(current.dir == "r") { current.dir = "u"; }
			grid[current.y][current.x] = "W";
		}
		else if(grid[current.y][current.x] == "W") {
			grid[current.y][current.x] = "#";
			count++;
		}
		else if(grid[current.y][current.x] == "F") {
			if(current.dir == "u") { current.dir = "d"; }
			else if(current.dir == "l") { current.dir = "r"; }
			else if(current.dir == "d") { current.dir = "u"; }
			else if(current.dir == "r") { current.dir = "l"; }
			grid[current.y][current.x] = ".";
		}
		if(current.dir == "u") { current.y -= 1; }
		else if(current.dir == "d") { current.y += 1; }
		else if(current.dir == "r") { current.x += 1; }
		else if(current.dir == "l") { current.x -= 1; }
		if(current.y < 0) { 
			grid.splice(0, 0, Array(grid[0].length).fill("."));
			current.y = 0;
		}
		if(current.y == grid.length) {
			grid.splice(grid.length, 0, Array(grid[0].length).fill("."));
		}
		if(current.x < 0) {
			grid.forEach(line => line.splice(0, 0, "."));
			current.x = 0;
		}
		if(current.x == grid.length) {
			grid.forEach(line => line.splice(grid[0].length, 0, "."));
		}
	}
	console.log("The number of bursts that cause a node to become infected is " + count + ".");
});