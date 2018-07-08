// Declare the necessary variables
var fs = require("fs");

// Read the file and parse. Execute each command and record the values of the registers as they change. In the end report the value for 'a'. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1),
		holder = [];
	for(var i = 0; i < container.length; i++) {
		var split = container[i].split(" ");
		if(isNaN(split[1]) && split[1] != undefined && holder.findIndex(elem => elem.letter == split[1]) == -1) {
			var obj = {
				letter: split[1],
				value: 0
			};
			if(split[1] == "a") { obj.value = 7; }
			holder.push(obj);
		}
		if(split[2] != undefined && isNaN(split[2]) && holder.findIndex(elem => elem.letter == split[2]) == -1) {
			var obj = {
				letter: split[2],
				value: 0
			};
			if(split[2] == "a") { obj.value = 7; }
			holder.push(obj);
		}
		if(split[0] == "cpy") {
			var count = 0;
			if(holder.some(elem => elem.letter == split[1])) {
				holder.forEach(iter => {
					if(iter.letter == split[1]) {
						count = iter.value;
					}
				});
			}
			else { count = parseInt(split[1]); }
			holder.forEach(iter => {
				if(iter.letter == split[2]) {
					iter.value = count;
				}
			});
		}
		else if(split[0] == "inc") {
			holder.forEach(elem => {
				if(elem.letter == split[1]) { elem.value++; }
			});
		}
		else if(split[0] == "dec") {
			holder.forEach(elem => {
				if(elem.letter == split[1]) { elem.value--; }
			});
		}
		else if(split[0] == "jnz") {
			var first = 0;
			!isNaN(split[1]) ? first = parseInt(split[1]) : first = holder[holder.findIndex(elem => elem.letter == split[1])].value;
			if(first != 0) {
				var second = 0;
				!isNaN(split[2]) ? second = parseInt(split[2]) : second = holder[holder.findIndex(elem => elem.letter == split[2])].value;
				i += second - 1;
			}
		}
		else if(split[0] == "tgl") {
			var pos = 0;
			!isNaN(split[1]) ? pos = i + parseInt(split[1]) : pos = i + holder[holder.findIndex(elem => elem.letter == split[1])].value;
			if(pos < container.length) {
				var arr = container[pos].split(" ");
				if(arr[0] == "inc") { container[pos] = "dec " + arr[1]; }
				else if(arr[0] == "dec" || arr[0] == "tgl") { container[pos] = "inc " + arr[1]; }
				else if(arr[0] == "jnz") { container[pos] = "cpy " + arr[1] + " " + arr[2]; }
				else if(arr[0] == "cpy") { container[pos] = "jnz " + arr[1] + " " + arr[2]; }
			}
		}
	}
	console.log("The value left in register 'a' post executing the assembunny code is " + holder[holder.findIndex(elem => elem.letter == "a")].value + ".");
});