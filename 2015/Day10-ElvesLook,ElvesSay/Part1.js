// Declare the necessary variables.
const input = "3113322113";

// Given a string create a new string based on the rules of 'look and say'.
var lookAndSay = param => {
	let result = "";
	if(param.length > 0) {
		const holderValue = [],
			holderLength = [];
		let iter = 1,
			current = param[0],
			counter = 1;
		while(true) {
			if(iter == param.length) {
				holderValue.push(current);
				holderLength.push(counter);
				break;
			}
			if(param[iter] == current) { counter++; }
			else {
				holderValue.push(current);
				holderLength.push(counter);
				current = param[iter];
				counter = 1;
			}
			iter++;
		}
		for(let k = 0; k < holderValue.length; k++) {
			result += holderLength[k] + holderValue[k];
		}
	}
	return result;
};

// Apply the 'look and say' rules 40 times. The solution corresponds to the length of the result attained from the 40th iteration.
let first = lookAndSay(input);
for(let i = 0; i < 39; i++) {
	first = lookAndSay(first);
}
console.log("The length of the result is " + first.length + ".");