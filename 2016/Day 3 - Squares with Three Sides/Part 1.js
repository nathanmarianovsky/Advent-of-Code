// Declare the necessary variables
var fs = require("fs"),
	counter = 0;

// Checks whether a triplet of numbers form a valid triangle.
var check = (side1, side2, side3) => {
	var condition = 0;
	(side1 + side2 > side3) && (side2 + side3 > side1) && (side1 + side3 > side2) ? condition = 1 : condition = 0;
	return condition;
};

// Read the file and parse. For each triplet of numbers check whether they form a valid triangle and keep count of the ones that do.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n");
	for(var i = 0; i < container.length; i++) {
		var sides = container[i].split("  ");
		sides = sides.filter(Number);
		sides = sides.map(current => parseInt(current));
		console.log(sides);
		if(sides.length > 0) {
			if(check(sides[0], sides[1], sides[2])) { counter++; }
		}
	}
	console.log("The number of valid triangles is " + counter + ".");
});