// Declare the necessary variables
var fs = require("fs");

var check = (char1, char2) => {
	var val = 0;
	if(char1.toUpperCase() == char2.toUpperCase()) {
		if(((char1 == char1.toUpperCase()) && (char2 == char2.toLowerCase()))
			|| ((char1 == char1.toLowerCase()) && (char2 == char2.toUpperCase()))) {
			val = 1;
		}
	}
	return val;
};

var reduction = arr => {
	var	iter = 0;
	while(iter < arr.length) {
		if(iter + 1 < arr.length) {
			if(check(arr[iter], arr[iter + 1]) == 1) {
				arr.splice(iter, 2);
				iter = 0;
			}
			else {
				iter++;
			}
		}
		else { iter++; }
	}
	return arr;
};

// Read the file and parse. Compute the grid of points, record the claims, and count the number of points being claimed by more than one rectangle.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var	str = data.split("\n")[0].split("");
	str = reduction(str);
	console.log("The number of units that remain after fully reacting the polymer is " + str.length + ".");
});