// Declare the necessary variables
var fs = require("fs");

// Returns the next direction the packet should follow given we know the direction where we came from.
var direction = (layout, pos, arrival) => {
	if(pos.x + 1 < layout[0].length && layout[pos.y][pos.x + 1] != " " && !(pos.y == arrival.y && pos.x + 1 == arrival.x)) { return "+x"; }
	else if(0 <= pos.y - 1 && layout[pos.y - 1][pos.x] != " " && !(pos.y - 1 == arrival.y && pos.x == arrival.x)) { return "+y"; }
	else if(0 <= pos.x - 1 && layout[pos.y][pos.x - 1] != " " && !(pos.y == arrival.y && pos.x - 1 == arrival.x)) { return "-x"; }
	else if(pos.y + 1 < layout.length && layout[pos.y + 1][pos.x] != " " && !(pos.y + 1 == arrival.y && pos.x == arrival.x)) { return "-y"; }
	else { return "end"; }
};

// Organize the grid from the given input. Follow the path and pickup the letters along the way.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var grid = (data.split("\n").slice(0, data.split("\n").length - 1)).map(elem => elem.split("")),
		previous = {
			x: grid[0].findIndex(elem => elem == "|"),
			y: 0 
		},
		position = {
			x: grid[0].findIndex(elem => elem == "|"),
			y: 0
		},
		str = "";
	while(grid[position.y][position.x] != " " && direction(grid, position, previous) != "end") {
		var dir = direction(grid, position, previous);
		if(dir == "+x") {
			position.x += 1;
			while(grid[position.y][position.x] != "+" && grid[position.y][position.x] != " ") {
				if(grid[position.y][position.x] != "-" && grid[position.y][position.x] != "|") { str += grid[position.y][position.x]; }
				position.x += 1;
			}
			previous.x = position.x - 1;
			previous.y = position.y;
		}
		else if(dir == "-x") {
			position.x -= 1;
			while(grid[position.y][position.x] != "+" && grid[position.y][position.x] != " ") {
				if(grid[position.y][position.x] != "-" && grid[position.y][position.x] != "|") { str += grid[position.y][position.x]; }
				position.x -= 1;
			}
			previous.x = position.x + 1;
			previous.y = position.y;
		}
		else if(dir == "+y") {
			position.y -= 1;
			while(grid[position.y][position.x] != "+" && grid[position.y][position.x] != " ") {
				if(grid[position.y][position.x] != "-" && grid[position.y][position.x] != "|") { str += grid[position.y][position.x]; }
				position.y -= 1;
			}
			previous.x = position.x;
			previous.y = position.y + 1;
		}
		else if(dir == "-y") {
			position.y += 1;
			while(grid[position.y][position.x] != "+" && grid[position.y][position.x] != " ") {
				if(grid[position.y][position.x] != "-" && grid[position.y][position.x] != "|") { str += grid[position.y][position.x]; }
				position.y += 1;
			}
			previous.x = position.x;
			previous.y = position.y - 1;
		}
	}
	console.log("The letters the packet sees as it follows the path are " + str + ".");
});