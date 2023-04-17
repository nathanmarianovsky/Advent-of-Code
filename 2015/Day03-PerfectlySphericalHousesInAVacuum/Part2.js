// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each direction check to see if the point has already been visited before by one of the santas. If not, add it. The solution corresponds to the number of unique points visited.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const holderX = [],
		holderY = [];
	let currentX1 = 0,
		currentX2 = 0,
		currentY1 = 0,
		currentY2 = 0;
	holderX.push(currentX1);
	holderY.push(currentY1);
	for(let i = 0; i < data.length; i += 2) {
		if(data[i] == "^") { currentY1++; }
		else if(data[i] == "v") { currentY1--; }
		else if(data[i] == ">") { currentX1++; }
		else if(data[i] == "<") { currentX1--; }
		if(data[i + 1] == "^") { currentY2++; }
		else if(data[i + 1] == "v") { currentY2--; }
		else if(data[i + 1] == ">") { currentX2++; }
		else if(data[i + 1] == "<") { currentX2--; }
		let j = 0;
		for(; j < holderX.length; j++) {
			if((holderX[j] == currentX1) && (holderY[j] == currentY1)) { break; }
		}
		if(j == holderX.length) {
			holderX.push(currentX1);
			holderY.push(currentY1);
		}
		let k = 0;
		for(; k < holderX.length; k++) {
			if((holderX[k] == currentX2) && (holderY[k] == currentY2)) { break; }
		}
		if(k == holderX.length) {
			holderX.push(currentX2);
			holderY.push(currentY2);
		}
	}
	console.log("The amount of houses that receive at least one present this year is " + holderX.length + ".");
});