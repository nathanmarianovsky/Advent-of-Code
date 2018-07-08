// Declare the necessary variables
var input = "3113322113";

// Given a string create a new string based on the rules of 'look and say'.
var look_and_say = param => {
	var result = "";
	if(param.length > 0) {
		var iter = 1,
			holder_value = [],
			holder_length = [],
			current = param[0],
			counter = 1;
		while(true) {
			if(iter == param.length) {
				holder_value.push(current);
				holder_length.push(counter);
				break;
			}
			if(param[iter] == current) { counter++; }
			else {
				holder_value.push(current);
				holder_length.push(counter);
				current = param[iter];
				counter = 1;
			}
			iter++;
		}
		for(var k = 0; k < holder_value.length; k++) {
			result += holder_length[k] + holder_value[k];
		}
	}
	return result;
};

// Apply the 'look and say' rules 50 times. The solution corresponds to the length of the result attained from the 50th iteration.
var first = look_and_say(input);
for(var i = 0; i < 49; i++) {
	first = look_and_say(first);
}
console.log("The length is: " + first.length);