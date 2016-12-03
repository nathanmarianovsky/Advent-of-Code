// Declare the necessary variables
var input = "hepxxyzz",
	_ = require("underscore"),
	alphabet = {
	"a": 0,
	"b": 1,
	"c": 2,
	"d": 3,
	"e": 4,
	"f": 5,
	"g": 6,
	"h": 7,
	"i": 8,
	"j": 9,
	"k": 10,
	"l": 11,
	"m": 12,
	"n": 13,
	"o": 14,
	"p": 15,
	"q": 16,
	"r": 17,
	"s": 18,
	"t": 19,
	"u": 20,
	"v": 21,
	"w": 22,
	"x": 23,
	"y": 24,
	"z": 25
};

// Checks whether the given password meets the requirements.
var check = password => {
	var straight = false,
		forbidden = false,
		counter = 0,
		arr_forbidden = [];
	for(var i = 0; i < password.length;) {
		if((alphabet[password[i]] === alphabet["i"]) || (alphabet[password[i]] === alphabet["o"]) || (alphabet[password[i]] === alphabet["l"])) { 
			forbidden = true;
			break;
		}
		if(i + 2 != password.length) {
			if((alphabet[password[i]] + 1 == alphabet[password[i + 1]]) && (alphabet[password[i + 1]] + 1 == alphabet[password[i + 2]])) { straight = true; }
		}
		if(i + 1 != password.length) {
			if(password[i] == password[i + 1] && !arr_forbidden.some(elem => elem == password[i])) {
				arr_forbidden.push(password[i]);
				counter++;
			}
			i++;
		}
		else{ i = password.length; }
	}
	return ((straight === true) && (forbidden === false) && (counter >= 2));
};

// Driver function to determine the next password that passes the necessary requirements.
var next_driver = password => {
	var new_pass = next(password);
	if(!check(new_pass)) {
		while(!check(new_pass)) { new_pass = next(new_pass); }
	}
	return new_pass;
};

// String prototype function to replace a specific character in a string at a particular index.
String.prototype.replaceAt=function(index, character) { return this.substr(0, index) + character + this.substr(index+character.length); }

// Produces the next password based on the rules of incrementing strings.
var next = (password, position) => {
	var current = "",
		new_pass = "";
	if(!(typeof position !== "undefined" && position !== null)) { position = -1; }
	position == -1 ? current = password[password.length - 1] : current = password[position];
	var	new_current = next_letter(current);
	if(new_current != "switch") {
		position == -1 ? new_pass = password.replaceAt(password.length - 1, new_current) : new_pass = password.replaceAt(position, new_current);
	}
	else {
		if(position == -1) {
			new_pass = next(password, password.length - 2);
			new_pass = new_pass.replaceAt(password.length - 1, "a");
		}
		else {
			new_pass = next(password, position - 1);
			for(var i = position; i < new_pass.length; i++) {
				new_pass = new_pass.replaceAt(i, "a");
			}
		}
	}
	for(var iter = 0; iter < new_pass.length; iter++) {
		if(new_pass[iter] == "i") {
			new_pass = new_pass.replace("i", "j");
			for(var i = iter + 1; i < new_pass.length; i++) {
				new_pass = new_pass.replaceAt(i, "a");
			}
			break;
		}
		else if(new_pass[iter] == "o") {
			new_pass = new_pass.replace("o", "p");
			for(var i = iter + 1; i < new_pass.length; i++) {
				new_pass = new_pass.replaceAt(i, "a");
			}
			break;
		}
		else if(new_pass[iter] == "l") {
			new_pass = new_pass.replace("l", "m");
			for(var i = iter + 1; i < new_pass.length; i++) {
				new_pass = new_pass.replaceAt(i, "a");
			}
			break;
		}
	}
	return new_pass;
};

// Produces the next letter in the alphabet given a current one.
var next_letter = current => {
	var value = alphabet[current],
		next = "";
	value + 1 == 26 ? next = "switch" : next = (_.invert(alphabet))[value + 1];
	return next;
};

// Outputs the next password.
console.log("Next Password: " + next_driver(input));