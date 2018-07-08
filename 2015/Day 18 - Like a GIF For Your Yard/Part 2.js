// Declare the necessary variables
var fs = require("fs"),
	iterations = 100;

// Returns the number of lights on
var sum = collection => {
	var count = 0;
	collection.forEach(iter => {
		if(iter.status == "on") { count++; }
	});
	return count;
};

// Computes the number of steps needed on the array of lights
var step_driver = (holder, steps) => {
	var arr = holder;
	for(var i = 0; i < steps; i++) {
		arr = step(arr);
	}
	return arr;
};

// Returns the new array after one step of simultaneously evaluating the rules on each light
var step = holder => {
	var final_arr = [];
	holder.forEach(light => {
		if((light.x == 0 && light.y == 0) || (light.x == 99 && light.y == 0) || (light.x == 0 && light.y == 99) || (light.x == 99 && light.y == 99)) {
			var obj = {
				"x": light.x,
				"y": light.y,
				"status": "on"
			};
			final_arr.push(obj);
		}
		else {
			var around = neighbors(light, holder);
			if(light.status == "on") {
				if(around.on == 2 || around.on == 3) {
					var obj = {
						"x": light.x,
						"y": light.y,
						"status": "on"
					};
				}
				else {
					var obj = {
						"x": light.x,
						"y": light.y,
						"status": "off"
					};
				}
				final_arr.push(obj);
			}
			else {
				if(around.on == 3) {
					var obj = {
						"x": light.x,
						"y": light.y,
						"status": "on"
					};
				}
				else {
					var obj = {
						"x": light.x,
						"y": light.y,
						"status": "off"
					};
				}
				final_arr.push(obj);
			}
		}
	});
	return final_arr;
};

// Returns an object stating how many neighboring lights are on and off.
var neighbors = (current, holder) => {
	var on_count = 0,
		off_count = 0;
	holder.forEach(iter => {
		if((iter.x == current.x && iter.y == current.y + 1) || (iter.x == current.x && iter.y == current.y - 1) || 
			(iter.x == current.x + 1 && iter.y == current.y) || (iter.x == current.x - 1 && iter.y == current.y) || 
			(iter.x == current.x + 1 && iter.y == current.y + 1) || (iter.x == current.x - 1 && iter.y == current.y + 1) || 
			(iter.x == current.x + 1 && iter.y == current.y - 1) || (iter.x == current.x - 1 && iter.y == current.y - 1)) {
			iter.status == "on" ? on_count++ : off_count++;
		}
	});
	var obj = {
		"on": on_count,
		"off": off_count
	};
	return obj;
};

// Read the file and parse. After creating an initial array representing the given data, call on the step_driver function to perform the steps and sum up the lights on at the very end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var count = 0,
		collection = data.split("\n"),
		holder = [];
	collection.forEach(line => {
		var tmp = line.split("");
		for(var i = 0; i < tmp.length; i++) {
			var status = "";
			tmp[i] == "#" ? status = "on" : status = "off";
			if((i == 0 && count == 0) || (i == 99 && count == 0) || (i == 0 && count == 99) || (i == 99 && count == 99)) { status = "on"; }
			var obj = {
				"x": i,
				"y": count,
				"status": status
			};
			holder.push(obj);
		}
		count++;
	});
	console.log("Number of lights on after " + iterations + ": " + sum(step_driver(holder, iterations)));
});