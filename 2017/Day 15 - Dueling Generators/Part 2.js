// Declare the necessary variables
var fs = require("fs"),
	multiplicationA = 16807,
	multiplicationB = 48271,
	bottom = 2147483647;

// Given an integer this outputs the binary representation as a 32-bit string.
var bin = nMask => {
 	for(var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32; nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
 	return sMask;
};

// Read the initial start values, iterate through 5 million times, and add to the counter each time a pair has the 16 lowest 16 bits match accounting for the new divisibility rules. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		startA = parseInt(container[0].split(" ")[4]),
		startB = parseInt(container[1].split(" ")[4]),
		counter = 0;
	for(var i = 0; i < 5000000; i++) {
		startA = (startA * multiplicationA) % bottom;
		startB = (startB * multiplicationB) % bottom;
		while(startA % 4 != 0) { startA = (startA * multiplicationA) % bottom; }
		while(startB % 8 != 0) { startB = (startB * multiplicationB) % bottom; }
		if(bin(startA).slice(bin(startA).length - 16) == bin(startB).slice(bin(startB).length - 16)) { counter++; }
	}
	console.log("The judge's final count based on the new logic is " + counter + ".");
});