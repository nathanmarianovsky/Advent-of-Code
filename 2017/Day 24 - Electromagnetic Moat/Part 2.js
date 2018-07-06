// Declare the necessary variables
var fs = require("fs");

// Returns a deep copy of a given object.
var copy = obj => {
	var output, v, key;
	output = Array.isArray(obj) ? [] : {};
	for(key in obj) {
	   v = obj[key];
	   output[key] = (typeof v === "object") ? copy(v) : v;
	}
	return output;
};

// Compare two arrays.
var compare = (arr1,arr2) => {
	var value = 1;
	if(arr1.length != arr2.length) { return 0; }
	for(var i = 0; i < arr1.length; i++) {
		if(arr1[i] !== arr2[i]) {
			value = 0;
			break;
		}
	}
	return value;
};

// Performs a single bridge building step and returns the list of all possibilities based on the starting bridge.
var step = start => {
	var holder = [];
	for(var i = 0; i < start.possibilities.length; i++) {
		if(!compare(start.arr, start.possibilities[i]) && !compare(start.arr, start.possibilities[i].reverse())) {
			if(start.possibilities[i].some(elem => elem == start.arr[start.arr.length - 1])) {
				if(!(start.possibilities[i][0] == start.arr[start.arr.length - 1])) { 
					start.possibilities[i].reverse();
					var obj = {
						arr: copy(start.arr.concat(start.possibilities[i])),
						possibilities: start.possibilities.slice(0, i).concat(start.possibilities.slice(i + 1))
					};
					start.possibilities[i].reverse();
				}
				else {
					var obj = {
						arr: copy(start.arr.concat(start.possibilities[i])),
						possibilities: start.possibilities.slice(0, i).concat(start.possibilities.slice(i + 1))
					};
				}
				holder.push(obj);
			}
		}
	}
	return holder;
};

// Read and parse the components. Build all possible bridges step by step, calculate the strength for the longest bridges and return the maximal value.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var components = data.split("\n").slice(0, data.split("\n").length - 1).map(line => line.split("/").map(elem => parseInt(elem))),
		current = [],
		list = [];
	for(var i = 0; i < components.length; i++) {
		if(components[i].some(elem => elem == 0)) {
			if(components[i][0] != 0) { 
				components[i].reverse();
				current.push({arr: copy(components[i]), possibilities: components.slice(0, i).concat(components.slice(i + 1))});
				list.push(copy(components[i]));
				components[i].reverse();
			}
			else {
				current.push({arr: copy(components[i]), possibilities: components.slice(0, i).concat(components.slice(i + 1))});
				list.push(copy(components[i]));
			}
		}
	}
	while(current.length > 0) {
		var container = [];
		for(var i = 0; i < current.length; i++) {
			var next = step(current[i]);
			next.forEach(iter => list.push(iter.arr));
			container = container.concat(next);
		}
		current = container;
	}
	var length = list.sort((a,b) => b.length - a.length)[0].length;
	var max = list.filter(elem => elem.length == length).map(lst => lst.reduce((a,b) => a + b, 0)).sort((a,b) => b - a)[0];
	console.log("The strength of the strongest possible bridge is " + max + ".");
});