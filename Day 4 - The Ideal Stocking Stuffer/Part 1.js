var md5 = require("md5"),
	input = "bgvyzdsv";

var check = function(str) {
	var result = md5(str),
		counter = 0;
	for(var i = 0; i < 5; i++) {
		if(result[i] == "0") { counter++; }
	}
	if(counter == 5) { return true; }
	else { return false; }
};

var find_result = function(str) {
	var counter = 0;
	while(!check(str + counter)) { counter++; }
	return counter;
};

console.log("The value is: " + find_result(input));