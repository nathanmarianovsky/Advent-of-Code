var fs = require("fs"),
	destinations = [],
	distances = [];

var permutator = function(inputArr) {
  var results = [];

	function permute(arr, memo) {
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
	}

  	return permute(inputArr);
};

var all_distances = function(permuted, distances) {
	var holder = [];
	for(var l = 0; l < permuted.length; l++) {
		var total = 0;
		for(var i = 0; i < permuted[l].length; i++) {
			for(var k = 0; k < distances.length; k++) {
				if(i + 1 != permuted[l].length) {
					if(((distances[k]["from"] == permuted[l][i]["value"]) && (distances[k]["to"] == permuted[l][i + 1]["value"])) || (distances[k]["to"] == permuted[l][i]["value"]) && (distances[k]["from"] == permuted[l][i + 1]["value"])) {
						total += parseInt(distances[k]["value"]);
					}
				}
			}
		}
		holder.push(total);
	}
	return holder;
};

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var collection = data.split("\n");
	for(var i = 0; i < collection.length; i++) {
		var set = collection[i].split(" ");
		if(set.length == 5){
			var m = -1,
				k = -1;
			for(var j = 0; j < destinations.length; j++) {
				if(destinations[j]["name"] == set[0]) { m = j; }
				if(destinations[j]["name"] == set[2]) { k = j; }
			}
			if(m == -1) {
				var obj = {
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
				var obj = {
					"name": set[2],
					"value": destinations.length
				};
				destinations.push(obj);
				var value2 = obj["value"];
			}
			else {
				var value2 = destinations[k]["value"];
			}
			var distance = {
				"value": set[4],
				"from": value1,
				"to": value2
			};
			distances.push(distance);
		}
	}
	var permuted = permutator(destinations);
	var possibilities = all_distances(permuted, distances);
	possibilities.sort();
	console.log("The shortest distance is: " + possibilities[possibilities.length - 1]);
});