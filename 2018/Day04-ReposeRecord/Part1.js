// Declare the necessary variables
const fs = require("fs");

// Given two objects representing a command in the input this will compare them based on the date.
var comparison = (lhs, rhs) => {
	if(lhs.year < rhs.year) { return -1; }
	else if(lhs.year > rhs.year) { return 1; }
	else {
		if(lhs.month < rhs.month) { return -1; }
		else if(lhs.month > rhs.month) { return 1; }
		else {
			if(lhs.day < rhs.day) { return -1; }
			else if(lhs.day > rhs.day) { return 1; }
			else {
				if(lhs.hour < rhs.hour) { return -1; }
				else if(lhs.hour > rhs.hour) { return 1; }
				else {
					if(lhs.minute < rhs.minute) { return -1; }
					else if(lhs.minute > rhs.minute) { return 1; }
				}
			}
		}
	}
};

// Given an array of integers this will return the index of the position for the largest value.
var maxIndex = arr => {
    if (arr.length == 0) { return -1; }
    let max = arr[0],
    	maxIndex = 0;
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
        	maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
};

// Read the file and parse. Organize the commands in a manner such that all minutes are tracked for all guards with a counter for a sleeping status.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const container = data.split("\n").map(elem => elem.split(" ")),
		list = [],
		logs = [],
		guards = [];
	container.pop();
	container.forEach(iter => {
		let value1 = iter[0].substring(1).split("-"),
			value2 = iter[1].substring(0, 5).split(":");
		list.push({
			"year": parseInt(value1[0]),
			"month": parseInt(value1[1]),
			"day": parseInt(value1[2]),
			"hour": parseInt(value2[0]),
			"minute": parseInt(value2[1]),
			"action": iter.slice(2)
		});
	});
	list.sort(comparison);
	let iter = 0;
	while(iter < list.length) {
		if(list[iter].action.length == 4) {
			let commands = [list[iter]],
				subIter = iter + 1;
			while(subIter < list.length && list[subIter].action.length == 2) {
				commands.push(list[subIter]);
				subIter++;
			}
			logs.push(commands);
			iter = subIter;
		}
	}
	for(let i = 0; i < logs.length; i++) {
		let guard = parseInt(logs[i][0].action[1].substring(1)),
			guardPos = 0;
		for(; guardPos < guards.length; guardPos++) {
			if(guards[guardPos].guard == guard) {
				break;
			}
		}
		if(guardPos == guards.length) {
			let minutes = [];
			for(let k = 0; k < 60; k++) {
				minutes.push(0);
			}
			guards.push({
				"guard": guard,
				"minutes": minutes
			});
		}
		if(logs[i].length > 1) {
			for(let actionIter = 1; actionIter < logs[i].length; actionIter++) {
				if(logs[i][actionIter].action[0] == "falls") {
					let min = 0;
					if(logs[i][actionIter].hour == 0) {
						min = logs[i][actionIter].minute;
					}
					if(actionIter + 1 >= logs[i].length) {
						for(; min < 60; min++) {
							guards[guardPos].minutes[min]++;
						}
					}
					else {
						if((logs[i][actionIter].hour != 0 && logs[i][actionIter + 1].hour == 0 && logs[i][actionIter + 1].minute != 0)
							|| logs[i][actionIter].hour == 0) {
							let stop = logs[i][actionIter + 1].minute;
							for(; min < stop; min++) {
								guards[guardPos].minutes[min]++;
							}
						}
					}
				}
			}
		}
	}
	guards.sort((lhs, rhs) => {
		let sum1 = lhs.minutes.reduce((prev, cur) => prev + cur, 0),
			sum2 = rhs.minutes.reduce((prev, cur) => prev + cur, 0);
		if(sum1 > sum2) { return -1; }
		else { return 1; }
	});
	const index = maxIndex(guards[0].minutes);
	console.log("The guard that sleeps most is Guard #" + guards[0].guard + ", with minute "
		+ index + " being his favorite during which to nap. The corresponding product of these is "
		+ guards[0].guard * index + ".");
});