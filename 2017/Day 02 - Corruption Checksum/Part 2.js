// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. For each row check all combinations until the pair is found and add to the sum.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var	container = data.split("\n"),
		sum = 0;
	container.splice(container.length - 1,1);
	container.forEach(iter => {
		var list = (iter.split("\t")).map(str => parseInt(str));
		for(var i = 0; i < list.length - 1; i++) {
			for(var j = i + 1; j < list.length; j++) {
				if(list[i] % list[j] == 0) { sum += list[i]/list[j]; }
				else if(list[j] % list[i] == 0) { sum+= list[j]/list[i]; }
			}
		}
	});
	console.log("The sum of each row's result is " + sum + ".");
});