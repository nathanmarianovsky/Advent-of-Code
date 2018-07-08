// Declare the necessary variables
var fs = require("fs");

var result = (point1, point2, point3) => {
	if(point1 == "^" && point2 == "^" && point3 == ".") { return "^"; }
	else if(point1 == "." && point2 == "^" && point3 == "^") { return "^"; }
	else if(point1 == "^" && point2 == "." && point3 == ".") { return "^"; }
	else if(point1 == "." && point2 == "." && point3 == "^") { return "^"; }
	else { return "."; }
};

// Read the file and parse. Iterate through and determine each new row based on the rules and return how many end up safe.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	data = data.split("\n")[0];
	var collection = data.split(""),
		rows = [];
	rows.push(collection);
	while(rows.length != 40) {
		var last = rows[rows.length-1],
			new_row = [];
		for(var i = 0; i < last.length; i++) {
			if(i == 0) {
				new_row.push(result(".", last[i], last[i+1]));
			}
			else if(i == last.length - 1) {
				new_row.push(result(last[i-1], last[i], "."));
			}
			else {
				new_row.push(result(last[i-1], last[i], last[i+1]));
			}
		}
		rows.push(new_row);
	}
	var count = 0;
	rows.forEach(row => {
		row.forEach(iter => {
			if(iter == ".") { count++; }
		});
	});
	console.log("The number of safe tiles with 40 rows is " + count + ".");
});