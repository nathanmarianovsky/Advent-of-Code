// Declare the necessary variables.
const row = 3010,
	column = 3019;
let initial = 20151125;

// Generate the next code.
var generator = current => (current * 252533) % 33554393;

// Provide an array containing all the ways a number can be decomposed into a sum of two smaller numbers.
var decompose = val => {
	const arr = [];
	for(let i = 1; i < val; i++) {
		arr.push([val - i, i]);
	}
	return arr;
};

// Compute the code that is to be provided to the machine.
var determineValue = (size, initial, row, column) => {
	for(let i = 3; i <= size; i++) {
		let decomposition = decompose(i);
		for(let j = 0; j < decomposition.length; j++) {
			decomposition[j].push(generator(initial));
			if(decomposition[j][0] == row && decomposition[j][1] == column) {
				console.log("The code provided to the machine is " + decomposition[j][2] + ".");
			}
			initial = generator(initial);
		}
	}
};

// Generate the desired code.
determineValue(row + column, initial, row, column);