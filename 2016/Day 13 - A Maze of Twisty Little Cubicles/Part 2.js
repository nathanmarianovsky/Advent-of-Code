// Declare the necessary variables
var fs = require("fs"),
	favorite = 1350,
	all = [],
	paths = [],
	start = {
		x: 1,
		y: 1,
		count: 0,
		previous: {}
	};

// Convert a decimal to binary.
var bin = input => { return (input >>> 0).toString(2); };

// Returns an array containing all indices of where 'substr' appears in 'str'.
var indices = (str, substr) => {
    var container = [];
    for(var pos = str.indexOf(substr); pos !== -1; pos = str.indexOf(substr, pos + 1)) {
        container.push(pos);
    }
    return container;
};

// Determines whether a point on the grid represents a wall or open space; 1 for open space, 0 for wall. 
var check_point = point => {
	var calculation = bin((point.x * point.x) + (3 * point.x) + (2 * point.x * point.y) + point.y + (point.y * point.y) + favorite),
		truth = 0;
	(indices(calculation, "1")).length % 2 == 0 ? truth = 1 : truth = 0;
	return truth;
};

// Simulates a step on the grid from a given position.
var step = (position, previous) => {
	var arr = [];
	if(!all.some(elem => elem.x == position.x && elem.y == position.y)) {
		if(position.x - 1 >= 0 && !(position.x - 1 == previous.x && position.y == previous.y)) {
			if(check_point({x:position.x-1,y:position.y,count:position.count})) {
				var obj = {
					x: position.x - 1,
					y: position.y,
					count: position.count + 1,
					previous: position
				};
				arr.push(obj);
			}
		}
		if(position.x + 1 >= 0 && !(position.x + 1 == previous.x && position.y == previous.y)) {
			if(check_point({x:position.x+1,y:position.y,count:position.count})) {
				var obj = {
					x: position.x + 1,
					y: position.y,
					count: position.count + 1,
					previous: position
				};
				arr.push(obj);
			}
		}
		if(position.y - 1 >= 0 && !(position.x == previous.x && position.y - 1 == previous.y)) {
			if(check_point({x:position.x,y:position.y-1,count:position.count})) {
				var obj = {
					x: position.x,
					y: position.y - 1,
					count: position.count + 1,
					previous: position
				};
				arr.push(obj);
			}
		}
		if(position.y + 1 >= 0 && !(position.x == previous.x && position.y + 1 == previous.y)) {
			if(check_point({x:position.x,y:position.y+1,count:position.count})) {
				var obj = {
					x: position.x,
					y: position.y + 1,
					count: position.count + 1,
					previous: position
				};
				arr.push(obj);
			}
		}
	}
	return arr;
};

// Simulates a walk from one point to another on the grid. 
var walk = position => {
	var count = 0;
	paths.push(position);
	while(!paths.some(elem => elem.count == 51)) {
		var arr = [];
		for(var p = 0; p < paths.length; p++) {
			arr = arr.concat(step(paths[p], paths[p].previous));
		}
		all = all.concat(paths);
		paths = arr;
		count++;
	}
	var container = [];
	for(var i = 0; i < all.length; i++) {
		if(!container.some(elem => elem.x == all[i].x && elem.y == all[i].y)) { container.push(all[i]); }
	}
	return container.length;
};

console.log("The number of distinct locations visited in at most 50 steps is " + walk(start) + ".");