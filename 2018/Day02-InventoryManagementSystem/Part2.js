// Declare the necessary variables
const fs = require("fs");

// Read the file and parse. Iterate through the strings until a pair with a single character difference is found. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const container = data.split("\n").map(elem => elem.split(""));
	let counter = 0,
		place = 0,
		index = 0;
	container.pop();
	for(let i = 0; i < container.length; i++) {
		let j = i + 1;
		for(; j < container.length; j++) {
			counter = 0;
			index = 0;
			for(let k = 0; k < container[i].length; k++) {
				if(container[i][k] != container[j][k]) {
					counter++;
					index = k;
				}
			}
			if(counter == 1) {
				place = i;
				break;
			}
		}
		if(j < container.length) { break; }
	}
	container[place].splice(index, 1);
	console.log("The resulting common letters between the two correct IDs are '" + container[place].join("") + "'.");
});