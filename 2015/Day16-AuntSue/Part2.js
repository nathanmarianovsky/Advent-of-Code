// Declare the necessary variables.
const fs = require("fs");

// Count the number of matches some Aunt Sue has against the ideal one.
var check = (obj, idealSue) => {
	for(let key in idealSue) {
		if((key == "children") || (key == "samoyeds") || (key == "akitas") || (key == "vizslas") || (key == "cars") || (key == "perfumes")) {
			if(((obj["firstPropName"] == key) && (obj["firstPropVal"] == idealSue[key])) || 
				((obj["secondPropName"] == key) && (obj["secondPropVal"] == idealSue[key])) || 
				((obj["thirdPropName"] == key) && (obj["thirdPropVal"] == idealSue[key]))) { 
				obj["matches"]++; 
			}
		}
		else {
			if((key == "cats") || (key == "trees")) {
				if(((obj["firstPropName"] == key) && (obj["firstPropVal"] > idealSue[key])) || 
					((obj["secondPropName"] == key) && (obj["secondPropVal"] > idealSue[key])) || 
					((obj["thirdPropName"] == key) && (obj["thirdPropVal"] > idealSue[key]))) { 
					obj["matches"]++; 
				}
			}
			else if((key == "pomeranians") || (key == "goldfish")) {
				if(((obj["firstPropName"] == key) && (obj["firstPropVal"] < idealSue[key])) || 
					((obj["secondPropName"] == key) && (obj["secondPropVal"] < idealSue[key])) || 
					((obj["thirdPropName"] == key) && (obj["thirdPropVal"] < idealSue[key]))) { 
					obj["matches"]++; 
				}
			}
		}
	}
	return obj;
};

// Read the file and parse. Create an array containing all of the Aunt Sues and compare them all to the ideal one. The solution corresponds to the number of Aunt Sue with the most matches. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const holder = [],
		collection = data.split("\n"),
		ideal = { "children": 3, "cats": 7, "samoyeds": 2, "pomeranians": 3, "akitas": 0, "vizslas": 0, "goldfish": 5, "trees": 3, "cars": 2, "perfumes": 1 };
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			let current = collection[i].split(" ");
			current = current.map(val => val.split(":")[0]);
			current = current.map(val => val.split(",")[0]);
			let obj = {
				"sue": parseInt(current[1]),
				"firstPropName": current[2],
				"firstPropVal": parseInt(current[3]),
				"secondPropName": current[4],
				"secondPropVal": parseInt(current[5]),
				"thirdPropName": current[6],
				"thirdPropVal": parseInt(current[7]),
				"matches": 0
			};
			holder.push(obj);
		}
	}
	for(let sue in holder) { check(holder[sue], ideal); }
	holder.sort((left, right) => left["matches"] - right["matches"]);
	console.log("The number of the real Aunt Sue is " + holder[holder.length - 1]["sue"] + ".");
});