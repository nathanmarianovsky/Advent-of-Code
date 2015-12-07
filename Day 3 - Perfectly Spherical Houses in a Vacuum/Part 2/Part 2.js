var fs = require("fs");

var holder_x = [];
var holder_y = [];
var current_x1 = 0;
var current_x2 = 0;
var current_y1 = 0;
var current_y2 = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	holder_x.push(current_x1);
	holder_y.push(current_y1);
	for(var i = 0; i < data.length; i += 2) {
		if(data[i] == "^") {
			current_y1++;
		}
		else if(data[i] == "v") {
			current_y1--;
		}
		else if(data[i] == ">") {
			current_x1++;
		}
		else if(data[i] == "<") {
			current_x1--;
		}
		if(data[i + 1] == "^") {
			current_y2++;
		}
		else if(data[i + 1] == "v") {
			current_y2--;
		}
		else if(data[i + 1] == ">") {
			current_x2++;
		}
		else if(data[i + 1] == "<") {
			current_x2--;
		}
		var j = 0;
		for(; j < holder_x.length; j++) {
			if((holder_x[j] == current_x1) && (holder_y[j] == current_y1)) { break; }
		}
		if(j == holder_x.length) {
			holder_x.push(current_x1);
			holder_y.push(current_y1);
		}
		var k = 0;
		for(; k < holder_x.length; k++) {
			if((holder_x[k] == current_x2) && (holder_y[k] == current_y2)) { break; }
		}
		if(k == holder_x.length) {
			holder_x.push(current_x2);
			holder_y.push(current_y2);
		}
	}
	console.log("The total is: " + holder_x.length);
});