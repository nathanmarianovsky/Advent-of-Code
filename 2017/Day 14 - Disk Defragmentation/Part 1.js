// Declare the necessary variables
var fs = require("fs"),
	input = "oundnydw";

// Given a hexadecimal value this converts it to binary.
var hex2bin = hex => {
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
};

// Given a string this returns the corresponding knot hash.
var knot = str => {
	var position = 0,
		skip = 0,
		commands = [],
		list = [],
		hash = [];
	for(var k = 0; k < str.length; k++) { commands[k] = str[k].charCodeAt(0); }
	commands.push(17, 31, 73, 47, 23);
	for(var i = 0; i < 256; i++) { list[i] = i; }
	for(var i = 0; i < 64; i++) {
	    for(const length of commands) {
	        if(length > 1) {
	            list = list.slice(position).concat(list.slice(0, position));
	            list = list.slice(0, length).reverse().concat(list.slice(length));
	            list = list.slice(-position).concat(list.slice(0, -position));
	        }
	        position = (position + length + skip++) % 256;
	    }
	}
	for(var i = 0; i < 16; i++) {
	    const iter = list.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b);
	    hash.push(iter);
	}
	var zeropadding = input => ("0" + input).substr(-2);
	return hash.map(elem => zeropadding(elem.toString(16))).join("");
};

// Main function that executes the necessary steps per row. 
var main = () => {
	var counter = 0;
	for(var i = 0; i < 128; i++) {
		var hash = knot(input + "-" + i),
			bin = "";
		for(var j = 0; j < hash.length; j++) {
			bin += hex2bin(hash[j]).slice(hex2bin(hash[j]).length - 4);
		}
		counter += bin.split("").filter(iter => iter == "1").length;
	}
	console.log("The number of used squares is " + counter + ".");
};

main();