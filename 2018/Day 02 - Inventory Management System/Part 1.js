// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. For each string determine if there are repeating characters, count them, and compute the checksum.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var	container = data.split("\n").map(elem => elem.split("")),
		arr = [],
		index = 0,
		sum1 = 0,
		sum2 = 0;
	container.pop();
	container.forEach(iter => {
		arr = [];
		iter.forEach(char => {
			index = 0;
			for(; index < arr.length; index++) {
				if(arr[index].title == char) {
					arr[index].count++;
					break;
				}
			}
			if(index == arr.length) {
				arr.push({title: char, count: 1});
			}
		});
		if(arr.some(obj => obj.count == 2)) { sum1++; }
		if(arr.some(obj => obj.count == 3)) { sum2++; }
	});
	console.log("The resulting checksum is " + (sum1 * sum2) + ".");
});