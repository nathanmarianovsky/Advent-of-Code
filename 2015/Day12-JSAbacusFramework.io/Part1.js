// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. Literally parse through the whole string, determine the numbers, and add them to the counter. The solution corresponds to the counter.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	let counter = 0;
	for(let i = 0; i < data.length;) {
		let total = 0,
			newStr = "";
		if(data[i] == "-") {
			if(!isNaN(parseInt(data[i + 1]))) {
				for(let p = i + 1; p < data.length; p++) {
					if(!isNaN(parseInt(data[p]))) { 
						newStr += data[p];	
						total++;
					}
					else { break; }
				}
				counter -= parseInt(newStr);
				total++;
			}
		}
		else if(!isNaN(parseInt(data[i]))) {
			for(let p = i; p < data.length; p++) {
				if(!isNaN(parseInt(data[p]))) { 
					newStr += data[p];
					total++;
				}
				else { break; }
			}
			counter += parseInt(newStr);
		}
		if(total > 0) { i += total; }
		else { i++; }
	}
	console.log("The sum of all numbers in the document is " + counter + ".");
});