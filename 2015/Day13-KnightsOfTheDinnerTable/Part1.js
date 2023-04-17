// Declare the necessary variables.
const fs = require("fs");

// Creates an array of all possible permutations.
var permutator = input_arr => {
  	let results = [];
	let permute = (arr, memo) => {
	    let cur = [];
	    var memo = memo || [];
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
  	return permute(input_arr);
};

// Read the file and parse. Create an array containing all of the changes in happiness according to a pair of people. Find all possible permutations of arrangements and count the happiness for each one. The solution corresponds to the highest happiness change.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n"),
		holder = [],
		names = [],
		totals = [];
	for(let i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			let current = collection[i].split(" "),
				check = -1;
			current[current.length - 1] = current[current.length - 1].split(".")[0];
			for(let j = 0; j < holder.length; j++) {
				if(holder[j]["name"] == current[0]) { 
					check = j;
					break;
				}
			}
			if(check == -1) {
				let sub_arr = [];
				let	sub = {
					"change": current[2],
					"amount": parseInt(current[3]),
					"name": current[10]
				};
				sub_arr.push(sub);
				let obj = {
					"name": current[0],
					"effects": sub_arr
				};
				holder.push(obj);
				names.push(current[0]);
			}
			else {
				let	sub = {
					"change": current[2],
					"amount": parseInt(current[3]),
					"name": current[10]
				};
				holder[check]["effects"].push(sub);
			}
		}
	}
	const permuted = permutator(names);
	for(let k = 0; k < permuted.length; k++) {
		let currentSetup = permuted[k];
		if(currentSetup.length > 0) {
			let total = 0;
			for(let p = 0; p < currentSetup.length; p++) {
				if(p == 0) {
					var front = currentSetup[p + 1],
						back = currentSetup[currentSetup.length - 1];
				}
				else if(p == currentSetup.length - 1) {
					var back = currentSetup[p - 1],
						front = currentSetup[0];
				}
				else {
					var back = currentSetup[p - 1],
						front = currentSetup[p + 1];
				}
				for(let l = 0; l < holder.length; l++) {
					if(holder[l]["name"] == currentSetup[p]) {
						for(let n = 0; n < holder[l]["effects"].length; n++) {
							if((holder[l]["effects"][n]["name"] == front) || (holder[l]["effects"][n]["name"] == back)) {
								holder[l]["effects"][n]["change"] == "lose" ? total -= holder[l]["effects"][n]["amount"] : total += holder[l]["effects"][n]["amount"];
							}
						}
					}
				}
			}
			totals.push(total);
		}
	}
	totals.sort((left, right) => right - left);
	console.log("The total change in happiness for the optimal seating arrangement is " + totals[0] + ".");
});