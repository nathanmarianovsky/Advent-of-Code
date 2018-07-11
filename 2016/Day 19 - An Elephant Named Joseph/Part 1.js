// Declare the necessary variables
var input = 3005290;

// Takes a list and advances it one step.
var evolution = list => {
	var arr = [];
	if(list.length == 2) { return [list[0]]; }
	else if(list.length == 3) { return [list[2]]; }
	else {
		if(list.length % 2 == 0) {
			for(var p = 0; p < list.length; p += 2) { arr.push(list[p]); }
		}
		else {
			for(var p = 2; p < list.length; p += 2) { arr.push(list[p]); }
		}
		return arr;
	}
};

// Executes the necessary number of steps until the required elf is found.
var main = () => {
	var container = [];
	for(var i = 1; i <= input; i++) {
		container.push(i);
	}
	while(container.length != 1) {
		container = evolution(container);
	}
	console.log("The elf that gets all of the presents is " + container[0] + ".");
};

main();