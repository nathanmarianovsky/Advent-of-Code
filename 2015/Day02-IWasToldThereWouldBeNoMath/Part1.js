// Declare the necessary variables.
const fs = require("fs");

// Read the file and parse. For each set of dimensions calculate the needed surface area and add it to the total. The solution corresponds to the total in the end.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n");
	let total = 0;
	for(let i = 0; i < collection.length; i++) {
		let set = collection[i].split("x").map(elem => parseInt(elem));
		if(set.length == 3) {
			let areas = [set[0] * set[1], set[0] * set[2], set[1] * set[2]];
			areas.sort((l, r) => l - r);
			total += (2 * areas.reduce((l, r) => l + r, 0)) + areas[0];
		}
	}
	console.log(collection);
	console.log("The total amount of square feet of wrapping paper that should be ordered is " + total + ".");
});