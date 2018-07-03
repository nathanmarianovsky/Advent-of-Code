// Declare the necessary variables
var fs = require("fs"),
	input = 345;

// At each step add the next integer and keep tabs on the position. At the end output the number appearing right after 2017.
var main = () => {
	var arr = [0],
		position = 0;
	for(var i = 1; i <= 2017; i++) {
		var skip = input % arr.length;
		position + skip < arr.length ? position = position + skip : position = (position + skip) % arr.length;
		arr = arr.slice(0, position + 1).concat(i, arr.slice(position + 1));
		position++;
	}
	var index = arr.indexOf(2017);
	console.log("The value after 2017 in the completed circular buffer is " + arr[index + 1] + ".");
};

main();