// Declare the necessary variables
var fs = require("fs");

// The literal and memory totals are changed according to the given string.
var scan_string = function(param, total) {
	param = param.slice(1, param.length - 1);
	total["literal"] += 2;
	for(var j = 0; j < param.length; j++) {
		if(param[j] == "\\") {
			if(j + 1 != param.length) {
				if((param[j + 1] == "\\") || (param[j + 1] == "\"")) {
					total["literal"] += 2;
					total["memory"] += 1;
					j += 1;
				}
				else if(param[j + 1] == "x") {
					total["literal"] += 4;
					total["memory"] += 1;
					j += 3;
				}
			}
		}
		else {
			total["literal"] += 1;
			total["memory"] += 1;
		}
	}
};

// Read the file and parse. For each string determine the literal and memory lengths and add it to the total. The solution corresponds to the total literal length minus memory length.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var total = {
		"literal": 0,
		"memory": 0
	};
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			scan_string(collection[i], total);
		}
	}
	console.log("The difference is: " + (total["literal"] - total["memory"]));
});