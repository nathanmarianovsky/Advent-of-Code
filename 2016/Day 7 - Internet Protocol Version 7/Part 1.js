// Declare the necessary variables
var fs = require("fs"),
	count = 0;

// Checks if a given string contains an ABBA.
var check = str => {
	var contained = false;
	for(var j = 0; j < str.length; j++) {
		if(j + 3 < str.length) {
			var letter1 = str[j],
				letter2 = str[j+1];
			if(letter1 == str[j+3] && letter2 == str[j+2] && letter1 != letter2) {
				contained = true;
				break;
			}
		}
	}
	return contained;
};

// Read the file and parse. For each line break up the strings from the brackets and analyze the strings. For each string note whether it is outside or inside and change the condition accordingly.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var container = data.split("\n");
	container.forEach(line => {
		if(line.length > 0) {
			var condition = false;
			for(var i = 0; i < line.length; i++) {
				var expression = ""
				while((line[i] != "[" && line[i] != "]") && i < line.length) {
					expression += line[i];
					i++;
				}
				if(line[i] == "[" || i == line.length) {
					if(check(expression)) { 
						condition = true;
					}
				}
				else if(line[i] == "]") {
					if(check(expression)) {
						condition = false;
						break;
					}
				}
			}
			if(condition == true) { count++; }
		}
	});
	console.log("The number of IPs that support TLS is exactly " + count + ".");
});