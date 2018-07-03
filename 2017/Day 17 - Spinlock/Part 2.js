// Declare the necessary variables
var fs = require("fs"),
	input = 345;

// At each step add the next integer and keep tabs on the position. At the end output the value appearing right after 0. 
var main = () => {
	var arr = [],
		length = 1,
		position = 0;
	for(var i = 1; i <= 50000000; i++) {
		var skip = input % length;
		position + skip < length ? position = position + skip : position = (position + skip) % length;
		if(position == 0) { arr.push(i); }
		position++;
		length++;
	}
	console.log("The value after 0 in the completed circular buffer is " + arr[arr.length - 1] + ".");
};

main();