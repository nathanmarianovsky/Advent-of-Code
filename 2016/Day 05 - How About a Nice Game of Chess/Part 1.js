// Declare the necessary variables
var md5 = require("md5"),
	output = "",
	input = "ffykfhsq";

// Checks whether or not a given string has an md5 hash with five leading zeros.
var check = str => {
	var result = md5(str),
		counter = 0;
	for(var i = 0; i < 5; i++) {
		if(result[i] == "0") { counter++; }
	}
	if(counter == 5) { return true; }
	else { return false; }
};

// Extracts the 6th character of a md5 hash.
var extract = str => { return md5(str)[5]; };

// For a given input the function determines the smallest natural number such that the md5 hash of the combined string (input + number) has five leading zeros.
var find_result = (str, start) => {
	var counter = start;
	while(!check(str + counter)) { counter++; }
	return counter;
};

// Loops through until the whole password is generated.
var main = () => {
	var count = 0,
		extraction = "";
	for(var k = 0; k < 8; k++) {
		count = find_result(input, count + 1);
		extraction = extract(input + count.toString());
		output += extraction;
	}
	console.log("The password for the security door is " + output + ".");
};

// Call the main function.
main();