// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each line execute the command for the points of interest by changing the predefined grid. The solution corresponds to totaling the "state" property of all objects in the grid.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n"),
		holder = [];
	let	total = 0;
	// Preallocate the grid for the problem.
	for(let i = 0; i < 1000; i++) {
		for(let j = 0; j < 1000; j++) {
			let obj = {
				"x": i,
				"y": j,
				"state": 0
			};
			holder.push(obj);
		}
	}
	for(let i = 0; i < collection.length; i++) {
		let set = collection[i].split(" ");
		if(set.length > 0) {
			if(set[0] == "turn") {
				let startArray = set[2].split(","),
					endArray = set[4].split(","),
					startX = startArray[0],
					startY = startArray[1],
					endX = endArray[0],
					endY = endArray[1];
				for(let j = 0; j < holder.length; j++) {
					if((holder[j]["x"] >= startX) && (holder[j]["x"] <= endX) && (holder[j]["y"] >= startY) && (holder[j]["y"] <= endY)) {
						if(set[1] == "on") {
							holder[j]["state"] += 1;
						}
						else if(set[1] == "off") {
							if(holder[j]["state"] > 0) {
								holder[j]["state"] -= 1;
							}
						}
					}
				}
			}
			else if(set[0] == "toggle") {
				let startArray = set[1].split(","),
					endArray = set[3].split(","),
					startX = startArray[0],
					startY = startArray[1],
					endX = endArray[0],
					endY = endArray[1];
				for(let j = 0; j < holder.length; j++) {
					if((holder[j]["x"] >= startX) && (holder[j]["x"] <= endX) && (holder[j]["y"] >= startY) && (holder[j]["y"] <= endY)) {
						holder[j]["state"] += 2;
					}
				}
			}
		}
	}
	for(let k = 0; k < holder.length; k++) {
		total += holder[k]["state"];
	}
	console.log("The total brightness of all the lights combined after following Santa's instructions is " + total + ".");
});