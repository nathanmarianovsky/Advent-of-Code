// Declare the necessary variables
var fs = require("fs");

// Returns an array containing all possible rule changes.
var possibilities = (phrase, rules) => {
	var holder = [],
		perm = "";
	for(var i = 0; i < phrase.length; i++) {
		rules.forEach(rule => {
			perm = "";
			if(rule.length == 1) {
				if(rule.letters === phrase[i]) {
					perm = phrase.substring(0, i) + rule.result + phrase.substring(i + 1);
				}
			}
			else if(rule.length == 2) {
				if(i + 1 != phrase.length) {
					if(rule.letters === phrase[i] + phrase[i + 1]) {
						perm = phrase.substring(0, i) + rule.result + phrase.substring(i + 2);
					}
				}
			}
			if(!holder.some(elem => elem === perm) && perm !== "") {
				holder.push(perm);
			}
		});
	}
	return holder;
};

// Read and parse. For each rule create an object and pass the collection of rules and phrase to the possibilities function.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var collection = data.split("\n"),
		rules = [],
		phrase = "";
	for(var i = 0; i < collection.length - 3; i++) {
		var tmp = collection[i].split("=>");
		var obj = {
			"letters": tmp[0].substring(0, tmp[0].length - 1),
			"length": tmp[0].length - 1,
			"result": tmp[1].substring(1, tmp[1].length)
		};
		rules.push(obj);
	}

	phrase = collection[collection.length - 2];
	console.log("The number of unique molecules is: " + possibilities(phrase, rules).length);
});