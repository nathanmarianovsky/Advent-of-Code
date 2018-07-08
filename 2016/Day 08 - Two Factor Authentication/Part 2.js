// Declare the necessary variables
var fs = require("fs"),
	grid = [],
	origin = {
		x: 0,
		y: 0
	};

// Read the file and parse. Read the commands line by line and change the grid accordingly. At the end print out the grid.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	for(var i = 0; i < 50; i++) {
		for(var j = 0; j < 6; j++) {
			var obj = {
				x: i,
				y: j,
				status: "off"
			};
			grid.push(obj);
		}
	}
	var container = data.split("\n").slice(0, data.split("\n").length - 1);
	container.forEach(command => {
		var holder = command.split(" ");
		if(holder[0] == "rect") {
			var rect = holder[1].split("x");
			grid.forEach(point => {
				if(point.x < parseInt(rect[0]) + origin.x && origin.x <= point.x && point.y < parseInt(rect[1]) + origin.y && origin.y <= point.y) { point.status = "on"; }
			});
		}
		else {
			if(holder[1] == "row") {
				var row_num = parseInt((holder[2].split("="))[1]);
				grid.forEach(point => {
					if(point.y == row_num) {
						point.x += parseInt(holder[4]);
						origin.x = (origin.x + parseInt(holder[4])) % 50;
						if(point.x > 49) { point.x = point.x % 50; }
					}
				});
			}
			else if(holder[1] == "column") {
				var col_num = parseInt((holder[2].split("="))[1]);
				grid.forEach(point => {
					if(point.x == col_num) {
						point.y += parseInt(holder[4]);
						origin.y = (origin.y + parseInt(holder[4])) % 6;
						if(point.y > 5) { point.y = point.y % 6; }
					}
				});
			}
		}
	});
	grid.sort((lhs, rhs) => {
		if(lhs.y > rhs.y) { return 1; }
		else if(lhs.y < rhs.y) { return -1; }
		else {
			if(lhs.x > rhs.x) { return 1; }
			else { return -1; }
		}
	});
	var arr = [];
	for(var p = 0; p < grid.length; p += 50) {
		var str = "";
		for(var k = p; k < p + 50; k++) {
			grid[k].status == "on" ? str += "#" : str += " ";
		}
		arr.push(str);
	}
	console.log("The code displayed on the screen is:\n");
	arr.forEach(iter => console.log(iter));
});