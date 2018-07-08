// Declare the necessary variables
var fs = require("fs"),
	tree = [],
	difference = 0;

// Returns the weight of the tower above the given program in the tree.
var collect = (obj, tree) => {
	var collection = 0;
	tree.forEach(iter => {
		if(iter.parent == obj.title) {
			collection += iter.weight + collect(iter, tree);
		}
	});
	return collection;
};

// The following recursively iterates through the levels of the tree, focusing specifically on the towers where there is an issue with the weight. At the end the program causing the weight inbalance is returned. 
var deeper = (obj, tree) => {
	var numbers = [];
	for(var i = 0; i < tree.length; i++) {
		if(tree[i].parent == obj.title) {
			numbers.push({index: i, weight: tree[i].weight + collect(tree[i], tree)});
		}
	}
	var example = numbers[0].weight;
	var j = 0;
	for(; j < numbers.length; j++) {
		if(numbers[j].weight != example) { 
			var index = numbers[j].index;
			break;
		}
	}
	var canister = [];
	numbers.forEach(iter => {
		if(!canister.some(elem => elem.weight == iter.weight)) {
			canister.push(iter);
		}
	});
	if(canister.length == 1) {
		return obj;
	}
	else {
		difference = Math.abs(canister[0].weight - canister[1].weight);
		return deeper(tree[index], tree);
	}
};

// Read the file and parse. Add the data into the tree and transverse to find the program with the wrong weight. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n");
	container.splice(container.length - 1,1);
	container.forEach(iter => {
		var current = iter.split(" "),
			childrenarr = [];
		if(current.length > 2) {
			for(var i = 3; i < current.length - 1; i++) {
				current[i] = current[i].slice(0,-1);
				childrenarr.push(current[i]);
			}
			childrenarr.push(current[current.length-1]);
		}
		var obj = {
			title: current[0],
			weight: parseInt(current[1].slice(1,-1)),
			children: childrenarr
		};
		tree.push(obj);
	});
	var k = 0;
	while(true) {
		var i = 0
		for(; i < tree.length; i++) {
			if(tree[i].children.some(elem => elem == tree[k].title)) {
				k = i;
				break;
			}
		}
		if(i == tree.length) { break; }
	}
	tree.forEach(iter => {
		tree.forEach(node => {
			if(node.children.some(elem => elem == iter.title)) {
				iter.parent = node.title
			}
		});
	});
	var globallevel = 0;
	var bigtree = {
		title: tree[k].title,
		weight: tree[k].weight,
		level: globallevel,
		children: [],
	};
	var garbage = [];
	var length = tree.length-1;
	while(bigtree.children.length != length) {
		var arr = [];
		globallevel++;
		if(globallevel == 1) {
			arr.push(k);
		}
		for(var p = 0; p < tree.length; p++) {
			if(globallevel == 1) {
				if(tree[p].parent == bigtree.title) {
					var obj = {
						title: tree[p].title,
						weight: tree[p].weight,
						parent: tree[p].parent,
						level: globallevel
					};
					bigtree.children.push(obj);
					arr.push(p);
				}
			}
			else if(globallevel != 1) {
				for(var q = 0; q < bigtree.children.length; q++) {
					var index = garbage.findIndex(elem => elem.title == bigtree.children[q].title);
					if(index != -1 && bigtree.children[q].level == globallevel-1 && garbage[index].children.some(elem => elem == tree[p].title)) {
						var obj = {
							title: tree[p].title,
							weight: tree[p].weight,
							parent: tree[p].parent,
							level: globallevel
						};
						bigtree.children.push(obj);
						arr.push(p);
					}
				}
			}
		}
		arr.sort((lhs,rhs) => lhs - rhs);
		for(var l = 0; l < arr.length; l++) {
			var out = tree.splice(arr[l]-l,1);
			garbage = garbage.concat(out);
		}
	}
	var result = deeper({title: bigtree.title, weight: bigtree.weight, level: bigtree.level}, bigtree.children);
	console.log("The program going by the name '" + result.title + "' whose given weight is " + result.weight + " needs the weight to be adjusted to " + (result.weight - difference) + ".");
});