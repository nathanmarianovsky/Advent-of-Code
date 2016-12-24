// Declare the necessary variables
var fs = require("fs"),
	restrictions = [];

// Read the file and parse. Collect all of the restrictions into an array and iterate through starting with 0 to return the first integer that is not restricted.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n");
	container.forEach(restriction => {
		if(restriction.length > 0) {
			var arr = restriction.split("-");
			var obj = {
				start: parseInt(arr[0]),
				end: parseInt(arr[1])
			};
			restrictions.push(obj);
		}
	});
	var count = 0;
	while(true) {
		var p = 0;
		for(; p < restrictions.length; p++) {
			if(count >= restrictions[p].start && count <= restrictions[p].end) { break; }
		}
		if(p == restrictions.length) { break; }
		count++;
	}
	console.log("The lowest-valued IP that is not blocked is " + count + ".");
});