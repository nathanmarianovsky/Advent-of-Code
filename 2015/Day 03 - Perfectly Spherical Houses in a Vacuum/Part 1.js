// Declare the necessary variables
var fs = require("fs"),
	holder_x = [],
	holder_y = [],
	current_x = 0,
	current_y = 0;

// Read the file and parse. For each direction check to see if the point has already been visited before. If not, add it. The solution corresponds to the number of unique points visited.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	holder_x.push(current_x);
	holder_y.push(current_y);
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "^") { current_y++; }
		else if(data[i] == "v") { current_y--; }
		else if(data[i] == ">") { current_x++; }
		else if(data[i] == "<") { current_x--; }
		var j = 0;
		for(; j < holder_x.length; j++) {
			if((holder_x[j] == current_x) && (holder_y[j] == current_y)) { break; }
		}
		if(j == holder_x.length) {
			holder_x.push(current_x);
			holder_y.push(current_y);
		}
	}
	console.log("The total is: " + holder_x.length);
});