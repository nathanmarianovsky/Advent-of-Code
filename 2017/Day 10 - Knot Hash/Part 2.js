// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Iterate through the commands for 64 rounds and compose the dense hash based on the resulting sparse hash. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n"),
		str = container[0],
		position = 0,
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
	const result = hash.map(elem => zeropadding(elem.toString(16))).join("");
	console.log("The resulting dense hash based on the given string of bytes is " + result + "."); 
});