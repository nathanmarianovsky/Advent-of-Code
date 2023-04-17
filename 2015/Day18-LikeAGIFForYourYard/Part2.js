// Declare the necessary variables.
const fs = require("fs");

// Returns the number of lights on.
var sum = arr => arr.filter(elem => elem.status == "on").length;

// Returns an object stating how many neighboring lights are on and off.
var neighbors = (current, holder) => {
	let onCount = 0,
		offCount = 0;
	holder.forEach(iter => {
		if((iter.x == current.x && iter.y == current.y + 1) || (iter.x == current.x && iter.y == current.y - 1) || 
			(iter.x == current.x + 1 && iter.y == current.y) || (iter.x == current.x - 1 && iter.y == current.y) || 
			(iter.x == current.x + 1 && iter.y == current.y + 1) || (iter.x == current.x - 1 && iter.y == current.y + 1) || 
			(iter.x == current.x + 1 && iter.y == current.y - 1) || (iter.x == current.x - 1 && iter.y == current.y - 1)) {
			iter.status == "on" ? onCount++ : offCount++;
		}
	});
	return { "on": onCount, "off": offCount };
};

// Returns the new array after one step of simultaneously evaluating the rules on each light
var step = holder => {
	const finalArr = [];
	holder.forEach(light => {
		let obj = { "x": light.x, "y": light.y };
		if((light.x == 0 && light.y == 0) || (light.x == 99 && light.y == 0) || (light.x == 0 && light.y == 99) || (light.x == 99 && light.y == 99)) {
			obj.status = "on";
		}
		else {
			let around = neighbors(light, holder);
			if(light.status == "on") {
				around.on == 2 || around.on == 3 ? obj.status = "on" : obj.status = "off";
			}
			else {
				around.on == 3 ? obj.status = "on" : obj.status = "off";
			}
		}
		finalArr.push(obj);
	});
	return finalArr;
};

// Computes the number of steps needed on the array of lights
var stepDriver = (holder, steps) => {
	let arr = holder;
	for(let i = 0; i < steps; i++) {
		arr = step(arr);
	}
	return arr;
};

// Read the file and parse. After creating an initial array representing the given data, call on the stepDriver function to perform the steps and sum up the lights on at the very end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	let count = 0;
	const collection = data.split("\n"),
		iterations = 100,
		holder = [];
	collection.forEach(line => {
		let tmp = line.split("");
		for(let i = 0; i < tmp.length; i++) {
			let status = "";
			tmp[i] == "#" ? status = "on" : status = "off";
			if((i == 0 && count == 0) || (i == 99 && count == 0) || (i == 0 && count == 99) || (i == 99 && count == 99)) { status = "on"; }
			let obj = {
				"x": i,
				"y": count,
				"status": status
			};
			holder.push(obj);
		}
		count++;
	});
	console.log("The number of lights on after 100 steps with the corners alwas on is " + sum(stepDriver(holder, iterations)) + ".");
});