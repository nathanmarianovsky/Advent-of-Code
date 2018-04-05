// Declare the necessary variables
var input = 368078,
	arr = [];

// Returns the next position.
var transverse = position => {
	if((position.x == position.step) && (position.y == -position.step)) {
		position.step += 1;
		position.x += 1;
		position.content += 1;
	}
	else if((position.y < position.step) && (position.x == position.step)) {
		position.y += 1;
		position.content += 1;
	}
	else if((position.x > -position.step) && (position.y == position.step)) {
		position.x -= 1;
		position.content += 1;
	}
	else if((position.y > -position.step) && (position.x == -position.step)) {
		position.y -= 1;
		position.content += 1;
	}
	else if((position.x < position.step) && (position.y == -position.step)) {
		position.x += 1;
		position.content += 1;
	}
	return position;
};

// Returns the sum for the given position.
var move = position => {
	var sum = 0;
	for(var i = 0; i < arr.length; i++) {
		if((arr[i].x == position.x + 1) && (arr[i].y == position.y)) { sum += arr[i].sum; }
		if((arr[i].x == position.x - 1) && (arr[i].y == position.y)) { sum += arr[i].sum; }
		if((arr[i].x == position.x) && (arr[i].y == position.y + 1)) { sum += arr[i].sum; }
		if((arr[i].x == position.x) && (arr[i].y == position.y - 1)) { sum += arr[i].sum; }
		if((arr[i].x == position.x + 1) && (arr[i].y == position.y + 1)) { sum += arr[i].sum; }
		if((arr[i].x == position.x - 1) && (arr[i].y == position.y + 1)) { sum += arr[i].sum; }
		if((arr[i].x == position.x + 1) && (arr[i].y == position.y - 1)) { sum += arr[i].sum; }
		if((arr[i].x == position.x - 1) && (arr[i].y == position.y - 1)) { sum += arr[i].sum; }
	}
	return sum;
};

// Driver function that outputs the result.
var driver = value => {
	var current = {
		content: 2,
		step: 1,
		sum: 1,
		x: 1,
		y: 0
	};
	arr.push({content: 1, step: 0, sum: 1, x: 0, y: 0});
	arr.push({content: 2, step: 1, sum: 1, x: 1, y: 0});
	while(!arr.some(elem => elem.sum > value)) {
		current = transverse(current);
		arr.push({content: current.content, step: current.step, sum: move(current), x: current.x, y: current.y});
	}
	console.log("The first value written that is larger than " + input + " is " + arr[arr.length-1].sum + ".");
};

// Call the driver function.
driver(input);