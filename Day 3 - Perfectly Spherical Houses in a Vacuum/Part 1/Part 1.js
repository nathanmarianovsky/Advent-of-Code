var fs = require("fs");

var total = 0;
var holder_x = [];
var holder_y = [];
var current_x = 0;
var current_y = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	holder_x.push(current_x);
	holder_y.push(current_y);
	for(var i = 0; i < data.length; i++) {
		if(data[i] == "^") {
			current_y++;
		}
		else if(data[i] == "v") {
			current_y--;
		}
		else if(data[i] == ">") {
			current_x++;
		}
		else if(data[i] == "<") {
			current_x--;
		}
		var j = 0;
		for(; j < holder_x.length; j++) {
			if((holder_x[j] == current_x) && (holder_y[j] == current_y)) { break; }
		}
		if(j == holder_x.length) {
			holder_x.push(current_x);
			holder_y.push(current_y);
			total++;
		}
	}
	console.log("The total is: " + (total + 1));
});