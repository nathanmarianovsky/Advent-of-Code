// Declare the necessary variables
var fs = require("fs"),
	checked = [];

// Given an id, this returns the number of connected nodes.
var counter = (id, list, known) => {
	var holder = 0;
	list[id].forEach(iter => {
		if(!known.some(elem => elem == iter)) {
			known.push(iter);
			holder += counter(iter, list, known) + 1;
		}
	});
	return holder;
};

// After each step this sets the checked values in the list to undefined.
var cleanup = (list, known) => {
	for(var i = 0; i < known.length; i++) { list[known[i]] = undefined; }
	return list;
};

// Read the file and parse. Iterate through and count the number of nodes to each program accounting for multiplicity. Then return the number of distinct such groupings. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		list = [],
		groups = [];
	container.forEach(line => {
		var arr = line.split("<->");
		list[parseInt(arr[0].trim())] = arr[1].split(",").map(elem => parseInt(elem.trim()));
	});
	while(!list.every(elem => elem == undefined)) {
		var k = 0;
		for(; k < list.length; k++) {
			if(list[k] != undefined) { break; }
		}
		groups.push(counter(k, list, checked));
		list = cleanup(list, checked);
		checked = [];
	}
	console.log("The number of distinct groups in the given data is " + groups.length + ".");
});