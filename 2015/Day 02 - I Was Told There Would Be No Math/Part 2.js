// Declare the necessary variables
var fs = require("fs"),
	total = 0;

// Read the file and parse. For each set of dimensions calculate the needed length and add it to the total. The solution corresponds to the total in the end.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		var set = collection[i].split("x");
		if(set.length == 3) {
			for(var j = 0; j < set.length; j++) {
				set[j] = parseInt(set[j]);
			}
			set.sort(function(left, right) {
				if(left > right) { return true; }
				else { return false; }
			});
			total += (2 * set[0]) + (2 * set[1]) + (set[0] * set[1] * set[2]);
		}
	}
	console.log("The total is: " + total);
});