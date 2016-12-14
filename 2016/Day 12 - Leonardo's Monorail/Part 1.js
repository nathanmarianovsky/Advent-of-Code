// Declare the necessary variables
var fs = require("fs"),
	holder = [
		{letter:"a",value:0},
		{letter:"b",value:0},
		{letter:"c",value:0},
		{letter:"d",value:0}
	];

// Read the file and parse. Execute each command and record the values of 'a', 'b', 'c', and 'd' as they change. In the end report the value for 'a'. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n");
	for(var i = 0; i < container.length; i++) {
		if(container[i].length > 0) {
			var split = container[i].split(" ");
			if(split[0] == "cpy") {
				var count = 0;
				if(holder.some(elem => elem.letter == split[1])) {
					holder.forEach(iter => {
						if(iter.letter == split[1]) {
							count = iter.value;
						}
					});
				}
				else { count = parseInt(split[1]); }
				holder.forEach(iter => {
					if(iter.letter == split[2]) {
						iter.value = count;
					}
				});
			}
			else if(split[0] == "inc") {
				holder.forEach(elem => {
					if(elem.letter == split[1]) { elem.value++; }
				});
			}
			else if(split[0] == "dec") {
				holder.forEach(elem => {
					if(elem.letter == split[1]) { elem.value--; }
				});
			}
			else if(split[0] == "jnz") {
				if(holder.some(elem => elem.letter == split[1] && elem.value != 0)) {
					i += parseInt(split[2]) - 1;
				}
				else if(!isNaN(split[1]) && parseInt(split[1]) != 0) { i += parseInt(split[2]) - 1; }
			}
		}
		else { break; }
	}
	console.log("The value left in register 'a' post executing the assembunny code is " + holder[0].value + ".");
});