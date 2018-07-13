// Declare the necessary variables
var fs = require("fs"),
	_ = require("lodash");

// Creates an array of all possible permutations.
var permutator = input_arr => {
  	var results = [];
	var permute = (arr, memo) => {
	    var cur, memo = memo || [];
	    for(var i = 0; i < arr.length; i++) {
	      	cur = arr.splice(i, 1);
	      	if (arr.length === 0) {
	  		  	results.push(memo.concat(cur));
	      	}
	      	permute(arr.slice(), memo.concat(cur));
	      	arr.splice(i, 0, cur[0]);
	    }
	    return results;
	};
  	return permute(input_arr);
};

// Attempts to advance a position in a given direction.
var advance = (grid, i, j, list, collection, distance) => {
    if(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) { return 0; }
    var char = grid[i][j];
    if(char == "#") { return 0; }
    list.push({i, j});
    grid[i][j] = "#";
    if(parseInt(char) >= 0 && parseInt(char) <= 9) {
        collection[char] = distance + 1;
    }
    return 1;
};

// Performs a breadth-first search to find the minimal distances.
var search = (rows, control) => {
	var distances = {},
    	grid = rows.map(elem => elem.split(""));
    var container = [control];
    grid[control.i][control.j] = "#";
    var distance = 0,
    	count = container.length;
    while(0 < container.length) {
        var node = container.shift();
        advance(grid, node.i - 1, node.j, container, distances, distance);
        advance(grid, node.i + 1, node.j, container, distances, distance);
        advance(grid, node.i, node.j - 1, container, distances, distance);
        advance(grid, node.i, node.j + 1, container, distances, distance);
        if(--count == 0) {
            distance++;
            count = container.length;
        }
    }
	return distances;
};

// Read and parse the input. Obtain all pairwise distances and compute the distances for all possible permutations of travel route. Output the minimal value found. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var lines = data.split("\n"),
    	map = {},
    	min = Infinity;
    lines.forEach((str, i) => {
    	str.split("").forEach((character, j) => {
            if(parseInt(character) >= 0 && parseInt(character) <= 9) {
                map[parseInt(character)] = {character, i, j};
            }
        });
    });
    var map2 = _.reduce(map, (obj, val, key) => {
	    obj[key] = search(lines, val);
	    return obj;
	}, {});
    var keys = Object.keys(map);
    keys = keys.filter(elem => elem != 0);
    permutator(keys).forEach(possibility => {
        var sum = possibility.reduce((memo, k, i) => {
            var prev = i ? possibility[i - 1] : 0;
            var value = map2[prev][k];
            if(value === undefined) { return Infinity; }
            return memo + value;
        }, 0);
        if(sum < min) { min = sum; }
    });
    console.log("The fewest number of steps needed is " + min + ".");
});