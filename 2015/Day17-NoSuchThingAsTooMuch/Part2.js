// Declare the necessary variables.
const fs = require("fs");

// Produces all possible subsets that form the desired target.
var subsets = (numbers, target, partial, assortmentArr) => {
    let sum = 0, 
        current = 0, 
        remaining = [];
    partial = partial || [];
    sum = partial.reduce((a, b) => a + b, 0);
    if(sum === target) { assortmentArr.push(partial); }
    if(sum >= target) { return; }
    for(let i = 0; i < numbers.length; i++) {
        current = numbers[i];
        remaining = numbers.slice(i + 1);
        subsets(remaining, target, partial.concat([current]), assortmentArr);
    }
};

// Read and parse. Once all of the allowed numbers and target are known, determine all possible minimum subsets and state how many there are.
fs.readFile("input.txt", "utf8", (err, data) => {
    if(err) { throw err; }
    const assortment = [];
        collection = data.split("\n");
    collection.splice(collection.length - 1, 1);
    collection = collection.map(elem => parseInt(elem));
    subsets(collection, 150, [], assortment);
    assortment.sort((left, right) => left.length - right.length);
    const min = assortment[0].length;
    let k = 1;
    for(; k < assortment.length; k++) {
        if(assortment[k].length != min) { break; }
    }
    console.log("The number of distinct ways to fill the minimum number of containers to hold exactly 150 liters is " + k + ".");
});