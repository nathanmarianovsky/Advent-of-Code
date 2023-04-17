// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each word that passes the conditions to be considered "nice", add one to total. The solution corresponds to total in the end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n");
	let total = 0;
	for(let i = 0; i < collection.length; i++) {
		let pair = false,
			repetition = false,
			holder = [];
		if(collection[i].length > 0) {
			for(let j = 0; j < collection[i].length; j++) {
				if((j + 2) != collection[i].length) {
					let k = 0;
					if((collection[i][j] == collection[i][j + 2])) { repetition = true; }
					if((collection[i][j] != collection[i][j + 1]) || (collection[i][j + 1] != collection[i][j + 2]) || (collection[i][j] != collection[i][j + 2])) {
						for(; k < holder.length; k++) {
							if(collection[i][j] + collection[i][j + 1] == holder[k]) { pair = true; }
						}
						if(k == holder.length) {
							holder.push(collection[i][j] + collection[i][j + 1]);
						}
					}
					else {
						for(; k < holder.length; k++) {
							if(collection[i][j + 1] + collection[i][j + 2] == holder[k]) { pair = true; }
						}
						if(k == holder.length) {
							holder.push(collection[i][j + 1] + collection[i][j + 2]);
						}
						j++;
					}
				}
				else if((j + 1) != collection[i].length) {
					let k = 0;
					for(; k < holder.length; k++) {
						if(collection[i][j] + collection[i][j + 1] == holder[k]) { pair = true; }
					}
					if(k == holder.length) {
						holder.push(collection[i][j] + collection[i][j + 1]);
					}
				}
			}
		}
		if((repetition == true) && (pair == true)) { total++; }
	}
	console.log("The number of strings that are nice under the new rules is " + total + ".");
});