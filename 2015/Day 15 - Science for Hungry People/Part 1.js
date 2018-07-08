// Declare the necessary variable
var fs = require("fs"),
    assortment = [];

// Produces all possible subsets that form the desired target.
var subsets = (numbers, target, partial, length) => {
    var sum = 0, 
        current = 0, 
        remaining = [];
    partial = partial || [];
    sum = partial.reduce((a, b) => { return a + b; }, 0);
    if(sum === target && partial.length === length) { assortment.push(partial); }
    if(sum >= target || partial.length > length) { return; }
    for(var i = 0; i < numbers.length; i++) {
        current = numbers[i];
        remaining = numbers.slice(i + 1);
        partial.length <= length ? subsets(numbers, target, partial.concat([current]), length) : subsets(remaining, target, partial.concat([current]), length);
    }
};

// Read and parse. Once the ingredients are known, determine all possible subsets to form 100 teaspoons and calculate the score for each one. At the end report the highest one.
fs.readFile("input.txt", "utf8", (err, data) => {
    if(err) { throw err; }
    var holder = [],
        breakup = [],
        capacity = 0,
        durability = 0,
        flavor = 0,
        texture = 0,
        multiple = 0,
        results = [],
        teaspoons = [],
        collection = data.split("\n");
    collection.forEach(line => {
        if(line.length > 0) {
            breakup = line.split(" ");
            var obj = {
                "name": breakup[0].split(":")[0],
                "capacity": parseInt(breakup[2].split(",")[0]),
                "durability": parseInt(breakup[4].split(",")[0]),
                "flavor": parseInt(breakup[6].split(",")[0]),
                "texture": parseInt(breakup[8].split(",")[0]),
                "calories": parseInt(breakup[10].split(",")[0])
            };
            holder.push(obj);
        }
    });
    for(var l = 0; l <= 100; l++) { teaspoons.push(l); }
    subsets(teaspoons, 100, [], holder.length);
    assortment.forEach(combination => {
        capacity = 0;
        durability = 0;
        flavor = 0;
        texture = 0;
        for(var i = 0; i < holder.length; i++) {
            capacity += holder[i]["capacity"] * combination[i];
            durability += holder[i]["durability"] * combination[i];
            flavor += holder[i]["flavor"] * combination[i];
            texture += holder[i]["texture"] * combination[i];
        }
        capacity <= 0 || durability <= 0 || flavor <= 0 || texture <= 0 ? multiple = 0 : multiple = capacity * durability * flavor * texture;
        if(!results.some(elem => elem === multiple)) { results.push(multiple); }
    });
    results.sort((left, right) => right - left);
    console.log("The total score of the highest-scoring cookie is: " + results[0]);
});