var fs = require("fs"),
	total_sec = 2503;

var distances = (arr_of_obj, total_sec) => {
	var container = [];
	for(var i = 0; i < arr_of_obj.length; i++) {
		var total_time = arr_of_obj[i]["fly_time"] + arr_of_obj[i]["rest_time"],
			cycles = Math.floor(total_sec / total_time),
			travel = cycles * arr_of_obj[i]["fly_time"] * arr_of_obj[i]["speed"],
			remainder = total_sec - (cycles * total_time);
		for(var counter = 0; counter < remainder; counter++) {
			if(counter <= arr_of_obj[i]["fly_time"]) {
				travel += arr_of_obj[i]["speed"];
			}
		}
		container.push(travel);
	}
	container.sort();
	return container;
};

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
				"rest_time": parseInt(arr[13])
			};
			holder.push(obj);
		}
	}
	var container = distances(holder, total_sec);
	console.log("Longest Distance: " + container[container.length - 1]);
});