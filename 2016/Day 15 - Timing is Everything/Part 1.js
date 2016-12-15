// Declare the necessary variables
var fs = require("fs");

// Evolves the current states by one second.
var tick = holder => {
	var arr = holder;
	arr.forEach(iter => {
		iter.state + 1 >= iter.positions ? iter.state = (iter.state + 1) % iter.positions : iter.state++;
	});
	return arr;
};

// Simulates a drop for a current state in time.
var drop = holder => {
	var simulator = [];
	holder.forEach(iter => {
		simulator.push({num:iter.num,positions:iter.positions,state:iter.state});
	});
	for(var i = 0; i < simulator.length; i++) {
		simulator = tick(simulator);
		if(simulator[i].state != 0) { return 0; }
	}
	return 1;
};

// Read the file and parse. For set of states simulate a drop and continue to do so until one is found to succeed.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var split = data.split("\n"),
		container = [];
	for(var i = 0; i < split.length; i++) {
		if(split[i].length > 0) {
			var arr = split[i].split(" ");
			var obj = {
				num: (arr[1].split(""))[1],
				positions: parseInt(arr[3]),
				state: parseInt(arr[11])
			};
			container.push(obj);
		}
	}
	container.sort((lhs, rhs) => {
		return parseInt(lhs.num) > parseInt(rhs.num);
	});
	var time = 0;
	while(!drop(container)) {
		container = tick(container);
		time++;
	}
	console.log("The first time you can press the button in order to get a capsule is " + time + ".");
});