// Declare the necessary variables
var fs = require("fs");

// Perform the instructions as many times as needed and return the checksum.
var main = () => {
	var state = "A",
		steps = 12794428,
		list = Array(1000).fill(0),
		current = list.length / 2;
	for(var i = 0; i < steps; i++) {
		if(current < 0) { list.splice(0, 0, 0); current++; }
		if(current == list.length) { list.splice(list.length, 0, 0); current--; }
		if(state == "A") {
			if(list[current] == 0) {
				list[current] = 1;
				current++;
				state = "B";
			}
			else if(list[current] == 1) {
				list[current] = 0;
				current--;
				state = "F";
			}
		}
		else if(state == "B") {
			if(list[current] == 0) {
				current++;
				state = "C";
			}
			else if(list[current] == 1) {
				list[current] = 0;
				current++;
				state = "D";
			}
		}
		else if(state == "C") {
			if(list[current] == 0) {
				list[current] = 1;
				current--;
				state = "D";
			}
			else if(list[current] == 1) {
				current++;
				state = "E";
			}
		}
		else if(state == "D") {
			if(list[current] == 0) {
				current--;
				state = "E";
			}
			else if(list[current] == 1) {
				list[current] = 0;
				current--;
				state = "D";
			}
		}
		else if(state == "E") {
			if(list[current] == 0) {
				current++;
				state = "A";
			}
			else if(list[current] == 1) {
				current++;
				state = "C";
			}
		}
		else if(state == "F") {
			if(list[current] == 0) {
				list[current] = 1;
				current--;
				state = "A";
			}
			else if(list[current] == 1) {
				current++;
				state = "A";
			}
		}
	}
	console.log("The diagnostic checksum is " + list.reduce((a,b) => a + b, 0) + ".");
};

main();