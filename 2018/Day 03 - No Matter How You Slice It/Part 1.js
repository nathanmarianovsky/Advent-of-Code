// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Compute the grid of points, record the claims, and count the number of points being claimed by more than one rectangle.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var	container = data.split("\n").map(elem => elem.split(" ")),
		points = [],
		count = 0,
		index = 0;
	container.pop();
	container.forEach(iter => {
		iter.splice(1, 1);
		iter[0] = parseInt(iter[0].slice(1));
		iter[1] = iter[1].slice(0, -1).split(",").map(elem => parseInt(elem));
		iter[2] = iter[2].split("x").map(elem => parseInt(elem));
		for(var u = iter[1][0]; u < iter[1][0] + iter[2][0]; u++) {
			for(var v = iter[1][1]; v < iter[1][1] + iter[2][1]; v++) {
				index = 0;
				for(; index < points.length; index++) {
					if(points[index].x == u && points[index].y == v) {
						points[index].claims++;
						break;
					}
				}
				if(index == points.length) {
					points.push({x: u, y: v, claims: 1})
				}
			}
		}
	});
	points.forEach(point => {
		if(point.claims != 1) { count++; }
	});
	console.log("The number of square inches of fabric with two or more claims is " + count + ".");
});