var fs = require("fs");

var counter = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
		if(counter == -1) {
			console.log("Position When Counter == -1: " + (i + 1));
			break;
		}
	}
});