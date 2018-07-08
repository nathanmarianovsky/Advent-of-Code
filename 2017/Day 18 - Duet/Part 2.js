// Declare the necessary variables
var fs = require("fs");

// This advances one of the programs forward until it has to receive and returns an array of the values it wants to send over to the other program.
var advance = (obj0, obj1, commands, id, received) => {
	var user = "",
		arr = [];
	id == 0 ? user = obj0 : user = obj1;
	for(var i = user.step; i < commands.length; i++) {
		var index = -2;
		if(commands[i].command == "set") {
			if(isNaN(parseInt(commands[i].second))) {
				index = user.list.findIndex(elem => elem.name == commands[i].second);
				user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value = user.list[index].value;
			}
			else {
				index = user.list.findIndex(elem => elem.name == commands[i].first);
				user.list[index].value = parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "add") {
			if(isNaN(parseInt(commands[i].second))) {
				index = user.list.findIndex(elem => elem.name == commands[i].second);
				user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value += user.list[index].value;
			}
			else {
				index = user.list.findIndex(elem => elem.name == commands[i].first);
				user.list[index].value += parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "mul") {
			if(isNaN(parseInt(commands[i].second))) {
				index = user.list.findIndex(elem => elem.name == commands[i].second);
				user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value *= user.list[index].value;
			}
			else {
				index = user.list.findIndex(elem => elem.name == commands[i].first);
				user.list[index].value *= parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "mod") {
			if(isNaN(parseInt(commands[i].second))) {
				index = user.list.findIndex(elem => elem.name == commands[i].second);
				user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value %= user.list[index].value;
			}
			else {
				index = user.list.findIndex(elem => elem.name == commands[i].first);
				user.list[index].value %= parseInt(commands[i].second);
			}
		}
		else if(commands[i].command == "snd") {
			if(isNaN(parseInt(commands[i].first))) {
				index = user.list.findIndex(elem => elem.name == commands[i].first);
				arr.push(user.list[index].value);
			}
			else {
				arr.push(parseInt(commands[i].first))
			}
		}
		else if(commands[i].command == "rcv") {
			if(received.length == 0) { break; }
			else {
				user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value = received[0];
				received = received.slice(1);
			}
		}
		else if(commands[i].command == "jgz") {
			if(isNaN(parseInt(commands[i].first)) && isNaN(parseInt(commands[i].second))) {
				if(user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value > 0) { i += user.list[user.list.findIndex(elem => elem.name == commands[i].second)].value - 1; }
			}
			else if(isNaN(parseInt(commands[i].first)) && !isNaN(parseInt(commands[i].second))) {
				if(user.list[user.list.findIndex(elem => elem.name == commands[i].first)].value > 0) { i += parseInt(commands[i].second) - 1; }
			}
			else if(!isNaN(parseInt(commands[i].first)) && isNaN(parseInt(commands[i].second))) {
				if(parseInt(commands[i].first) > 0) { i += user.list[user.list.findIndex(elem => elem.name == commands[i].second)].value - 1; }
			}
			else if(!isNaN(parseInt(commands[i].first)) && !isNaN(parseInt(commands[i].second))) {
				if(parseInt(commands[i].first) > 0) { i += parseInt(commands[i].second) - 1; }
			}
		}
	}
	user.step = i;
	return arr;
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

// Read and parse the instructions. Execute step by step until both programs terminate and return the count of the number of times a value was sent by program 1.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		instructions = [],
		list = [],
		sent = [],
		current = 0,
		count = 0;
	container.forEach(iter => {
		var holder = iter.split(" ");
		if(holder.length == 3) {
			instructions.push({command: holder[0], first: holder[1], second: holder[2]});
			if(isNaN(parseInt(holder[2]))) {
				var index2 = list.findIndex(elem => elem.name == holder[2]);
				if(index2 == -1) { list.push({name: holder[2], value: 0}); }
			}
		}
		else { instructions.push({command: holder[0], first: holder[1]}); }
		if(isNaN(parseInt(holder[1]))) {
			var index1 = list.findIndex(elem => elem.name == holder[1]);
			if(index1 == -1) { list.push({name: holder[1], value: 0}); }
		}
	});
	var prog0 = {
		id: 0,
		step: 0,
		list: copy(list)
	};
	list[list.findIndex(elem => elem.name == "p")].value = 1;
	var prog1 = {
		id: 1,
		step: 0,
		list: list
	};
	while(!(instructions[prog0.step].command == "rcv" && instructions[prog1.step].command == "rcv" && sent.length == 0)) {
		sent = advance(prog0, prog1, instructions, current, sent);
		if(current == 1) { count += sent.length; }
		current == 0 ? current = 1 : current = 0;
	}
	console.log("The number of times program 1 sent over a value to program 0 is " + count + ".");
});