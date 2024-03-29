// Declare the necessary variables
const fs = require("fs");

// Read the file and parse. At each step update the frequency and return the final value.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const container = data.split("\n").map(elem => parseInt(elem));
	let frequency = 0;
	container.pop();
	container.forEach(elem => frequency += elem);
	console.log("The resulting frequency is " + frequency + ".");
});