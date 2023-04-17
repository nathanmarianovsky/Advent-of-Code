// Declare the necessary variables.
const _ = require("underscore"),
	input = "hepxcrrq",
	alphabet = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7, "i": 8, "j": 9, "k": 10, "l": 11, "m": 12, "n": 13, "o": 14, "p": 15, "q": 16, "r": 17, "s": 18, "t": 19, "u": 20, "v": 21, "w": 22, "x": 23, "y": 24, "z": 25 };

// Checks whether the given password meets the requirements.
var check = password => {
	const arrForbidden = [];
	let straight = false,
		forbidden = false,
		counter = 0;
	for(let i = 0; i < password.length;) {
		if((alphabet[password[i]] === alphabet["i"]) || (alphabet[password[i]] === alphabet["o"]) || (alphabet[password[i]] === alphabet["l"])) { 
			forbidden = true;
			break;
		}
		if(i + 2 != password.length) {
			if((alphabet[password[i]] + 1 == alphabet[password[i + 1]]) && (alphabet[password[i + 1]] + 1 == alphabet[password[i + 2]])) { straight = true; }
		}
		if(i + 1 != password.length) {
			if(password[i] == password[i + 1] && !arrForbidden.some(elem => elem == password[i])) {
				arrForbidden.push(password[i]);
				counter++;
			}
			i++;
		}
		else{ i = password.length; }
	}
	return ((straight === true) && (forbidden === false) && (counter >= 2));
};

// Driver function to determine the next password that passes the necessary requirements.
var nextDriver = password => {
	let newPassStr = next(password);
	if(!check(newPassStr)) {
		while(!check(newPassStr)) { newPassStr = next(newPassStr); }
	}
	return newPassStr;
};

// String prototype function to replace a specific character in a string at a particular index.
var replaceAt = (password, index, character) => password.substr(0, index) + character + password.substr(index + character.length);

// Produces the next letter in the alphabet given a current one.
var nextLetter = current => {
	const value = alphabet[current];
	let next = "";
	value + 1 == 26 ? next = "switch" : next = (_.invert(alphabet))[value + 1];
	return next;
};

// Produces the next password based on the rules of incrementing strings.
var next = (password, position) => {
	let current = "",
		newPass = "";
	if(!(typeof position !== "undefined" && position !== null)) { position = -1; }
	position == -1 ? current = password[password.length - 1] : current = password[position];
	let	newCurrent = nextLetter(current);
	if(newCurrent != "switch") {
		position == -1 ? newPass = replaceAt(password, password.length - 1, newCurrent) : newPass = replaceAt(password, position, newCurrent);
	}
	else {
		if(position == -1) {
			newPass = next(password, password.length - 2);
			newPass = replaceAt(newPass, password.length - 1, "a");
		}
		else {
			newPass = next(password, position - 1);
			for(let i = position; i < newPass.length; i++) {
				newPass = replaceAt(newPass, i, "a");
			}
		}
	}
	for(let iter = 0; iter < newPass.length; iter++) {
		if(newPass[iter] == "i") {
			newPass = newPass.replace("i", "j");
			for(let i = iter + 1; i < newPass.length; i++) {
				newPass = replaceAt(newPass, i, "a");
			}
			break;
		}
		else if(newPass[iter] == "o") {
			newPass = newPass.replace("o", "p");
			for(let i = iter + 1; i < newPass.length; i++) {
				newPass = replaceAt(newPass, i, "a");
			}
			break;
		}
		else if(newPass[iter] == "l") {
			newPass = newPass.replace("l", "m");
			for(let i = iter + 1; i < newPass.length; i++) {
				newPass = replaceAt(newPass, i, "a");
			}
			break;
		}
	}
	return newPass;
};

// Outputs the next password.
console.log("Santa's next password should be " + nextDriver(input) + ".");