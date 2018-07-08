// Declare the necessary variables
var fs = require("fs"),
	counter = 0;

// Read the file and parse. For each line determine if it is a real room and add its sector id to the counter if it is.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1);
	container.forEach(line => {
		var alphabet = [],
			arr = line.split("-");
		for(var i = 0; i < arr.length; i++) {
			if(i != arr.length - 1) {
				var list = arr[i].split("");
				for(var k = 0; k < list.length; k++) {
					if(alphabet.some(elem => elem.letter == list[k])) {
						alphabet.forEach(obj => {
							if(obj.letter == list[k]) { obj.count++; }
						});
					}
					else {
						var obj = {
							letter: list[k],
							count: 1
						};
						alphabet.push(obj);
					}
				}
			}
			else {
				var tmp = arr[i].split("["),
					sectord_id = parseInt(tmp[0]),
					checksum = tmp[1].slice(0,tmp[1].length - 1);
				alphabet.sort((lhs, rhs) => {
					if(lhs.count < rhs.count) { return 1; }
					else if(lhs.count > rhs.count) { return -1; }
					else if(lhs.count == rhs.count) {
						if(lhs.letter > rhs.letter) { return 1; }
						else if(lhs.letter < rhs.letter) { return -1; }
					}
				});
				var compare = "";
				for(var p = 0; p < 5; p++) {
					compare += alphabet[p].letter;
				}
				if(compare == checksum) { counter += sectord_id; }
			}
		}
	});
	console.log("The sum of the sectod IDs of the real rooms is " + counter + ".");
});