// Declare the necessary variables
var fs = require("fs");
	
// Define the ideal Aunt Sue	
var ideal = {
	"children": 3,
	"cats": 7,
	"samoyeds": 2,
	"pomeranians": 3,
	"akitas": 0,
	"vizslas": 0,
	"goldfish": 5,
	"trees": 3,
	"cars": 2,
	"perfumes": 1
};

// Count the number of matches some Aunt Sue has against the ideal one.
var check = (obj, ideal) => {
	for(var key in ideal) {
		if(((obj["first_prop_name"] == key) && (obj["first_prop_val"] == ideal[key])) || 
			((obj["second_prop_name"] == key) && (obj["second_prop_val"] == ideal[key])) || 
			((obj["third_prop_name"] == key) && (obj["third_prop_val"] == ideal[key]))) { 
			obj["matches"]++; 
		}
	}
	return obj;
};

// Read the file and parse. Create an array containing all of the Aunt Sues and compare them all to the ideal one. The solution corresponds to the number of Aunt Sue with the most matches. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var holder = [],
		collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			var current = collection[i].split(" ");
			current = current.map(val => val.split(":")[0]);
			current = current.map(val => val.split(",")[0]);
			var obj = {
				"sue": parseInt(current[1]),
				"first_prop_name": current[2],
				"first_prop_val": parseInt(current[3]),
				"second_prop_name": current[4],
				"second_prop_val": parseInt(current[5]),
				"third_prop_name": current[6],
				"third_prop_val": parseInt(current[7]),
				"matches": 0
			};
			holder.push(obj);
		}
	}
	for(var sue in holder) {
		check(holder[sue], ideal);
	}
	holder.sort((left, right) => left["matches"] > right["matches"]);
	console.log("It is Sue #" + holder[holder.length - 1]["sue"]);
});