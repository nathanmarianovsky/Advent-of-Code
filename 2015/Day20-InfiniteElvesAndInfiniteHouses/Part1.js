// Declare the necessary variables.
const input = 29000000;

// Returns the number of presents given the house number.
var counter = houseNum => {
    let iter = 1,
        total = 0;
    if(houseNum > 1) {
        while(iter <= houseNum) {
            if(houseNum % iter === 0) { total += iter * 10; }
            iter++;
        }
    }
    else { total = 10; }
    return total;
};

// Iterate until the number is found.
let start = 1;
while(true) {
    if(counter(start) >= input) {
        console.log("The lowest house number of the house to get as least as many presents as the input is " + start + ".");
        break;
    }
    else{ start++; }
}