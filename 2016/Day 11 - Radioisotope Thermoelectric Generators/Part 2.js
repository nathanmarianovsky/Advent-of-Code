// Declare the necessary variables
var assortment = [];
var list = [
	{id: 1, name: "strontium", type: "generator", floor: 1},
	{id: 2, name: "strontium", type: "microchip", floor: 1},
	{id: 3, name: "plutonium", type: "generator", floor: 1},
	{id: 4, name: "plutonium", type: "microchip", floor: 1},
	{id: 5, name: "thulium", type: "generator", floor: 2},
	{id: 6, name: "thulium", type: "microchip", floor: 3},
	{id: 7, name: "ruthenium", type: "generator", floor: 2},
	{id: 8, name: "ruthenium", type: "microchip", floor: 2},
	{id: 9, name: "curium", type: "generator", floor: 2},
	{id: 10, name: "curium", type: "microchip", floor: 2},
	{id: 11, name: "elerium", type: "generator", floor: 1},
	{id: 12, name: "elerium", type: "microchip", floor: 1},
	{id: 13, name: "dilithium", type: "generator", floor: 1},
	{id: 14, name: "dilithium", type: "microchip", floor: 1}
];

// check whether two items irradiate each other on each floor for a current moment in time
var check_floors = (cur_list, elevator) => {
	if(cur_list.some(elem => elem.floor < 1 || elem.floor > 4)) { return 0; }
	var counter = 0,
		floor1 = cur_list.filter(elem => elem.floor == 1),
		floor2 = cur_list.filter(elem => elem.floor == 2),
		floor3 = cur_list.filter(elem => elem.floor == 3),
		floor4 = cur_list.filter(elem => elem.floor == 4);
	for(var p = 0; p < floor1.length; p++) {
		if(elevator == 1 && floor1[p].type == "generator" && !floor1.some(elem => elem.id == floor1[p].id + 1)) { counter++; }
		if(elevator == 1 && floor1[p].type == "microchip" && !floor1.some(elem => elem.id == floor1[p].id - 1)) { counter++; }
	}
	if(counter >= 2) { return 0; }
	counter = 0;
	for(var p = 0; p < floor2.length; p++) {
		if(elevator == 2 && floor2[p].type == "generator" && !floor2.some(elem => elem.id == floor2[p].id + 1)) { counter++; }
		if(elevator == 2 && floor2[p].type == "microchip" && !floor2.some(elem => elem.id == floor2[p].id - 1)) { counter++; }
	}
	if(counter >= 2) { return 0; }
	counter = 0;
	for(var p = 0; p < floor3.length; p++) {
		if(elevator == 3 && floor3[p].type == "generator" && !floor3.some(elem => elem.id == floor3[p].id + 1)) { counter++; }
		if(elevator == 3 && floor3[p].type == "microchip" && !floor3.some(elem => elem.id == floor3[p].id - 1)) { counter++; }
	}
	if(counter >= 2) { return 0; }
	counter = 0;
	for(var p = 0; p < floor4.length; p++) {
		if(elevator == 4 && floor4[p].type == "generator" && !floor4.some(elem => elem.id == floor4[p].id + 1)) { counter++; }
		if(elevator == 4 && floor4[p].type == "microchip" && !floor4.some(elem => elem.id == floor4[p].id - 1)) { counter++; }
	}
	if(counter >= 2) { return 0; }
	return 1;
};

// Checks whether the list of object provided have all arrived to the 4th floor or not.
var condition = cur_list => cur_list.some(elem => elem.floor != 4);

// Creates an array of all possible permutations.
var permutator = input_arr => {
  	var results = [];
	var permute = (arr, memo) => {
	    var cur, memo = memo || [];
	    for(var i = 0; i < arr.length; i++) {
	      	cur = arr.splice(i, 1);
	      	if(arr.length === 0) {
	  		  	results.push(memo.concat(cur));
	      	}
	      	permute(arr.slice(), memo.concat(cur));
	      	arr.splice(i, 0, cur[0]);
	    }
	    return results;
	};
  	return permute(input_arr);
};

// Given the current list of states and the current floor this shifts the necessary elements either up a floor or down.
var elevator_shift = (cur_list, floor, shift, id1, id2) => {
	var arr = [];
	if(floor + shift > 0 && floor + shift < 5) {
		cur_list.forEach(obj => {
			if((obj.id == id1 || obj.id == id2) && obj.floor == floor) {
				var obj = {
					id: obj.id,
					name: obj.name,
					type: obj.type,
					floor: obj.floor + shift
				};
				arr.push(obj);
			}
			else {
				var obj = {
					id: obj.id,
					name: obj.name,
					type: obj.type,
					floor: obj.floor
				};
				arr.push(obj);
			}
		});
	}
	return arr;
};

// Given the current list of states this returns the ids of elements who have a generator on the same floor.
var pairs = floor => {
	var arr = [];
	for(var i = 0; i < floor.length; i++) {
		if(floor[i].type == "microchip" && floor.findIndex(elem => elem.type == "generator" && elem.id == floor[i].id - 1) != -1) { arr.push(floor[i].id); }
	}
	return arr;
};

// Compare two arrays.
var compare = (arr1, arr2) => {
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

// Checks if the current list of states has no elements below the elevator position.
var below = (known, given) => {
	for(var i = 0; i < known.length; i++) {
		if(known[i].floor < given) { return 1; }
	}
	return 0;
};

// Main function that iterates a BFS until some state finally has all items on the fourth floor.
var main = () => {
	var count = 0,
		current = 1,
		container = [{floor: 1, state: list}];
	while(!container.some(elem => !condition(elem.state))) {
		var holder = [];
		for(var i = 0; i < container.length; i++) {
			var standing = container[i].state.filter(elem => elem.floor == container[i].floor);
			for(var j = 0; j < standing.length; j++) {
				var same = pairs(standing);
				if(same.findIndex(elem => elem == standing[j].id) <= 0) {
					var counter = 0;
					for(var k = j + 1; k < standing.length; k++) {
						var up2 = elevator_shift(container[i].state, container[i].floor, 1, standing[j].id, standing[k].id);
						if(up2.length > 0 && check_floors(up2, container[i].floor + 1)) { 
							holder.push({floor: container[i].floor + 1, state: up2}); 
						}
						counter += up2.length;
					}
					if(counter == 0) {
						var up = elevator_shift(container[i].state, container[i].floor, 1, standing[j].id),
							down = elevator_shift(container[i].state, container[i].floor, -1, standing[j].id);
						if(up.length > 0 && check_floors(up, container[i].floor + 1)) { 
							holder.push({floor: container[i].floor + 1, state: up}); 
						}
						if(down.length > 0 && below(container[i].state, container[i].floor) && check_floors(down, container[i].floor - 1)) { 
							holder.push({floor: container[i].floor - 1, state: down}); 
						}
						if(!check_floors(up, container[i].floor + 1) && !check_floors(down, container[i].floor - 1)) {
							for(var k = j + 1; k < standing.length; k++) {
								var down2 = elevator_shift(container[i].state, container[i].floor, -1, standing[j].id, standing[k].id);
								if(down2.length > 0 && below(container[i].state, container[i].floor) && check_floors(down2, container[i].floor - 1)) { 
									holder.push({floor: container[i].floor - 1, state: down2}); 
								}
							}
						}
					}
				}
			}
		}
		count++;
		container = holder;
	}
	console.log("The minimal number of steps is " + count + ".");
};

main();