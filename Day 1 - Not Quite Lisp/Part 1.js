var fs = require("fs"),
	counter = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "(") { counter++; }
		else { counter--; }
	}
	console.log("Height:" + counter);
});