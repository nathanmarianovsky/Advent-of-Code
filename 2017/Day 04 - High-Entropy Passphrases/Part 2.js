// Declare the necessary variables
var fs = require("fs");

// Returns false if a given array does not contain duplicates accounting for anagrams.
var duplicates = holder => {
    var sizearr = [];
    holder.sort((a,b) => {
        return a.length - b.length;
    });
    var min = holder[0].length,
        max = holder[holder.length-1].length;
    for(var p = min; p <= max; p++) {
        var tmp = [];
        for(var q = 0; q < holder.length; q++) {
            if(holder[q].length == p) { tmp.push(holder[q]); }
        }
        sizearr.push(tmp);
    }
    for(var i = 0; i < sizearr.length; i++) {
        if(sizearr[i].length > 1) {
            for(var j = 0; j < sizearr[i].length; j++) {
                for(var k = 0; k < sizearr[i].length; k++) {
                    if(j != k) {
                        if(sizearr[i][j].split("").sort().join("") == sizearr[i][k].split("").sort().join("")) {
                            return true;
                        }
                    }
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