// Declare the necessary variables
var fs = require("fs"),
	input = "abcdefgh";

// Read the file and parse. Scramble the given input according to the rules described and return the result.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		cur = input.split("");
	container.forEach(line => {
		var arr = line.split(" ");
		if(arr[0] == "swap") {
			if(arr[1] == "position") {
				var first = parseInt(arr[2]),
					second = parseInt(arr[5].slice(0, arr[5].indexOf("\r"))),
					holder = cur[first];
				cur[first] = cur[second];
				cur[second] = holder;
			}
			else if(arr[1] == "letter") {
				var first_index = cur.indexOf(arr[2]),
					second_index = cur.indexOf(arr[5].slice(0, arr[5].indexOf("\r"))),
					holder = cur[first_index];
				cur[first_index] = cur[second_index];
				cur[second_index] = holder;
			}
		}
		else if(arr[0] == "rotate") {
			var length = input.length,
				list = [];
			if(arr[1] == "left") {
				for(var k = 0; k < cur.length; k++) {
					var index = (k - parseInt(arr[2])) % length;
					if(index < 0) { index += length; }
					list[index] = cur[k];
				}
				cur = list;
			}
			else if(arr[1] == "right") {
				for(var k = 0; k < cur.length; k++) {
					var index = (k + parseInt(arr[2])) % length;
					list[index] = cur[k];
				}
				cur = list;
			}
			else if(arr[1] == "based") {
				var num = cur.indexOf(arr[6].slice(0, arr[6].indexOf("\r"))),
					rotation = 0;
				num >= 4 ? rotation = 2 + num : rotation = 1 + num;
				for(var k = 0; k < cur.length; k++) {
					var index = (k + rotation) % length;
					list[index] = cur[k];
				}
				cur = list;
			}
		}
		else if(arr[0] == "reverse") {
			var start = parseInt(arr[2]),
				end = parseInt(arr[4].slice(0, arr[4].indexOf("\r"))),
				list = cur.slice(start, end + 1);
			list.reverse();
			cur = ((cur.slice(0, start)).concat(list)).concat(cur.slice(end + 1));
		}
		else if(arr[0] == "move") {
			var position1 = parseInt(arr[2]),
				position2 = parseInt(arr[5].slice(0, arr[5].indexOf("\r"))),
				item = cur[position1];
			cur.splice(position1, 1);
			cur.splice(position2, 0, item);
		}
	});
	console.log("The result of the scrambling is " + cur.join("") + ".");
});