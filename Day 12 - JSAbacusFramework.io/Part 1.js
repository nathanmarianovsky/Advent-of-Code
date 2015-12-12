var fs = require("fs"),
	counter = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	for(var i = 0; i < data.length;) {
		var total = 0;
		if(data[i] == "-") {
			if(!isNaN(parseInt(data[i + 1]))) {
				for(var p = i + 1; p < data.length; p++) {
					if(isNaN(parseInt(data[p]))) { break; }
					total++;
				}
				var new_str = "";
				for(var k = i + 1; k < total + i + 1; k++) {
					new_str += data[k];
					console.log(new_str);
				}
				// if(new_str.length > 0) {
					counter -= parseInt(new_str);
				// }
				total++;
			}
		}
		else if(!isNaN(parseInt(data[i]))) {
			for(var p = i; p < data.length; p++) {
				if(isNaN(parseInt(data[p]))) { break; }
				total++;
			}
			var new_str = "";
			for(var k = i; k < total + i; k++) {
				new_str += data[k];
				console.log(new_str);
			}
			// if(new_str.length > 0) {
				counter += parseInt(new_str);
			// }
		}
		if(total > 0) { i += total; }
		else { i++; }
	}
	console.log("Total:" + counter);
});