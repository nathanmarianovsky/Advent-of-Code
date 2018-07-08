// Declare the necessary variables
var fs = require("fs"),
	count = 0;

// Finds all ABA components of a given string.
var check = str => {
	var holder = [];
	for(var j = 0; j < str.length; j++) {
		if(j + 2 < str.length) {
			var letter1 = str[j],
				letter2 = str[j+1];
			if(letter1 == str[j+2] && letter1 != letter2) {
				contained = true;
				if(!holder.some(elem => elem == letter1 + letter2 + letter1)) { holder.push(letter1 + letter2 + letter1); }
			}
		}
	}
	return holder;
};

// Read the file and parse. For each line break up the strings from the brackets and analyze the strings. Find all ABA components and for each hypernet string attempt to find its corresponding BAB component.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1);
	container.forEach(line => {
		var condition = false,
			arr = [],
			hypernet = [];
		for(var i = 0; i < line.length; i++) {
			var expression = ""
			while((line[i] != "[" && line[i] != "]") && i < line.length) {
				expression += line[i];
				i++;
			}
			if(line[i] == "[" || i == line.length) {
				if(check(expression).length > 0) {
					arr = arr.concat(check(expression));
				}
			}
			else if(line[i] == "]") {
				hypernet.push(expression);
			}
		}
		for(var p = 0; p < arr.length; p++) {
			var new_iter = arr[p][1] + arr[p][0] + arr[p][1];
			hypernet.forEach(iter => {
				if(iter.indexOf(new_iter) != -1) { condition = true; }
			});
		}
		if(condition == true) { count++; }
	});
	console.log("The number of IPs that support SSL is exactly " + count + ".");
});