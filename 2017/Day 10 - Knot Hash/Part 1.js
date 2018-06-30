// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Iterate through the commands and return the product of the first two numbers in the new list.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n"),
		commands = container[0].split(",").map(elem => parseInt(elem)),
		position = 0,
		skip = 0,
		list = [];
	for(var i = 0; i < 256; i++) { list[i] = i; }
	for(const length of commands) {
        if(length > 1) {
            list = list.slice(position).concat(list.slice(0, position));
            list = list.slice(0, length).reverse().concat(list.slice(length));
            list = list.slice(-position).concat(list.slice(0, -position));
        }
        position = (position + length + skip++) % 256;
    }
	console.log("The result of multiplying the first two numbers in the list produced by the given lengths is " + (list[0] * list[1]) + ".");
});