// Declare the necessary variables
var fs = require("fs"),
	list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];

// Given an array of arrays, this returns 1 if list is contained in the array and 0 otherwise. 
var compare = arr => {
	if(arr.length == list.length && arr.every((u, i) => u === list[i])) { return 1; }
	else { return 0; }
};

// Returns a deep copy of a given object.
var copy = obj => {
	var output, v, key;
	output = Array.isArray(obj) ? [] : {};
	for(key in obj) {
	   v = obj[key];
	   output[key] = (typeof v === "object") ? copy(v) : v;
	}
	return output;
};

// Read the command, perform the dance moves a billion times, and read off the order in which the programs appear at the end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var commands = data.split("\n")[0].split(","),
		container = [];
	container.push(copy(list));
	var i = 0;
	for(; i < 1000000000; i++) {
		commands.forEach(command => {
			if(command[0] == "s") {
				var count = parseInt(command.slice(1));
				list = list.slice(list.length - count).concat(list.slice(0, list.length - count));
			}
			else if(command[0] == "x") {
				var position1 = parseInt(command.slice(1).split("/")[0]),
					position2 = parseInt(command.slice(1).split("/")[1]),
					holder = list[position1];
				list[position1] = list[position2];
				list[position2] = holder;
			}
			else if(command[0] == "p") {
				var letter1 = command.slice(1).split("/")[0][0],
					letter2 = command.slice(1).split("/")[1][0],
					index1 = list.indexOf(letter1);
					index2 = list.indexOf(letter2);
				list[index1] = letter2;
				list[index2] = letter1;
			}
		});
		if(container.findIndex(compare) != -1) { container.push(list); break; }
		container.push(copy(list));
	}
	if(i != 1000000000) {
		var index = container.findIndex(compare),
			length = container.slice(index).length,
			final = (1000000000 - i) % length;
		console.log("After dancing a billion times, the programs are standing in the order " + container[index + final].join("") + ".");
	}
	else {
		console.log("After dancing a billion times, the programs are standing in the order " + list.join("") + ".");
	}
});