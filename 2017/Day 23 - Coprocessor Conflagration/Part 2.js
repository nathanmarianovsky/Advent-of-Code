// Declare the necessary variables
var fs = require("fs");

// Read and parse the instructions. Process requires understanding the specific input given.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		commands = [],
		list = [];
	container.forEach(iter => {
		var holder = iter.split(" ");
		if(holder.length == 3) {
			commands.push({command: holder[0], first: holder[1], second: holder[2]});
			if(isNaN(parseInt(holder[2]))) {
				var index2 = list.findIndex(elem => elem.name == holder[2]);
				if(index2 == -1) { list.push({name: holder[2], value: 0}); }
			}
		}
		else { commands.push({command: holder[0], first: holder[1]}); }
		if(isNaN(parseInt(holder[1]))) {
			var index1 = list.findIndex(elem => elem.name == holder[1]);
			if(index1 == -1) { list.push({name: holder[1], value: 0}); }
		}
	});
	var index1 = list.findIndex(elem => elem.name == "b"),
		index2 = list.findIndex(elem => elem.name == "c"),
		index3 = list.findIndex(elem => elem.name == "f"),
		index4 = list.findIndex(elem => elem.name == "d"),
		index5 = list.findIndex(elem => elem.name == "h");
	list[index1].value = parseInt(commands[0].second);
	list[index2].value = parseInt(commands[0].second);
	list[index1].value = (list[index1].value * parseInt(commands[4].second)) - parseInt(commands[5].second);
	list[index2].value = list[index1].value - parseInt(commands[7].second);
	do {
    	list[index3].value = 1;
    	list[index4].value = 2;
    	for(var k = list[index4].value; k * k < list[index1].value; ++k) {
      		if(list[index1].value % k === 0) {
        		list[index3].value = 0;
        		break;
      		}
    	}
    	if(list[index3].value === 0) { list[index5].value += 1; }
    	list[list.findIndex(elem => elem.name == "g")].value = list[index1].value - list[index2].value;
    	list[index1].value += 17;
  	} while(list[list.findIndex(elem => elem.name == "g")].value !== 0)
  	console.log("The value left in register 'h' after the program ran to completion is " + list[index5].value + ".");
});