// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each word that passes the conditions to be considered "nice", add one to the total. The solution corresponds to the total in the end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n");
	let total = 0;
	for(let i = 0; i < collection.length; i++) {
		let counter = 0,
			repetition = false,
			specialString = false;
		if(collection[i].length > 0) {
			for(let j = 0; j < collection[i].length; j++) {
				if((collection[i][j] == "a") || (collection[i][j] == "e") || (collection[i][j] == "i") || 
					(collection[i][j] == "o") || (collection[i][j] == "u")) { counter++; }
				if((j + 1) != collection[i].length) {
					if(collection[i][j] == collection[i][j + 1]) { repetition = true; }
					if(((collection[i][j] + collection[i][j + 1]) == "ab") || ((collection[i][j] + collection[i][j + 1]) == "cd") || 
						((collection[i][j] + collection[i][j + 1]) == "pq") || ((collection[i][j] + collection[i][j + 1]) == "xy")) { specialString = true; }
				}
			}
		}
		if((counter >= 3) && (repetition == true) && (specialString == false)) { total++; }
	}
	console.log("The number of strings that are nice is " + total + ".");
});