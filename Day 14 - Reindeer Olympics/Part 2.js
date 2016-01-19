// Declare the necessary variables
var fs = require("fs"),
	total_sec = 2503;

// Calculates the distance traveled by a reindeer in an allowed time.
var distance_in_time = (obj, current_time) => {
	var total_time = obj["fly_time"] + obj["rest_time"],
		cycles = Math.floor(current_time / total_time),
		travel = cycles * obj["fly_time"] * obj["speed"],
		remainder = current_time - (cycles * total_time);
	return (remainder >= obj["fly_time"] ? travel += obj["speed"] * obj["fly_time"] : travel += obj["speed"] * remainder);
};

// Calculates the total points each reindeer attains given the total allowed time. 
var traveler = (arr_of_obj, total_sec) => {
	for(var i = 1; i <= total_sec; i++) {
		for(var j = 0; j < arr_of_obj.length; j++) {
			arr_of_obj[j]["current_distance"] = distance_in_time(arr_of_obj[j], i);
		}
		arr_of_obj.sort(function(left, right) {
			return left["current_distance"] < right["current_distance"];
		});
		var biggest = arr_of_obj[0]["current_distance"];
		for(var l = 0; l < arr_of_obj.length; l++) {
			if(arr_of_obj[l]["current_distance"] == biggest) {
				arr_of_obj[l]["points"]++;
			}
			else { break; }
		}
	}
	return arr_of_obj;
};

// Read the file and parse. Create an array containing the reindeers and call on traveler to count the points for each one. The solution corresponds to the highest amount of points.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var collection = data.split("\n");
		holder = [];
	for(var i = 0; i < collection.length; i++) {
		if(collection[i].length > 0) {
			var arr = collection[i].split(" ");
			var obj = {
				"name": arr[0],
				"speed": parseInt(arr[3]),
				"fly_time": parseInt(arr[6]),
				"rest_time": parseInt(arr[13]),
				"points": 0,
				"current_distance": 0
			};
			holder.push(obj);
		}
	}
	var new_holder = traveler(holder, total_sec);
	new_holder.sort(function(left, right) {
		return left["points"] < right["points"];
	});
	console.log("Most Points: " + holder[0]["points"]);
});