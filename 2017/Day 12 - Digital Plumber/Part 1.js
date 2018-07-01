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

// Read the file and parse. Iterate through and count the number of nodes connected to program 0.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		list = [];
	container.forEach(line => {
		var arr = line.split("<->");
		list[parseInt(arr[0].trim())] = arr[1].split(",").map(elem => parseInt(elem.trim()));
	});
	console.log("The number of programs contained in the group that contains program ID 0 is " + counter(0, list, checked) + ".");
});