var input = require("./input.json");

var type = {
	"number": function(val) { return val; },
	"string": function(val) { return 0; },
	"object": function(val) { return check(0, val); }
};

type["array"] = type["object"];

var check = (total, node) => {
	var values = Object.keys(node).map(key => node[key]),
		is_arr = Object.prototype.toString.call(node) == "[object Array]";
	if((!is_arr) && (values.some(value => value === "red"))) { return 0; }
	return values.map(val => type[typeof val](val))
		.reduce((total, current) => total + current, 0);
};

console.log("Total: " + check(0, input));