// Declare the necessary variable
var fs = require("fs"),
    assortment = [];

// Produces all possible subsets that form the desired target.
var subsets = (numbers, target, partial) => {
    var sum = 0, 
        current = 0, 
        remaining = [];
    partial = partial || [];
    sum = partial.reduce((a, b) => { return a + b; }, 0);
    if(sum === target) { assortment.push(partial); }
    if(sum >= target) { return; }
    for(var i = 0; i < numbers.length; i++) {
        current = numbers[i];
        remaining = numbers.slice(i + 1);
        subsets(remaining, target, partial.concat([current]));
    }
};

// Read and parse. Once all of the allowed numbers and target are known, determine all possible subsets and compute the QE for the one with the least amount of numbers used.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var holder = [],
        breakups = [],
	    collection = data.split("\n");
	collection.splice(collection.length - 1, 1);
	collection = collection.map(elem => parseInt(elem));
    subsets(collection, collection.reduce((a,b) => a + b) / 4);
	assortment.sort((left, right) => left.length - right.length);
	var ideal_limit = assortment[0].length,
		k = 1;
	for(; k < assortment.length; k++) {
		if(assortment[k].length !== ideal_limit) {
			break;
		}
	}
	for(var j = 0; j <= k; j++) {
		var QE = assortment[j].reduce((left, right) => left * right, 1);
		holder.push(QE);
	}
	holder.sort((left, right) => left - right);
	console.log("The QE of the ideal configuration is: " + holder[0]);
});