// Declare the necessary variables
var fs = require("fs");

// The literal and encoded totals are changed according to the given string.
var scan_string = (param, total) => {
	total["encoded"] += 2;
	for(var j = 0; j < param.length; j++) {
		if((param[j] == "\"") || (param[j] == "\\")) {
			total["encoded"] += 2;
		}
		else {
			total["encoded"] += 1;
		}
		total["literal"] += 1;
	}
};

// Read the file and parse. For each string determine the literal and encoded lengths and add it to the total. The solution corresponds to the total encoded length minus literal length.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var total = {
		"literal": 0,
		"encoded": 0
	};
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			scan_string(collection[i], total);
		}
	}
	console.log("The difference is: " + (total["encoded"] - total["literal"]));
});