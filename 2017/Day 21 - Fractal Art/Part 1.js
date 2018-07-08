// Declare the necessary variables
var fs = require("fs");

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

// Rotates a given rule.
var rotate = current => {
	if(current.length == 2) {
		return [current[1][0] + current[0][0],
			current[1][1] + current[0][1]];
	}
	else if(current.length == 3) {
		return [current[2][0] + current[1][0] + current[0][0],
			current[2][1] + current[1][1] + current[0][1],
			current[2][2] + current[1][2] + current[0][2]];
	}
};

// Flips a given rule.
var flip = current => current.map(str => str.split("").reverse().join(""));

// Returns all of the possible rotations and flips for a particular rule.
var combinations = current => {
	var container = [current, flip(current)];
	for(var i = 0; i < 3; i++) {
		current = rotate(current);
		container.push(current, flip(current));
	}
	return container;
};

// Compare two arrays.
var compare = (arr1,arr2) => {
	var value = 1;
	if(arr1.length != arr2.length) { return 0; }
	for(var i = 0; i < arr1.length; i++) {
		if(arr1[i] !== arr2[i]) {
			value = 0;
			break;
		}
	}
	return value;
};

// Performs an iteration on a single block.
var step = (block, rules) => {
	for(var i = 0; i < rules.length; i++) {
		var possibilities = combinations(rules[i].from);
		for(var perm of possibilities) {
			if(compare(block, perm)) {
				return copy(rules[i].to);
			}
		}
	}
};

// Returns the new grid after performing one iteration.
var advance = (grid, rules) => {
	var container = [];
	if(grid.length % 2 == 0) {
		for(var i = 0; i < grid.length / 2; i++) {
			var holder = [];
			var arr = [grid[2 * i][0] + grid[2 * i][1],
				grid[(2 * i) + 1][0] + grid[(2 * i) + 1][1]];
			holder.push(step(arr, rules));
			for(var j = 1; j < grid.length / 2; j++) {
				arr = [grid[2 * i][2 * j] + grid[2 * i][(2 * j) + 1],
					grid[(2 * i) + 1][2 * j] + grid[(2 * i) + 1][(2 * j) + 1]];
				arr = step(arr, rules);
				holder[0][0] += arr[0];
				holder[0][1] += arr[1];
				holder[0][2] += arr[2];
			}
			container = container.concat(holder[0]);
		}
	}
	else if(grid.length % 3 == 0) {
		for(var i = 0; i < grid.length / 3; i++) {
			var holder = [];
			var arr = [grid[3 * i][0] + grid[3 * i][1] + grid[3 * i][2],
				grid[(3 * i) + 1][0] + grid[(3 * i) + 1][1] + grid[(3 * i) + 1][2],
				grid[(3 * i) + 2][0] + grid[(3 * i) + 2][1] + grid[(3 * i) + 2][2]];
			holder.push(step(arr, rules));
			for(var j = 1; j < grid.length / 3; j++) {
				arr = [grid[3 * i][3 * j] + grid[3 * i][(3 * j) + 1] + grid[3 * i][(3 * j) + 2],
					grid[(3 * i) + 1][3 * j] + grid[(3 * i) + 1][(3 * j) + 1] + grid[(3 * i) + 1][(3 * j) + 2],
					grid[(3 * i) + 2][3 * j] + grid[(3 * i) + 2][(3 * j) + 1] + grid[(3 * i) + 2][(3 * j) + 2]];
				arr = step(arr, rules);
				holder[0][0] += arr[0];
				holder[0][1] += arr[1];
				holder[0][2] += arr[2];
				holder[0][3] += arr[3];
			}
			container = container.concat(holder[0]);
		}
	}
	return container.map(line => line.split(""));
};

// Read and parse the rules. Then iterate accordingly and return the number of pixels on after 5 iterations.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var input = data.split("\n").slice(0, data.split("\n").length - 1),
		rules = [],
		grid = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]];
	input.forEach(line => {
		var arr = line.split("=>").map(elem => elem.trim()),
			obj = {
				from: arr[0].split("/"),
				to: arr[1].split("/")
			};
		rules.push(obj);
	});
	for(var i = 0; i < 5; i++) {
		grid = advance(grid, rules);
	}
	var count = grid.map(elem => elem.filter(iter => iter == "#").length).reduce((a,b) => a + b, 0);
	console.log("After 5 iterations the number of pixels on is " + count + ".");
});