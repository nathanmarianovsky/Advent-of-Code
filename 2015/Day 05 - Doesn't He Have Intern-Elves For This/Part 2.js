// Declare the necessary variables
var fs = require("fs"),
	total = 0;

// Read the file and parse. For each word that passes the conditions to be considered "nice", add one to total. The solution corresponds to total in the end.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		var pair = false,
			repetition = false,
			holder = [];
		if(collection[i].length > 0) {
			for(var j = 0; j < collection[i].length; j++) {
				if((j + 2) != collection[i].length) {
					var k = 0;
					if((collection[i][j] == collection[i][j + 2])) { repetition = true; }
					if((collection[i][j] != collection[i][j + 1]) || (collection[i][j + 1] != collection[i][j + 2]) || (collection[i][j] != collection[i][j + 2])) {
						for(; k < holder.length; k++) {
							if(collection[i][j] + collection[i][j + 1] == holder[k]) { pair = true; }
						}
						if(k == holder.length) {
							holder.push(collection[i][j] + collection[i][j + 1]);
						}
					}
					else {
						for(; k < holder.length; k++) {
							if(collection[i][j + 1] + collection[i][j + 2] == holder[k]) { pair = true; }
						}
						if(k == holder.length) {
							holder.push(collection[i][j + 1] + collection[i][j + 2]);
						}
						j++;
					}
				}
				else if((j + 1) != collection[i].length) {
					var k = 0;
					for(; k < holder.length; k++) {
						if(collection[i][j] + collection[i][j + 1] == holder[k]) { pair = true; }
					}
					if(k == holder.length) {
						holder.push(collection[i][j] + collection[i][j + 1]);
					}
				}
			}
		}
		if((repetition == true) && (pair == true)) { total++; }
	}
	console.log("The total is: " + total);
});