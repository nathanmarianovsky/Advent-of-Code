// Declare the necessary variables
var md5 = require("md5"),
	input = "njfxhljp",
	golden = ["b", "c", "d", "e", "f"];

// Simulates all walks possible on the grid and returns the length of the shortest one.
var main = () => {
	var paths = [{x: 0, y: 0, str: ""}];
	while(!paths.some(elem => elem.x == 3 && elem.y == 3)) {
		var arr = [];
		paths.forEach(position => {
			var holder = md5(input + position.str);
			if(golden.some(elem => elem == holder[0])) {
				if(position.y > 0) {
					var obj = {
						x: position.x,
						y: position.y - 1,
						str: position.str + "U"
					};
					arr.push(obj);
				}
			}
			if(golden.some(elem => elem == holder[1])) {
				if(position.y < 3) {
					var obj = {
						x: position.x,
						y: position.y + 1,
						str: position.str + "D"
					};
					arr.push(obj);
				}
			}
			if(golden.some(elem => elem == holder[2])) {
				if(position.x > 0) {
					var obj = {
						x: position.x - 1,
						y: position.y,
						str: position.str + "L"
					};
					arr.push(obj);
				}
			}
			if(golden.some(elem => elem == holder[3])) {
				if(position.x < 3) {
					var obj = {
						x: position.x + 1,
						y: position.y,
						str: position.str + "R"
					};
					arr.push(obj);
				}
			}
		});
		paths = arr;
	}
	return paths.filter(elem => {
		if(elem.x == 3 && elem.y == 3) { return elem; }
	})[0].str;
};

console.log("The shortest path that reaches the vault is " + main() + ".");