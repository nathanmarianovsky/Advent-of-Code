// Declare the necessary variable
var fs = require("fs");

// Returns a set containing all possible subsets of the allowed numbers that form the target.
var subsets = (numbers, target) => {
    numbers = numbers.filter((value) => {
        return value <= target;
    });

    numbers.sort((a, b) => {
        return b - a;
    });

    var result = [];

    while(numbers.length > 0) {
        var i = 0,
        	sum = 0,
        	added_indices = [];
        for(; i < numbers.length; i++) {
            if(sum + numbers[i] <= target) {
                sum += numbers[i];
                added_indices.push(i);
            }
        }
        var subset = [];
        for(i = added_indices.length - 1; i >= 0; i--) {
            subset.unshift(numbers[added_indices[i]]);
            numbers.splice(added_indices[i], 1);
        }
        result.push(subset);
    }

    for(var k = 0; k < result.length; k++) {
    	var sum = result[k].reduce((left, right) => { return left + right; });
    	if(sum !== target) { result.splice(k, 1); }
    }

    return result;
}

// Read and parse. Once all of the allowed numbers and target are known, determine all possible subsets and compute the QE for the one with the least amount of numbers used.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var holder = [],
		collection = data.split("\n");
	collection.splice(collection.length - 1, 1);
	collection = collection.map(elem => parseInt(elem));
	var breakups = subsets(collection, collection.reduce((a,b) => { return a + b; }) / 3);
	breakups.sort((left, right) => {
		return left.length - right.length;
	});
	var ideal_limit = breakups[0].length,
		k = 1;
	for(; k < breakups.length; k++) {
		if(breakups[k].length !== ideal_limit) {
			break;
		}
	}
	for(var j = 0; j <= k; j++) {
		var QE = breakups[j].reduce((left, right) => { return left * right; });
		holder.push(QE);
	}
	holder.sort((left, right) => {
		return left - right;
	});
	console.log("The QE of the ideal configuration is: " + holder[0]);
});