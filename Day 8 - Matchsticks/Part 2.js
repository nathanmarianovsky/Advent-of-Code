var fs = require("fs");

var scan_string = function(param, total) {
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

fs.readFile("input.txt", "utf8", function(err, data) {
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