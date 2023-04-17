// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each line execute the command for the points of interest by changing the predefined grid. The solution corresponds to the number of objects in the grid with state = "on".
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
				"state": "off"
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
							holder[j]["state"] = "on";
						}
						else if(set[1] == "off") {
							holder[j]["state"] = "off";
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
						if(holder[j]["state"] == "on") {
							holder[j]["state"] = "off";
						}
						else if(holder[j]["state"] == "off") {
							holder[j]["state"] = "on";
						}
					}
				}
			}
		}
	}
	for(let k = 0; k < holder.length; k++) {
		if(holder[k]["state"] == "on") { total++; }
	}
	console.log("The number of lights that are on is " + total + ".");
});