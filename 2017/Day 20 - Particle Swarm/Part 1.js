// Declare the necessary variables
var fs = require("fs");

// Read the given data about the particles. Simulate each turn and after enough turns return the id of the particle closest to the origin.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var input = data.split("\n").slice(0, data.split("\n").length - 1),
		list = [];
	for(var k = 0; k < input.length; k++) {
		var arr = input[k].split(" ");
		var obj = {
			id: k,
			pos: arr[0].slice(arr[0].indexOf("<") + 1, arr[0].indexOf(">")).split(",").map(elem => parseInt(elem)),
			vel: arr[1].slice(arr[1].indexOf("<") + 1, arr[1].indexOf(">")).split(",").map(elem => parseInt(elem)),
			acc: arr[2].slice(arr[2].indexOf("<") + 1, arr[2].indexOf(">")).split(",").map(elem => parseInt(elem)),
			dist: arr[0].slice(arr[0].indexOf("<") + 1, arr[0].indexOf(">")).split(",").map(elem => parseInt(elem)).reduce((a,b) => Math.abs(a) + Math.abs(b), 0)
		};
		list.push(obj);
	}
	for(var i = 0; i < 500; i++) {
		for(var j = 0; j < list.length; j++) {
			list[j].vel[0] += list[j].acc[0];
			list[j].vel[1] += list[j].acc[1];
			list[j].vel[2] += list[j].acc[2];
			list[j].pos[0] += list[j].vel[0];
			list[j].pos[1] += list[j].vel[1];
			list[j].pos[2] += list[j].vel[2];
			list[j].dist = list[j].pos.reduce((a,b) => Math.abs(a) + Math.abs(b), 0);
		}
	}
	list.sort((a,b) => a.dist - b.dist);
	console.log("The particle that stays the closest to the origin has corresponding id " + list[0].id + ".");
});