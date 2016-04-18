// Declare the necessary variable
var input = 29000000;

// Returns the number of presents given the house number.
var counter = house_num => {
    var iter = 1,
        total = 0;
    if(house_num > 1) {
        while(iter <= house_num) {
            if(house_num % iter === 0) { total += iter * 10; }
            iter++;
        }
    }
    else { total = 10; }
    return total;
};

// Iterate until the number is found.
var start = 1;
while(true) {
    if(counter(start) >= input) {
        console.log("The first number to produce the wanted number of presents is: " + start);
        break;
    }
    else{ start++; }
}