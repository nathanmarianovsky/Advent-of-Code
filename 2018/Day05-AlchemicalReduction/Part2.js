// Declare the necessary variables
const fs = require("fs"),
	alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var check = (char1, char2) => {
	let val = 0;
	if(char1.toUpperCase() == char2.toUpperCase()) {
		if(((char1 == char1.toUpperCase()) && (char2 == char2.toLowerCase()))
			|| ((char1 == char1.toLowerCase()) && (char2 == char2.toUpperCase()))) {
			val = 1;
		}
	}
	return val;
};

var cleaner = (arr, char) => {
	let iter = 0;
	while(iter < arr.length) {
		if(arr[iter].toLowerCase() == char) {
			arr.splice(iter, 1);
		}
		else { iter++; }
	}
	return arr;
};

var reduction = arr => {
	let	iter = 0;
	while(iter < arr.length) {
		if(iter + 1 < arr.length) {
			if(check(arr[iter], arr[iter + 1]) == 1) {
				arr.splice(iter, 2);
				iter = 0;
			}
			else { iter++; }
		}
		else { iter++; }
	}
	return arr;
};

// Read the file and parse. Compute the grid of points, record the claims, and count the number of points being claimed by more than one rectangle.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const str = data.split("\n")[0].split(""),
		dataArr = [];
	alphabet.forEach(char => {
		let cleanStr = cleaner(str.slice(), char),
			reducedStr = reduction(cleanStr);
		dataArr.push(reducedStr.length);
	});
	dataArr.sort((lhs, rhs) => lhs - rhs);
	console.log("The minimal number of units that can remain after removing a letter and fully reacting the polymer is " + dataArr[0] + ".");
});