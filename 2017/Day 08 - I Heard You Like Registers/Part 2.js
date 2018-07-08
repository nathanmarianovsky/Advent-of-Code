// Declare the necessary variables
var fs = require("fs"),
	db = [];

// Object helps convert the given strings into operators.
var conversion = {
	"<": (x,y) => x < y,
	">": (x,y) => x > y,
	"<=": (x,y) => x <= y,
	">=": (x,y) => x >= y,
	"==": (x,y) => x == y,
	"!=": (x,y) => x != y
};

// Read the file and parse. Perform the necessary operations and find the largest value.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n"),
		completion = [];
	container.splice(container.length - 1,1);
	container.forEach(elem => {
		var line = elem.split(" ");
		if(db[line[0]] == undefined) { db[line[0]] = 0; }
		if(db[line[4]] == undefined) { db[line[4]] = 0; }
		if(conversion[line[5]](db[line[4]],parseInt(line[6]))) {
			line[1] == "inc" ? db[line[0]] += parseInt(line[2]) : db[line[0]] -= parseInt(line[2]);
		}
		var iterator = Object.keys(db);
		for(let key of iterator) {
			completion.push(db[key]);
		}
	});
	completion.sort((lhs,rhs) => rhs - lhs);
	console.log("The largest value in any register at any given moment is " + completion[0] + ".");
});