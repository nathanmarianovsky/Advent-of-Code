// Declare the necessary variable
var fs = require("fs"),
    assortment = [];

// Produces all possible subsets that form the desired target.
var subsets = (numbers, target, partial) => {
    var sum = 0, 
        current = 0, 
        remaining = [];
    partial = partial || [];
    sum = partial.reduce((a, b) => a + b, 0);
    if(sum === target) { assortment.push(partial); }
    if(sum >= target) { return; }
    for (var i = 0; i < numbers.length; i++) {
        current = numbers[i];
        remaining = numbers.slice(i + 1);
        subsets(remaining, target, partial.concat([current]));
    }
};

// Read and parse. Once all of the allowed numbers and target are known, determine all possible subsets and state how many there are.
fs.readFile("input.txt", "utf8", (err, data) => {
    if(err) { throw err; }
    var holder = [],
        breakups = [],
        collection = data.split("\n");
    collection.splice(collection.length - 1, 1);
    collection = collection.map(elem => parseInt(elem));
    subsets(collection, 150);
    console.log("The number of combinations is: " + assortment.length);
});