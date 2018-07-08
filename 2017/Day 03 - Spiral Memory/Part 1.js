// Declare the necessary variables
var input = 368078;

// Returns the grid layer on which the value lies.
var layer = value => {
	if(value == 1) { return 0; }
	else {
		var holder = 0,
			estimate = (Math.floor(Math.sqrt(value)) + 1);
		estimate % 2 == 0 ? holder = estimate + 1 : holder = estimate;
		return (holder - 1) / 2;
	}
};

// Returns the position of the value on the grid.
var position = (level,value) => {
	var current = {
		content: Math.pow(((2 * (level - 1)) + 1),2) + 1,
		x: level,
		y: -level + 1
	};
	while(current.content != value) {
		if((current.y < (2 * level) + 1) && (current.x == level)) {
			current.y += 1;
			current.content += 1;
		}
		if((current.x > -(2 * level) + 1) && (current.y == level)) {
			current.x -= 1;
			current.content += 1;
		}
		if((current.y > -(2 * level) + 1) && (current.x == -level)) {
			current.y -= 1;
			current.content += 1;
		}
		if((current.x < (2 * level) + 1) && (current.y == -level)) {
			current.x += 1;
			current.content += 1;
		}
	}
	return current;
};

// Calculates the Manhattan Distance of a point.
var distance = position => Math.abs(position.x) + Math.abs(position.y);

// Driver function.
var driver = value => distance(position(layer(value),value));

// Output the distance.
console.log("The Manhattan Distance for " + input + " from 1 is " + driver(input) + ".");