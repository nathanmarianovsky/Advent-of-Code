// Declare the necessary variables
var fs = require("fs"),
	grid = [],
	origin = {
		x: 0,
		y: 0
	};

// Read the file and parse. Read the commands line by line and change the grid accordingly. Return the number of points with status = "on" at the end.
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
	var filtered = grid.filter(obj => {
		return obj.status == "on";
	});
	console.log("The number of pixels that are lit is " + filtered.length + ".");
});