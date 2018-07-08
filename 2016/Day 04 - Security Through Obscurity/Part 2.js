// Declare the necessary variables
var fs = require("fs"),
	_ = require("underscore"),
	jar = [],
	dictionary = {
		1: "a",
		2: "b",
		3: "c",
		4: "d",
		5: "e",
		6: "f",
		7: "g",
		8: "h",
		9: "i",
		10: "j",
		11: "k",
		12: "l",
		13: "m",
		14: "n",
		15: "o",
		16: "p",
		17: "q",
		18: "r",
		19: "s",
		20: "t",
		21: "u",
		22: "v",
		23: "w",
		24: "x",
		25: "y",
		26: "z"
	};

// Takes any letter in the alphabet and returns the next one.
var evolution = state => {
	var value = parseInt((_.invert(dictionary))[state]);
	if(value == 26) { return dictionary[1]; }
	else { return dictionary[value + 1]; }
};

// Read the file and parse. For each line determine the real name of the room and extract the id of the one containing keywords "north" and "pole".
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var container = data.split("\n").slice(0, data.split("\n").length - 1);
	container.forEach(line => {
		var name = "",
			arr = line.split("-"),
			tmp = arr[arr.length-1].split("["),
			sectord_id = parseInt(tmp[0]),
			checksum = tmp[1].slice(0, tmp[1].length - 1);
		for(var i = 0; i < arr.length; i++) {
			if(i != arr.length - 1) {
				var list = arr[i].split("");
				for(var k = 0; k < list.length; k++) {
					for(var w = 0; w < sectord_id; w++) { list[k] = evolution(list[k]); }
					name += list[k];
				}
				name += " ";
			}
		}
		var obj = {
			name: name,
			id: sectord_id
		};
		jar.push(obj);
	});
	jar.forEach(elem => {
		if(elem.name.search("north") != -1 && elem.name.search("pole") != -1) {
			console.log("The real name of the room is " + elem.name + "which has the sector id " + elem.id + ".");
		}
	});
});