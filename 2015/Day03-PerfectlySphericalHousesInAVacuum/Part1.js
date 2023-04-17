// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each direction check to see if the point has already been visited before. If not, add it. The solution corresponds to the number of unique points visited.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const holderX = [],
		holderY = [];
	let currentX = 0,
		currentY = 0;
	holderX.push(currentX);
	holderY.push(currentY);
	for(let i = 0; i < data.length; i++) {
		if(data[i] == "^") { currentY++; }
		else if(data[i] == "v") { currentY--; }
		else if(data[i] == ">") { currentX++; }
		else if(data[i] == "<") { currentX--; }
		let j = 0;
		for(; j < holderX.length; j++) {
			if((holderX[j] == currentX) && (holderY[j] == currentY)) { break; }
		}
		if(j == holderX.length) {
			holderX.push(currentX);
			holderY.push(currentY);
		}
	}
	console.log("The amount of houses that receive at least one present is " + holderX.length + ".");
});