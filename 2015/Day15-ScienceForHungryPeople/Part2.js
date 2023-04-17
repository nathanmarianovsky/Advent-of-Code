// Declare the necessary variables.
const fs = require("fs");

// Produces all possible subsets that form the desired target.
var subsets = (numbers, target, partial, length, assortmentArr) => {
    let sum = 0, 
        current = 0, 
        remaining = [];
    partial = partial || [];
    sum = partial.reduce((a, b) => a + b, 0);
    if(sum === target && partial.length === length) { assortmentArr.push(partial); }
    if(sum >= target || partial.length > length) { return; }
    for(let i = 0; i < numbers.length; i++) {
        current = numbers[i];
        remaining = numbers.slice(i + 1);
        partial.length <= length ? subsets(numbers, target, partial.concat([current]), length, assortmentArr) : subsets(remaining, target, partial.concat([current]), length, assortmentArr);
    }
};

// Read and parse. Once the ingredients are known, determine all possible subsets to form 100 teaspoons and calculate the score for each one and consider only the ones with 500 calories. At the end report the highest one.
fs.readFile("input.txt", "utf8", (err, data) => {
    if(err) { throw err; }
    const holder = [],
        assortment = [];
    let breakup = [],
        capacity = 0,
        durability = 0,
        flavor = 0,
        texture = 0,
        multiple = 0,
        calories = 0,
        results = [],
        teaspoons = [],
        collection = data.split("\n");
    collection.forEach(line => {
        if(line.length > 0) {
            breakup = line.split(" ");
            let obj = {
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
    for(let l = 0; l <= 100; l++) { teaspoons.push(l); }
    subsets(teaspoons, 100, [], holder.length, assortment);
    assortment.forEach(combination => {
        capacity = 0;
        durability = 0;
        flavor = 0;
        texture = 0;
        calories = 0;
        for(let i = 0; i < holder.length; i++) {
            capacity += holder[i]["capacity"] * combination[i];
            durability += holder[i]["durability"] * combination[i];
            flavor += holder[i]["flavor"] * combination[i];
            texture += holder[i]["texture"] * combination[i];
            calories += holder[i]["calories"] * combination[i];
        }
        capacity <= 0 || durability <= 0 || flavor <= 0 || texture <= 0 ? multiple = 0 : multiple = capacity * durability * flavor * texture;
        if(!results.some(elem => elem.score === multiple) && calories === 500) { 
            let obj = {
                "score": multiple,
                "calories": calories
            };
            results.push(obj);
        }
    });
    results.sort((left, right) => right.score - left.score);
    console.log("The total score of the highest-scoring cookie with 500 calories is " + results[0].score + ".");
});