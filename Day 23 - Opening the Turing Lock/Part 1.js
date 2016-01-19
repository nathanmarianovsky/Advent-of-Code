// Declare the necessary variables
var fs = require("fs");

// Define type object to call on different actions based on the instructions.
var type = {
	"hlf": function(obj) { obj["value"] = Math.floor(obj["value"] / 2); },
	"tpl": function(obj) { obj["value"] = obj["value"] * 3; },
	"inc": function(obj) { obj["value"]++; }
};

// Read the file and parse. Execute the instructions per line on the registers that both start at zero. The solution corresponds to the value in register b at the end.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var a = {
		"name": "a",
		"value": 0
	};
	var b = {
		"name": "b",
		"value": 0
	};
	var collection = data.split("\n"),
		i = 0;
	collection.splice(collection.length - 1, 1);
	while(i < collection.length) {
		var current = collection[i].split(" ");
		if(current.length == 2) {
			if((current[0] == "hlf") && (current[1] == "a")) { type["hlf"](a); i++; }
			else if((current[0] == "hlf") && (current[1] == "b")) { type["hlf"](b); i++; }
			else if((current[0] == "tpl") && (current[1] == "a")) { type["tpl"](a); i++; }
			else if((current[0] == "tpl") && (current[1] == "b")) { type["tpl"](b); i++; }
			else if((current[0] == "inc") && (current[1] == "a")) { type["inc"](a); i++; }
			else if((current[0] == "inc") && (current[1] == "b")) { type["inc"](b); i++; }
			else if(current[0] == "jmp") { i += parseInt(current[1]); }
		}
		else if(current.length == 3) {
			current[1] = current[1].split(",")[0];
			if((current[0] == "jie") && (current[1] == "a") && (a["value"] % 2 == 0)) { i += parseInt(current[2]); }
			else if((current[0] == "jie") && (current[1] == "b") && (b["value"] % 2 == 0)) { i += parseInt(current[2]); }
			else if((current[0] == "jio") && (current[1] == "a") && (a["value"] == 1)) { i += parseInt(current[2]); }
			else if((current[0] == "jio") && (current[1] == "b") && (b["value"] == 1)) { i += parseInt(current[2]); }
			else { i++; }
		}
	}
	console.log("The value of 'b' is: " + b["value"]);
});