var fs = require("fs"),
	counter = 0;

fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	for(var i = 0; i < data.length;) {
		var total = 0,
			new_str = "";
		if(data[i] == "-") {
			if(!isNaN(parseInt(data[i + 1]))) {
				for(var p = i + 1; p < data.length; p++) {
					if(!isNaN(parseInt(data[p]))) { 
						new_str += data[p];	
						total++;
					}
					else { break; }
				}
				counter -= parseInt(new_str);
				total++;
			}
		}
		else if(!isNaN(parseInt(data[i]))) {
			for(var p = i; p < data.length; p++) {
				if(!isNaN(parseInt(data[p]))) { 
					new_str += data[p];
					total++;
				}
				else { break; }
			}
			counter += parseInt(new_str);
		}
		if(total > 0) { i += total; }
		else { i++; }
	}
	console.log("Total:" + counter);
});