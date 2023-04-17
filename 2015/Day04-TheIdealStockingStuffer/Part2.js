// Declare the necessary variables.
const md5 = require("md5"),
	input = "bgvyzdsv";

// Checks whether or not a given string has an md5 hash with six leading zeros.
var check = str => {
	const result = md5(str);
	let counter = 0;
	for(let i = 0; i < 6; i++) {
		if(result[i] == "0") { counter++; }
	}
	if(counter == 6) { return true; }
	else { return false; }
};

// For a given input the function determines the smallest natural number such that the md5 hash of the combined string (input + number) has six leading zeros.
var findResult = str => {
	let counter = 0;
	while(!check(str + counter)) { counter++; }
	return counter;
};

// The solution corresponds to the result returned from findResult(input).
console.log("The lowest positive number that produces a hash with six leading zeroes is " + findResult(input) + ".");