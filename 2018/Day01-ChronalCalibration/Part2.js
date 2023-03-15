// Declare the necessary variables
const fs = require("fs");

// Read the file and parse. At each step update the frequency, keep track of the previous values,
// and return the first value that is reached twice.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const container = data.split("\n").map(elem => parseInt(elem)),
		hits = [];
	let pos = 0,
		frequency = 0;
	container.pop();
	while(true) {
		frequency += container[pos];
		if(hits.some(elem => elem == frequency)) { break; }
		else {
			hits.push(frequency);
			pos + 1 == container.length ? pos = 0 : pos++;
		}
	}
	console.log("The first frequency the device reaches twice is " + frequency + ".");
});