// Declare the necessary variables
var fs = require("fs"),
	count = 0;

// Given an input, mutation returns the result of the left outermost set of instructions acting on the rest of the string.
var mutation = str => {
	var container = "";
	for(var i = 0; i < str.length; i++) {
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
			for(var p = 0; p < repeat; p++) {
				for(var j = 0; j < num; j++) {
					if(i + j < str.length) {
						container += str[i+j];
					}
				}
			}
			i += num - 1;
		}
		else if(str[i] != "\n") {
			container += str[i];
		}
	}
	return container;
};

// Read the file and parse. Iterate through string and perform the necessary actions to get the decompressed string.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "(") {
			var num = "",
				repeat = "";
			i++;
			while(data[i] != "x") {
				num += data[i];
				i++;
			}
			i++;
			while(data[i] != ")") {
				repeat += data[i];
				i++;
			}
			i++;
			num = parseInt(num);
			repeat = parseInt(repeat);
			var holder = "(" + num + "x" + repeat + ")";
			for(var j = 0; j < num; j++) {
				if(i + j < data.length) {
					holder += data[i+j];
				}
			}
			while(holder.indexOf("(") != -1) {
				holder = mutation(holder);
			}
			count += holder.length;
			i += num - 1;
		}
		else if(data[i] != "\n") { count++; }
	}
	console.log("The decompressed length of the file using the improved format is " + count + ".");
});