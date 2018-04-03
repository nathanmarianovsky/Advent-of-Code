// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. For each row sort the list and add to the checksum. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var	container = data.split("\n"),
		sum = 0;
	container.splice(container.length - 1,1);
	container.forEach(iter => {
		var list = (iter.split("\t")).map(str => parseInt(str));
		list.sort((a,b) => a - b);
		sum += list[list.length-1] - list[0];
	});
	console.log("The checksum for the spreadsheet is " + sum + ".");
});