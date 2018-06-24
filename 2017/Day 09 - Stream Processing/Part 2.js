// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Iterate through the string and keep count of the garbage along the way.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		str = container[0];
	 	condition = false,
	 	count = 0,
	 	level = 1,
	 	garbage = 0;
	for(var i = 0; i < str.length; i++) {
		if (str[i] == "!") { i++; }
		else if (condition && str[i] != ">") { garbage++; }
		else if(str[i] == "<") { condition = true; }
		else if(str[i] == ">") { condition = false; }
		else if(str[i] == "{") { count += level++; }
		else if(str[i] == "}") { level--; }
	}
	console.log("The total number of non-canceled characters in the given input is " + garbage + ".");
});