// Declare the necessary variables
var input = 3005290;

// Solves for k in the equation 3^k + 1 = n. In the case where k is an integer, return k - 1, otherwise return the floor of the value. 
var base = n => Math.floor(Math.log(n) / Math.log(3)) == Math.log(n) / Math.log(3) ? Math.log(n) / Math.log(3) - 1 : Math.floor(Math.log(n) / Math.log(3));

// Compute the closest value to the input where it starts at 1 and iterate with a count until the input is reached. 
var main = () => {
	var start = (3 ** base(input)) + 1,
		length = (3 ** (base(input) + 1)) - start,
		count = 1;
	for(var i = 0; i < length; i++) {
		if(start == input) { break; }
		start++;
		i < (length / 2) - 1 ? count += 1 : count += 2;
	}
	console.log("The elf that gets all of the presents is " + count + ".");
};

main();