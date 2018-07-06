// Declare the necessary variables
var fs = require("fs");

// Read and parse the instructions. Execute step by step and keep a count on the number of times 'mul' is invoked. 
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		commands = [],
		list = [],
		count = 0;
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
	for(var i = 0; i < commands.length; i++) {
		var index = -2;
		if(commands[i].command == "set") {
			if(isNaN(parseInt(commands[i].second))) {
				index = list.findIndex(elem => elem.name == commands[i].second);
				list[list.findIndex(elem => elem.name == commands[i].first)].value = list[index].value;
			}
			else {
				index = list.findIndex(elem => elem.name == commands[i].first);
				list[index].value = parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "sub") {
			if(isNaN(parseInt(commands[i].second))) {
				index = list.findIndex(elem => elem.name == commands[i].second);
				list[list.findIndex(elem => elem.name == commands[i].first)].value -= list[index].value;
			}
			else {
				index = list.findIndex(elem => elem.name == commands[i].first);
				list[index].value -= parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "mul") {
			count++;
			if(isNaN(parseInt(commands[i].second))) {
				index = list.findIndex(elem => elem.name == commands[i].second);
				list[list.findIndex(elem => elem.name == commands[i].first)].value *= list[index].value;
			}
			else {
				index = list.findIndex(elem => elem.name == commands[i].first);
				list[index].value *= parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "jnz") {
			if(isNaN(parseInt(commands[i].first)) && isNaN(parseInt(commands[i].second))) {
				if(list[list.findIndex(elem => elem.name == commands[i].first)].value != 0) { i += list[list.findIndex(elem => elem.name == commands[i].second)].value - 1; }
			}
			else if(isNaN(parseInt(commands[i].first)) && !isNaN(parseInt(commands[i].second))) {
				if(list[list.findIndex(elem => elem.name == commands[i].first)].value != 0) { i += parseInt(commands[i].second) - 1; }
			}
			else if(!isNaN(parseInt(commands[i].first)) && isNaN(parseInt(commands[i].second))) {
				if(parseInt(commands[i].first) != 0) { i += list[list.findIndex(elem => elem.name == commands[i].second)].value - 1; }
			}
			else if(!isNaN(parseInt(commands[i].first)) && !isNaN(parseInt(commands[i].second))) {
				if(parseInt(commands[i].first) != 0) { i += parseInt(commands[i].second) - 1; }
			}
		}
	}
	console.log("The 'mul' instruction is invoked " + count + " times.");
});