// Declare the necessary variables
var fs = require("fs"),
	container = "";

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
			num = parseInt(num);
			repeat = parseInt(repeat);
			i++;
			for(var p = 0; p < repeat; p++) {
				for(var j = 0; j < num; j++) {
					if(i + j < data.length) {
						container += data[i+j];
					}
				}
			}
			i += num - 1;
		}
		else if(data[i] != "\n") {
			container += data[i];
		}
	}
	console.log("The decompressed length of the file is " + container.length + " characters long.");
});