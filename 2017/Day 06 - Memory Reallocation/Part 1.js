// Declare the necessary variables
var fs = require("fs"),
	distributions = [];

// Compare two arrays.
var compare = (arr1,arr2) => {
	var value = 1;
	if(arr1.length != arr2.length) { return 0; }
	for(var i = 0; i < arr1.length; i++) {
		if(arr1[i] !== arr2[i]) {
			value = 0;
			break;
		}
	}
	return value;
};

// Check to see if the a current distribution was already encountered. 
var check = current => {
	var value = 0;
	if(distributions.some(elem => compare(current,elem))) { value = 1; }
	return value; 
};

// Perform a distribution cycle. 
var advance = distribution => {
	var index = distribution.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0),
		indexvalue = distribution[index];
	distribution[index] = 0;
	while(indexvalue != 0) {
		index++;
		if(index >= distribution.length) { index -= distribution.length; }
		distribution[index]++;
		indexvalue--;
	}
	return distribution;
};

// Read the file and parse. While the configuration has not been seen before keep performing distribution cycles and keep track of the number.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n")[0].split("\t").map(elem => parseInt(elem)),
		steps = 0;
	while(!check(container)) {
		distributions.push(Array.from(container,x => x));
		container = advance(container);
		steps++;
	}
	console.log("The number of distribution cycles needed to be completed before a configuration is seen twice is " + steps + ".");
});