// Declare the necessary variables
var distance = 35651584,
	puzzle = "10111011111001111";

// Returns the random data generated by str.
var mutation = str => {
	var cpy = str;
	cpy = cpy.split("").reverse();
	for(var p = 0; p < cpy.length; p++) {
		cpy[p] == "0" ? cpy[p] = "1" : cpy[p] = "0";
	}
	return str + "0" + cpy.join("");
};

// Returns the checksum calculation for a given str.
var checksum = str => {
	var result = "";
	for(var p = 0; p < str.length; p += 2) {
		str[p] == str[p+1] ? result += "1" : result += "0";
	}
	return result;
};

// Computes the correct checksum for a given input and a disk length.
var driver = (length, input) => {
	while(input.length < length) {
		input = mutation(input);
	}
	input = input.slice(0, length);
	while(checksum(input).length % 2 == 0) {
		input = checksum(input);
	}
	return checksum(input);
};

console.log("The checksum corresponding to a disk of length " + distance + " is " + driver(distance, puzzle) + ".");