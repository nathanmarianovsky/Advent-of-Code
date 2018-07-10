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

// Given a current index this returns an array containing the next possible moves, at most four. 
var step = obj => {
	var index1 = obj.grid.findIndex(elem => elem.x == obj.grid[obj.current].x + 1 && elem.y == obj.grid[obj.current].y),
		index2 = obj.grid.findIndex(elem => elem.x == obj.grid[obj.current].x - 1 && elem.y == obj.grid[obj.current].y),
		index3 = obj.grid.findIndex(elem => elem.x == obj.grid[obj.current].x && elem.y == obj.grid[obj.current].y + 1),
		index4 = obj.grid.findIndex(elem => elem.x == obj.grid[obj.current].x && elem.y == obj.grid[obj.current].y - 1),
		holder = [],
		lst = [];
	if(index1 != -1 && obj.grid[index1].used <= obj.grid[obj.current].size) {
		lst = copy(obj.grid);
		lst[obj.current].used = obj.grid[index1].used;
		lst[obj.current].original = copy(obj.grid[index1].original);
		lst[index1].used = 0; 
		lst[index1].original = copy(obj.grid[obj.current].original);
		holder.push({current: index1, grid: lst, previous: obj.current});
	}
	if(index2 != -1 && obj.grid[index2].used <= obj.grid[obj.current].size) {
		lst = copy(obj.grid);
		lst[obj.current].used = obj.grid[index2].used;
		lst[obj.current].original = copy(obj.grid[index2].original);
		lst[index2].used = 0; 
		lst[index2].original = copy(obj.grid[obj.current].original);
		holder.push({current: index2, grid: lst, previous: obj.current});
	}
	if(index3 != -1 && obj.grid[index3].used <= obj.grid[obj.current].size) {
		lst = copy(obj.grid);
		lst[obj.current].used = obj.grid[index3].used;
		lst[obj.current].original = copy(obj.grid[index3].original);
		lst[index3].used = 0; 
		lst[index3].original = copy(obj.grid[obj.current].original);
		holder.push({current: index3, grid: lst, previous: obj.current});
	}
	if(index4 != -1 && obj.grid[index4].used <= obj.grid[obj.current].size) {
		lst = copy(obj.grid);
		lst[obj.current].used = obj.grid[index4].used;
		lst[obj.current].original = copy(obj.grid[index4].original);
		lst[index4].used = 0; 
		lst[index4].original = copy(obj.grid[obj.current].original);
		holder.push({current: index4, grid: lst, previous: obj.current});
	}
	return holder;
};

// Read the file and parse. Start at the position with 0T used and move in all possible directions until the goal is reached. Return the count representing the number of steps. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(2, data.split("\n").length - 1).map(elem => elem.split("node-"));
		list = [],
		count = 0;
	container.forEach(line => {
		var arr = line[1].split(""),
			x = parseInt(arr.slice(1, arr.indexOf("-")).join(""));
			y = parseInt(arr.slice(arr.indexOf("y") + 1, arr.indexOf("y") + 3).join("").trim());
		arr = line[1].split("T");
		var size = parseInt(arr[0].split("").slice(arr[0].length - 3).join("").trim()),
			used = parseInt(arr[1].split("").slice(arr[1].length - 3).join("").trim());
		list.push({x: x, y: y, size: size, used: used, original: {x: x, y: y}});
		
	});
	var index = list.findIndex(elem => elem.used == 0);
	var collection = [{current: index, grid: list, previous: index}];
	while(!collection.some(elem => elem.grid[elem.previous].original.x == 2 && 
		elem.grid[elem.previous].original.y == 0 && elem.grid[elem.previous].x == 0 && 
		elem.grid[elem.previous].y == 0)) {
		var temp = [];
		collection.forEach(iter => {
			temp = temp.concat(step(iter));
		});
		collection = temp;
		count++;
	}
	console.log("The fewest number of steps required to move the goal data to the node at the origin is " + count + ".");
});