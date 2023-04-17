// Declare the necessary variables.
const fs = require("fs");

// Calculates the distance traveled by a reindeer in an allowed time.
var distanceInTime = (obj, currentTime) => {
	let totalTime = obj["flyTime"] + obj["restTime"],
		cycles = Math.floor(currentTime / totalTime),
		travel = cycles * obj["flyTime"] * obj["speed"],
		remainder = currentTime - (cycles * totalTime);
	return (remainder >= obj["flyTime"] ? travel += obj["speed"] * obj["flyTime"] : travel += obj["speed"] * remainder);
};

// Calculates the total points each reindeer attains given the total allowed time. 
var traveler = (objArr, total) => {
	for(let i = 1; i <= total; i++) {
		for(let j = 0; j < objArr.length; j++) {
			objArr[j]["currentDistance"] = distanceInTime(objArr[j], i);
		}
		objArr.sort((lhs, rhs) => rhs["currentDistance"] - lhs["currentDistance"]);
		let biggest = objArr[0]["currentDistance"];
		for(let l = 0; l < objArr.length; l++) {
			if(objArr[l]["currentDistance"] == biggest) {
				objArr[l]["points"]++;
			}
			else { break; }
		}
	}
	return objArr;
};

// Read the file and parse. Create an array containing the reindeers and call on traveler to count the points for each one. The solution corresponds to the highest amount of points.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n");
		holder = [],
		totalSec = 2503;
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			let arr = collection[i].split(" ");
			let obj = {
				"name": arr[0],
				"speed": parseInt(arr[3]),
				"flyTime": parseInt(arr[6]),
				"restTime": parseInt(arr[13]),
				"points": 0,
				"currentDistance": 0
			};
			holder.push(obj);
		}
	}
	const newHolder = traveler(holder, totalSec);
	newHolder.sort((left, right) => right["points"] - left["points"]);
	console.log("The number of points the winning reindeer has is " + holder[0]["points"] + ".");
});