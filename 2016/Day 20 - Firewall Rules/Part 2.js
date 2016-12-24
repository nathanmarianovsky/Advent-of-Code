// Declare the necessary variables
var fs = require("fs"),
	restrictions = [];

// Read the file and parse. Collect all of the restrictions into an array and iterate through to determine the number of valid addresses.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		count = 0,
		previous = -1,
		max = 0,
		allowed = "";
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
	restrictions.sort((lhs, rhs) => { return lhs.start - rhs.start; });
	for(var i = 0; i < restrictions.length; i++) {
	  var max = Math.max(0, restrictions[i].start - previous - 1);
	  count += max;
	  if(allowed === undefined && max) { allowed = previous + 1; }
	  previous = Math.max(previous, restrictions[i].end);
	}
	count += Math.max(0, 4294967295 - previous);
	console.log("The number of allowed IP's by the blacklist is " + count + ".");
});













