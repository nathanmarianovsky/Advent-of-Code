// Declare the necessary variables
var fs = require("fs"),
	tree = [];

// Read the file and parse. Add the data into the tree and transverse to find the bottom. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n");
	container.splice(container.length - 1,1);
	container.forEach(iter => {
		var current = iter.split(" "),
			childrenarr = [];
		if(current.length > 2) {
			for(var i = 3; i < current.length - 1; i++) {
				current[i] = current[i].slice(0,-1);
				childrenarr.push(current[i]);
			}
			childrenarr.push(current[current.length-1]);
		}
		var obj = {
			title: current[0],
			children: childrenarr
		};
		tree.push(obj);
	});
	var k = 0;
	while(true) {
		var i = 0
		for(; i < tree.length; i++) {
			if(tree[i].children.some(elem => elem == tree[k].title)) {
				k = i;
				break;
			}
		}
		if(i == tree.length) { break; }
	}
	console.log(tree);
	console.log("The name of the bottom program is " + tree[k].title + ".");
});