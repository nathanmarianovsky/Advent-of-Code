// Declare the necessary variables
var fs = require("fs"),
	count = 0;

// Recursively calculates a given string's decompressed length by counting carefully.
var sum = str => {
	var calculation = 0;
	for(var i = 0; i < str.length; i++) {
		var container = "";
		if(str[i] == "(") {
			var num = "",
				repeat = "";
			i++;
			while(str[i] != "x") {
				num += str[i];
				i++;
			}
			i++;
			while(str[i] != ")") {
				repeat += str[i];
				i++;
			}
			num = parseInt(num);
			repeat = parseInt(repeat);
			i++;
			var counter = 0,
				condition = false;
			for(var k = 0; k < num; k++) {
				if(i + k < str.length) {
					if(str[i+k] != "(" && !condition) { counter++; }
					else if(str[i+k] == "(") { condition = true; }
					if(condition) { container += str[i+k]; }
				}
				else { break; }
			}
			calculation += (repeat * sum(container)) + (repeat * counter);
			i += num - 1;
		}
		else if(str[i] != "\n") {
			calculation++;
		}
	}
	return calculation;
};

// Read the file and return the 'sum' of the data.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	console.log("The decompressed length of the file using the improved format is " + sum(data) + ".");
});