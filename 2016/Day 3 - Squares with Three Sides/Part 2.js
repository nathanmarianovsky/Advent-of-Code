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
	for(var i = 0; i < container.length; i += 3) {
		if(container[i] != "") {
			var sides1 = container[i].split("  "),
				sides2 = container[i+1].split("  "),
				sides3 = container[i+2].split("  ");
			sides1 = sides1.filter(Number);
			sides2 = sides2.filter(Number);
			sides3 = sides3.filter(Number);
			sides1 = sides1.map(current => parseInt(current));
			sides2 = sides2.map(current => parseInt(current));
			sides3 = sides3.map(current => parseInt(current));
			arr1 = [sides1[0], sides2[0], sides3[0]];
			arr2 = [sides1[1], sides2[1], sides3[1]];
			arr3 = [sides1[2], sides2[2], sides3[2]];
			if(arr1.length > 0) {
				if(check(arr1[0], arr1[1], arr1[2])) { counter++; }
			}
			if(arr2.length > 0) {
				if(check(arr2[0], arr2[1], arr2[2])) { counter++; }
			}
			if(arr3.length > 0) {
				if(check(arr3[0], arr3[1], arr3[2])) { counter++; }
			}
		}
	}
	console.log("The number of valid triangles is " + counter + ".");
});