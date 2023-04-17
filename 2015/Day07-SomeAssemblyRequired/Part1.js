// Declare the necessary variables.
const fs = require("fs");

// Move all wires that have a value to current and remove it from connections.
var currentVar = (connections, current) => {
	for(let i = 0; i < connections.length; i++) {
		if(connections[i]["value"] !== "" && !isNaN(connections[i]["value"])) {
			current.push(connections[i]);
			connections.splice(i, 1);
		}
	}
	return current;
};

// Given the values in current, if enough information is available, a wire in connections obtains a value.
var update = (connections, current) => {
	for(let i = 0; i < connections.length; i++) {
		for(let j = 0; j < current.length; j++) {
			if(connections[i]["left"] == current[j]["wire"]) {
				connections[i]["left"] = current[j]["value"];
			}
			else if(connections[i]["right"] == current[j]["wire"]) {
				connections[i]["right"] = current[j]["value"];
			}
			else if((isNaN(connections[i]["value"])) && (connections[i]["value"] == current[j]["wire"])) {
				connections[i]["value"] = current[j]["value"];
			}
		}
		if((connections[i]["operation"] == "NOT") && (!isNaN(connections[i]["right"])) && (connections[i]["value"] === "")) {
			connections[i]["value"] = ~ connections[i]["right"];
		}
		else if(!isNaN(connections[i]["left"]) && !isNaN(connections[i]["right"])) {
			if(connections[i]["operation"] == "AND") { connections[i]["value"] = connections[i]["left"] & connections[i]["right"]; }
			else if(connections[i]["operation"] == "OR") { connections[i]["value"] = connections[i]["left"] | connections[i]["right"]; }
			else if(connections[i]["operation"] == "RSHIFT") { connections[i]["value"] = connections[i]["left"] >> connections[i]["right"]; }
			else if(connections[i]["operation"] == "LSHIFT") { connections[i]["value"] = connections[i]["left"] << connections[i]["right"]; }
		}
	}
	return connections;
};

// Read the file and parse. For each line create an object that contains the necessary information, and call on update and currentVar to update the connections so that the final values are attained. The solution corresponds to the value of the wire 'a'.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n");
	let holder = [];
	for(let i = 0; i < collection.length; i++) {
		let current = collection[i].split(" ");
		current[current.length - 1] = current[current.length - 1].split("\r")[0];
		if(current.length == 5) {
			if(isNaN(current[0]) && isNaN(current[2])) {
				var obj = {
					"wire": current[4],
					"value": "",
					"left": current[0],
					"right": current[2],
					"operation": current[1]
				};
			}
			else if(isNaN(current[0])) {
				var obj = {
					"wire": current[4],
					"value": "",
					"left": current[0],
					"right": parseInt(current[2]),
					"operation": current[1]
				};
			}
			else if(isNaN(current[2])) {
				var obj = {
					"wire": current[4],
					"value": "",
					"left": parseInt(current[0]),
					"right": current[2],
					"operation": current[1]
				};
			}
			else {
				if(current[1] == "AND") { var value = parseInt(current[0]) & parseInt(current[2]); }
				else if(current[1] == "OR") { var value = parseInt(current[0]) | parseInt(current[2]); }
				else if(current[1] == "RSHIFT") { var value = parseInt(current[0]) >> parseInt(current[2]); }
				else if(current[1] == "LSHIFT") { var value = parseInt(current[0]) << parseInt(current[2]); }
				var obj = {
					"wire": current[4],
					"value": value,
					"left": "",
					"right": "",
					"operation": ""
				};
			}
			holder.push(obj);
		}
		else if(current.length == 4) {
			if(current[0] == "NOT") {
				if(isNaN(current[1])) {
					var obj = {
						"wire": current[3],
						"value": "",
						"right": current[1],
						"operation": current[0]
					};
				}
				else {
					var obj = {
						"wire": current[3],
						"value": ~ parseInt(current[1]),
						"left": "",
						"right": "",
						"operation": ""
					};
				}
			}
			holder.push(obj);
		}
		else if(current.length == 3) {
			if(isNaN(current[0])) {
				var obj = {
					"wire": current[2],
					"value": current[0],
					"left": "",
					"right": "",
					"operation": ""
				};
			}
			else {
				var obj = {
					"wire": current[2],
					"value": parseInt(current[0]),
					"left": "",
					"right": "",
					"operation": ""
				};
			}
			holder.push(obj);
		}
	}
	let arr = [];
	while(holder.length > 0) {
		arr = currentVar(holder, arr);
		holder = update(holder, arr);
	}
	for(let key in arr) {
		if(arr[key]["wire"] == "a") { console.log("The signal provided to wire 'a' is " + arr[key]["value"] + "."); }
	}
});