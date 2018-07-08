// Declare the necessary variables
var fs = require("fs"),
	bots = [],
	bins = [];

// Read the file and parse. For each command execute if possible, otherwise move on. Iterate through the commands until all have been executed.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1);
	while(container.length != 1) {
		for(var p = 0; p < container.length; p++) {
			var arr = container[p].split(" ");
			if(arr[0] == "value") {
				if(bots.some(elem => elem.number == arr[5])) {
					bots.forEach(iter => {
						if(iter.number == arr[5]) {
							if(iter.value1 == null) {
								iter.value1 = arr[1];
							}
							else if(iter.value2 == null) {
								iter.value2 = arr[1];
							}
						}
					});
				} 
				else {
					var obj = {
						number: arr[5],
						value1: arr[1],
						value2: null
					};
					bots.push(obj);
				}
				container.splice(p, 1);
			}
			else {
				for(var k = 0; k < bots.length; k++) {
					if(bots[k].number == arr[1] && bots[k].value1 != null && bots[k].value2 != null) {
						if(arr[5] == "bot") {
							if(bots.some(elem => elem.number == arr[6])) {
								bots.forEach(bot => {
									if(bot.number == arr[6]) {
										if(bot.value1 == null) {
											parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bot.value1 = bots[k].value2 : bot.value1 = bots[k].value1;
										}
										else if(bot.value1 != null && bot.value2 == null) {
											parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bot.value2 = bots[k].value2 : bot.value2 = bots[k].value1;
										}
									}
								});
							}
							else {
								var lower = 0;
								parseInt(bots[k].value1) > parseInt(bots[k].value2) ? lower = bots[k].value2 : lower = bots[k].value1;
								var obj = {
									number: arr[6],
									value1: lower,
									value2: null
								};
								bots.push(obj);
							}
						}
						else if(arr[5] == "output") {
							parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bins[parseInt(arr[6])] = bots[k].value2 : bins[parseInt(arr[6])] = bots[k].value1;
						}
						if(arr[10] == "bot") {
							if(bots.some(elem => elem.number == arr[11])) {
								bots.forEach(bot => {
									if(bot.number == arr[11]) {
										if(bot.value1 == null) {
											parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bot.value1 = bots[k].value1 : bot.value1 = bots[k].value2;
										}
										else if(bot.value1 != null && bot.value2 == null) {
											parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bot.value2 = bots[k].value1 : bot.value2 = bots[k].value2;
										}
									}
								});
							}
							else {
								var higher = 0;
								parseInt(bots[k].value1) > parseInt(bots[k].value2) ? higher = bots[k].value1 : higher = bots[k].value2;
								var obj = {
									number: arr[11],
									value1: higher,
									value2: null
								};
								bots.push(obj);
							}
						}
						else if(arr[10] == "output") {
							parseInt(bots[k].value1) > parseInt(bots[k].value2) ? bins[parseInt(arr[11])] = bots[k].value1 : bins[parseInt(arr[11])] = bots[k].value2;
						}
						container.splice(p, 1);
					}
				}
			}
		}
	}
	console.log("The number attained by multiplying the values corresponding to outputs 0, 1, and 2 is " + (parseInt(bins[0]) * parseInt(bins[1]) * parseInt(bins[2])) + ".");
});