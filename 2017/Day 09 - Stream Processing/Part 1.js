// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Iterate through the string and keep count along the way.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n"),
		str = container[0];
	 	condition = false,
	 	count = 0,
	 	level = 1;
	for(var i = 0; i < str.length; i++) {
		if (str[i] == "!") { i++; }
		else if (condition && str[i] != ">") {}
		else if(str[i] == "<") { condition = true; }
		else if(str[i] == ">") { condition = false; }
		else if(str[i] == "{") { count += level++; }
		else if(str[i] == "}") { level--; }
	}
	console.log("The total score for all of the groups in the given input is " + count + ".");
});