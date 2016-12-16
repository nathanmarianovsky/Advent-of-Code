// Declare the necessary variables		
 var input = require("./input.json");		
 		
 // Object to evaluate different functions based on the type of data.		
 var type = {		
 	"number": function(val) { return val; },		
 	"string": function(val) { return 0; },		
 	"object": function(val) { return check(0, val); }		
 };		
 		
 // Arrays are handled exactly the same as objects.		
 type["array"] = type["object"];		
 		
 // Counts the total sum of all numbers except for the objects with a 'red' value.		
 var check = (total, node) => {		
 	var values = Object.keys(node).map(key => node[key]),		
 		is_arr = Object.prototype.toString.call(node) == "[object Array]";		
 	if((!is_arr) && (values.some(value => value === "red"))) { return 0; }		
 	return values.map(val => type[typeof val](val))		
 		.reduce((total, current) => total + current, 0);		
 };		
 		
 // The solution corresponds to running the check function on the given JSON data.		
 console.log("Total: " + check(0, input));