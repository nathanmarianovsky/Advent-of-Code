// Declare the necessary variables.
const fs = require("fs");

// Returns the number of lights on.
var sum = arr => arr.filter(elem => elem.status == "on").length;

// Returns an object stating how many neighboring lights are on and off.
var neighbors = (current, holderArr) => {
	let onCount = 0,
		offCount = 0;
	holderArr.forEach(iter => {
		if((iter.x == current.x && iter.y == current.y + 1) || (iter.x == current.x && iter.y == current.y - 1) || 
			(iter.x == current.x + 1 && iter.y == current.y) || (iter.x == current.x - 1 && iter.y == current.y) || 
			(iter.x == current.x + 1 && iter.y == current.y + 1) || (iter.x == current.x - 1 && iter.y == current.y + 1) || 
			(iter.x == current.x + 1 && iter.y == current.y - 1) || (iter.x == current.x - 1 && iter.y == current.y - 1)) {
			iter.status == "on" ? onCount++ : offCount++;
		}
	});
	return { "on": onCount, "off": offCount };
};

// Returns the new array after one step of simultaneously evaluating the rules on each light.
var step = holder => {
	const finalArr = [];
	holder.forEach(light => {
		let around = neighbors(light, holder),
			obj = { "x": light.x, "y": light.y };
		if(light.status == "on") {
			around.on == 2 || around.on == 3 ? obj.status = "on" : obj.status = "off";
		}
		else {
			around.on == 3 ? obj.status = "on" : obj.status = "off";
		}
		finalArr.push(obj);
	});
	return finalArr;
};

// Computes the number of steps needed on the array of lights
var stepDriver = (initialArr, steps) => {
	let arr = initialArr;
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
			let obj = {
				"x": i,
				"y": count,
				"status": status
			};
			holder.push(obj);
		}
		count++;
	});
	console.log("The number of lights on after " + iterations + " steps is " + sum(stepDriver(holder, iterations)) + ".");
});