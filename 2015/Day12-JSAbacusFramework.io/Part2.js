// Declare the necessary variables.
const input = require("./input.json");	
		
// Object to evaluate different functions based on the type of data.		
const type = {		
	"number": val => val,		
	"string": val => 0,		
    "object": val => check(0, val)		
};		
		
// Arrays are handled exactly the same as objects.		
type["array"] = type["object"];		
		
// Counts the total sum of all numbers except for the objects with a 'red' value.		
var check = (total, node) => {		
	const values = Object.keys(node).map(key => node[key]),		
		isArr = Object.prototype.toString.call(node) == "[object Array]";		
	if((!isArr) && (values.some(value => value === "red"))) { return 0; }		
	return values.map(val => type[typeof val](val)).reduce((total, current) => total + current, 0);		
};		
		
// The solution corresponds to running the check function on the given JSON data.		
console.log("The sum of all numbers not associated to the value 'red' in the document is " + check(0, input) + ".");