// Declare the necessary variables
var fs = require("fs");

// Read the commands, perform the dance moves, and read off the order in which the programs appear at the end.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var commands = data.split("\n")[0].split(","),
		list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
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
	console.log("After the given dance moves, the programs are standing in the order " + list.join("") + ".");
});