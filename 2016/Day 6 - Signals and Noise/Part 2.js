// Declare the necessary variables
var fs = require("fs"),
	holder = [],
	message = "";

// Read the file and parse. Construct the column arrays and determine the most common character in each.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		columns = container[0].length;
	for(var p = 0; p < columns; p++) { holder.push([]); }
	container.forEach(line => {
		if(line.length > 0) {
			for(var k = 0; k < columns; k++) { holder[k].push(line[k]); }
		}
	});
	for(var j = 0; j < columns; j++) {
		var current = holder[j],
			alphabet = [];
		for(var i = 0; i < current.length; i++) {
			var u = 0 ;
			for(; u < alphabet.length; u++) {
				if(alphabet[u].letter == current[i]) {
					alphabet[u].count++;
					break;
				}
			}
			if(u == alphabet.length) {
				var obj = {
					letter: current[i],
					count: 1
				}
				alphabet.push(obj);
			}
		}
		alphabet.sort((lhs, rhs) => {
			if(lhs.count > rhs.count) { return 1; }
			else if(lhs.count < rhs.count) { return -1; }
			else {
				if(lhs.letter > rhs.letter) { return 1; }
				else { return -1; }
			}
		});
		message += alphabet[0].letter;
	}
	console.log("The original message that Santa is trying to send is " + message + ".");
});