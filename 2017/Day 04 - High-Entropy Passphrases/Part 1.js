// Declare the necessary variables
var fs = require("fs");

// Returns false if a given array does not contain duplicates.
var duplicates = holder => {
    for(var j = 0; j < holder.length; j++) {
        for(var k = 0; k < holder.length; k++) {
            if(j != k) {
                if(holder[j] == holder[k]) {
                    return true;
                }
            }
        }
    }
    return false;
};

// Read the file and parse. For each row check for duplicates and keep a count of the valid passphrases.
fs.readFile("input.txt", "utf8", function(err, data) {
	if(err) { throw err; }
	var	container = data.split("\n"),
		sum = 0;
	container.splice(container.length - 1,1);
	container.forEach(iter => {
		var arr = iter.split(" ");
		if(!duplicates(arr)) { 
			sum++;; 
		}
	});
	console.log("The number of valid passphrases is " + sum + ".");
});