// Declare the necessary variables
var fs = require("fs"),
	holder = [],
	names = [],
	totals = [];

// Creates an array of all possible permutations.
var permutator = input_arr => {
  	var results = [];

	var permute = (arr, memo) => {
	    var cur, memo = memo || [];
	    for (var i = 0; i < arr.length; i++) {
	      	cur = arr.splice(i, 1);
	      	if (arr.length === 0) {
	  		  	results.push(memo.concat(cur));
	      	}
	      	permute(arr.slice(), memo.concat(cur));
	      	arr.splice(i, 0, cur[0]);
	    }
	    return results;
	};

  	return permute(input_arr);
};

// Adds myself to the list of people where everyone has an amount of zero towards me and vice versa.
var add_myself = (holder, names) => {
	for(var k = 0; k < holder.length; k++) {
		var	sub = {
			"change": "gain",
			"amount": 0,
			"name": "Nathan"
		};
		holder[k]["effects"].push(sub);
	}
	var sub_arr = [];
	for(var m = 0; m < names.length; m++) {
		var	sub = {
			"change": "gain",
			"amount": 0,
			"name": names[m]
		};
		sub_arr.push(sub);
	}
	var obj = {
		"name": "Nathan",
		"effects": sub_arr
	};
	holder.push(obj);
	names.push("Nathan");
};

// Read the file and parse. Create an array containing all of the changes in happiness according to a pair of people. Find all possible permutations of arrangements and count the happiness for each one. The solution corresponds to the highest happiness change.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			var current = collection[i].split(" "),
				check = -1;
			current[current.length - 1] = current[current.length - 1].split(".")[0];
			for(var j = 0; j < holder.length; j++) {
				if(holder[j]["name"] == current[0]) { 
					check = j;
					break;
				}
			}
			if(check == -1) {
				var sub_arr = [];
				var	sub = {
					"change": current[2],
					"amount": parseInt(current[3]),
					"name": current[10]
				};
				sub_arr.push(sub);
				var obj = {
					"name": current[0],
					"effects": sub_arr
				};
				holder.push(obj);
				names.push(current[0]);
			}
			else {
				var	sub = {
					"change": current[2],
					"amount": parseInt(current[3]),
					"name": current[10]
				};
				holder[check]["effects"].push(sub);
			}
		}
	}
	add_myself(holder, names);
	var permuted = permutator(names);
	for(var k = 0; k < permuted.length; k++) {
		var current_setup = permuted[k];
		if(current_setup.length > 0) {
			var total = 0;
			for(var p = 0; p < current_setup.length; p++) {
				if(p == 0) {
					var front = current_setup[p + 1],
						back = current_setup[current_setup.length - 1];
				}
				else if(p == current_setup.length - 1) {
					var back = current_setup[p - 1],
						front = current_setup[0];
				}
				else {
					var back = current_setup[p - 1],
						front = current_setup[p + 1];
				}
				for(var l = 0; l < holder.length; l++) {
					if(holder[l]["name"] == current_setup[p]) {
						for(var n = 0; n < holder[l]["effects"].length; n++) {
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
	totals.sort(function(left, right) {
		return right - left;
	});
	console.log("The biggest value is: " + totals[0]);
});