// Declare the necessary variables.
const fs = require("fs");

// The literal and encoded totals are changed according to the given string.
var scanString = (param, total) => {
	total["encoded"] += 2;
	for(let j = 0; j < param.length; j++) {
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
	const total = { "literal": 0, "encoded": 0 },
		collection = data.split("\n");
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			scanString(collection[i], total);
		}
	}
	console.log("The difference between the number of characters to represent the newly encoded strings and the number of characters of code in each original string literal is " + (total["encoded"] - total["literal"]) + ".");
});