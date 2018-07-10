// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Count the possible pairs by checking the necessary conditions and return this count.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(2, data.split("\n").length - 1).map(elem => elem.split("node-"));
		list = [],
		count = 0;
	container.forEach(line => {
		var arr = line[1].split(""),
			x = parseInt(arr.slice(1, arr.indexOf("-")).join(""));
			y = parseInt(arr.slice(arr.indexOf("y") + 1, arr.indexOf("y") + 3).join("").trim());
		arr = line[1].split("T");
		var size = parseInt(arr[0].split("").slice(arr[0].length - 3).join("").trim()),
			used = parseInt(arr[1].split("").slice(arr[1].length - 3).join("").trim()),
			avail = parseInt(arr[2].split("").slice(arr[2].length - 3).join("").trim()),
			percen = parseInt(arr[3].split("").slice(arr[3].length - 3, arr[3].length - 1).join("").trim());
		list.push({x: x, y: y, size: size, used: used, avail: avail, percen: percen});
	});
	list.forEach(first => {
		list.forEach(second => {
			if(first.used != 0 && !(first.x == second.x && first.y == second.y) && first.used <= second.avail) { count++; }
		});
	});
	console.log("The number of viable pairs of nodes is " + count + ".");
});