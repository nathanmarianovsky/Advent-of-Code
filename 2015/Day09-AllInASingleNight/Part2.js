// Declare the necessary variables.
const fs = require("fs");

// Creates an array of all possible permutations.
var permutator = inputArr => {
  	let results = [];
	let permute = (arr, memo) => {
	    let cur = [];
	    var	memo = memo || [];
	    for(let i = 0; i < arr.length; i++) {
	      	cur = arr.splice(i, 1);
	      	if(arr.length === 0) {
	  		  	results.push(memo.concat(cur));
	      	}
	      	permute(arr.slice(), memo.concat(cur));
	      	arr.splice(i, 0, cur[0]);
	    }
	    return results;
	};
  	return permute(inputArr);
};

// Computes all of the distances for each possible permutation.
var allDistances = (permuted, distancesArr) => {
	const holder = [];
	for(let l = 0; l < permuted.length; l++) {
		let total = 0;
		for(let i = 0; i < permuted[l].length; i++) {
			for(let k = 0; k < distancesArr.length; k++) {
				if(i + 1 != permuted[l].length) {
					if(((distancesArr[k]["from"] == permuted[l][i]["value"]) && (distancesArr[k]["to"] == permuted[l][i + 1]["value"])) || 
						(distancesArr[k]["to"] == permuted[l][i]["value"]) && (distancesArr[k]["from"] == permuted[l][i + 1]["value"])) {
						total += parseInt(distancesArr[k]["value"]);
					}
				}
			}
		}
		holder.push(total);
	}
	return holder;
};

// Read the file and parse. Create all possible permutations where a number will identify a unique destination. Then all possible distances are computed. The solution corresponds to the longest distance.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n"),
		destinations = [],
		distances = [];
	for(let i = 0; i < collection.length; i++) {
		let set = collection[i].split(" ");
		if(set.length == 5){
			let m = -1,
				k = -1;
			for(let j = 0; j < destinations.length; j++) {
				if(destinations[j]["name"] == set[0]) { m = j; }
				if(destinations[j]["name"] == set[2]) { k = j; }
			}
			if(m == -1) {
				let obj = {
					"name": set[0],
					"value": destinations.length
				};
				destinations.push(obj);
				var value1 = obj["value"];
			}
			else {
				var value1 = destinations[m]["value"];
			}
			if(k == -1) {
				let obj = {
					"name": set[2],
					"value": destinations.length
				};
				destinations.push(obj);
				var value2 = obj["value"];
			}
			else {
				var value2 = destinations[k]["value"];
			}
			let distance = {
				"value": set[4],
				"from": value1,
				"to": value2
			};
			distances.push(distance);
		}
	}
	const possibilities = allDistances(permutator(destinations), distances);
	possibilities.sort();
	console.log("The distance of the longest route is " + possibilities[possibilities.length - 1] + ".");
});