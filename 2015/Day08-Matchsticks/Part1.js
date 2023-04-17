// Declare the necessary variables.
const fs = require("fs");

// The literal and memory totals are changed according to the given string.
var scanString = (param, total) => {
	param = param.slice(1, param.length - 1);
	total["literal"] += 2;
	for(let j = 0; j < param.length; j++) {
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

// Read the file and parse. For each string determine the literal and memory lengths and add it to the total. The solution corresponds to the difference between the total literal length and memory length.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const total = { "literal": 0, "memory": 0 },
		collection = data.split("\n");
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			scanString(collection[i], total);
		}
	}
	console.log("The difference between the number of characters of code for the string literals and the number of characters in memory for the values of the strings is " + (total["literal"] - total["memory"]) + ".");
});