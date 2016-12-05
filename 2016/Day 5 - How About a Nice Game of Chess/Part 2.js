// Declare the necessary variables
var md5 = require("md5"),
	output = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	input = "ffykfhsq";

// Checks whether or not a given string has an md5 hash with five leading zeros.
var check = str => {
	var result = md5(str),
		counter = 0;
	for(var i = 0; i < 5; i++) {
		if(result[i] == "0") { counter++; }
	}
	if(counter == 5) { return true; }
	else { return false; }
};

// Extracts the 6th and 7th characters of a md5 hash.
var extract = str => { 
	var holder = md5(str);
	return [parseInt(holder[5]), holder[6]]; 
};

// For a given input the function determines the smallest natural number such that the md5 hash of the combined string (input + number) has five leading zeros.
var find_result = (str, start) => {
	var counter = start;
	while(!check(str + counter)) { counter++; }
	return counter;
};

// Loops through until the whole password is generated.
var count = 0;
while(output.some(elem => elem == undefined)) {
	count = find_result(input, count + 1);
	var extraction = extract(input + count.toString());
	if(extraction[0] >= 0 && extraction[0] <= 7 && extraction[0] !== NaN) {
		if(output[extraction[0]] == undefined) {
			output[extraction[0]] = extraction[1];
		}
	}
}

var password = "";
for(var j = 0; j < output.length; j++) {
	password += output[j];
}

console.log("The password for the security door is " + password + ".");