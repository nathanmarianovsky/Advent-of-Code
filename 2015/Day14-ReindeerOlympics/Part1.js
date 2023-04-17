// Declare the necessary variables.
const fs = require("fs");

// Creates a sorted array of the distances each reindeer flies in the allowed time.
var distances = (objArr, total) => {
	const container = [];
	for(let i = 0; i < objArr.length; i++) {
		let total_time = objArr[i]["flyTime"] + objArr[i]["restTime"],
			cycles = Math.floor(total / total_time),
			travel = cycles * objArr[i]["flyTime"] * objArr[i]["speed"],
			remainder = total - (cycles * total_time);
		for(let counter = 0; counter < remainder; counter++) {
			if(counter <= objArr[i]["flyTime"]) {
				travel += objArr[i]["speed"];
			}
		}
		container.push(travel);
	}
	container.sort();
	return container;
};

// Read the file and parse. Create an array containing objects representing the reindeers and calculate the distances for all of them. The solution corresponds to the highest distance.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n"),
		holder = [],
		totalSec = 2503;
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			let arr = collection[i].split(" ");
			let obj = {
				"name": arr[0],
				"speed": parseInt(arr[3]),
				"flyTime": parseInt(arr[6]),
				"restTime": parseInt(arr[13])
			};
			holder.push(obj);
		}
	}
	const container = distances(holder, totalSec);
	console.log("The distance the winning reindeer has traveled is " + container[container.length - 1] + ".");
});