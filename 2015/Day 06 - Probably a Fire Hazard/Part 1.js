// Declare the necessary variables
var fs = require("fs"),
	total = 0,
	holder = [];

// Preallocate the grid for the problem.
for(var i = 0; i < 1000; i++) {
	for(var j = 0; j < 1000; j++) {
		var obj = {
			"x": i,
			"y": j,
			"state": "off"
		};
		holder.push(obj);
	}
}

// Read the file and parse. For each line execute the command for the points of interest by changing the predefined grid. The solution corresponds to the number of objects in the grid with state = "on".
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		var set = collection[i].split(" ");
		if(set.length > 0) {
			if(set[0] == "turn") {
				var start_array = set[2].split(",");
				var end_array = set[4].split(",");
				var start_x = start_array[0],
					start_y = start_array[1],
					end_x = end_array[0],
					end_y = end_array[1];
				for(var j = 0; j < holder.length; j++) {
					if((holder[j]["x"] >= start_x) && (holder[j]["x"] <= end_x) && (holder[j]["y"] >= start_y) && (holder[j]["y"] <= end_y)) {
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
				var start_array = set[1].split(",");
				var end_array = set[3].split(",");
				var start_x = start_array[0],
					start_y = start_array[1],
					end_x = end_array[0],
					end_y = end_array[1];
				for(var j = 0; j < holder.length; j++) {
					if((holder[j]["x"] >= start_x) && (holder[j]["x"] <= end_x) && (holder[j]["y"] >= start_y) && (holder[j]["y"] <= end_y)) {
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
	for(var k = 0; k < holder.length; k++) {
		if(holder[k]["state"] == "on") { total++; }
	}
	console.log("The total is: " + total);
});