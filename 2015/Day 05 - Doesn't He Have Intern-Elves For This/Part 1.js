// Declare the necessary variables
var fs = require("fs"),
	total = 0;

// Read the file and parse. For each word that passes the conditions to be considered "nice", add one to total. The solution corresponds to total in the end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		var counter = 0,
			repetition = false,
			special_string = false;
		if(collection[i].length > 0) {
			for(var j = 0; j < collection[i].length; j++) {
				if((collection[i][j] == "a") || (collection[i][j] == "e") || (collection[i][j] == "i") || 
					(collection[i][j] == "o") || (collection[i][j] == "u")) { counter++; }
				if((j + 1) != collection[i].length) {
					if(collection[i][j] == collection[i][j + 1]) { repetition = true; }
					if(((collection[i][j] + collection[i][j + 1]) == "ab") || ((collection[i][j] + collection[i][j + 1]) == "cd") || 
						((collection[i][j] + collection[i][j + 1]) == "pq") || ((collection[i][j] + collection[i][j + 1]) == "xy")) { special_string = true; }
				}
			}
		}
		if((counter >= 3) && (repetition == true) && (special_string == false)) { total++; }
	}
	console.log("The total is: " + total);
});