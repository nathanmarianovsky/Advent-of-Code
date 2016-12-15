// Declare the necessary variables
var md5 = require("md5"),
	input = "qzyelonm",
	past = [],
	container = [];

// Returns the first character that forms a triplet in str.
var get_char = str => {
	var identifier = false;
	for(var i = 0; i < str.length; i++) {
		if(i + 2 < str.length) {
			if(str[i] == str[i+1] && str[i] == str[i+2]) {
				return str[i];
			}
		}
	}
	return "";
};

// Returns the index corresponding to the 64th key.
var driver = () => {
	var count = 0;
	while(container.length != 64) {
		var str = "";
		if(past[count] != undefined) { str = past[count]; }
		else {
			str = md5(input + count);
			for(var k = 0; k < 2016; k++) { str = md5(str); }
			past[count] = str;
		}
		var value = get_char(str);
		if(value != "") {
			for(var p = 1; p <= 1000; p++) {
				if(past[count+p] != undefined) { next_str = past[count+p]; }
				else {
					var tmp = count + p;
					var next_str = md5(input + tmp);
					for(var k = 0; k < 2016; k++) { next_str = md5(next_str); }
					past[count+p] = next_str;
				}
				if(next_str.indexOf(value + value + value + value + value) != -1) {
					container.push(input + count);
					break;
				}
			}
		}
		count++;
	}
	return count - 1;
};

console.log("The index corresponding to the 64th key using 2016 extra MD5 calls of key stretching is " + driver() + ".");