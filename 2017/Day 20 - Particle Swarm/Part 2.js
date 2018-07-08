// Declare the necessary variables
var fs = require("fs");

// Read the given data about the particles. Simulate each turn and after enough turns return the number of remaining particles.
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
	for(var i = 0; i < 50; i++) {
		for(var j = 0; j < list.length; j++) {
			list[j].vel[0] += list[j].acc[0];
			list[j].vel[1] += list[j].acc[1];
			list[j].vel[2] += list[j].acc[2];
			list[j].pos[0] += list[j].vel[0];
			list[j].pos[1] += list[j].vel[1];
			list[j].pos[2] += list[j].vel[2];
			list[j].dist = list[j].pos.reduce((a,b) => Math.abs(a) + Math.abs(b), 0);
		}
		var holder = [];
		for(var m = 0; m < list.length; m++) {
			var container = list.slice(0, m).concat(list.slice(m + 1));
			if(container.findIndex(elem => elem.pos[0] == list[m].pos[0] && elem.pos[1] == list[m].pos[1] && elem.pos[2] == list[m].pos[2]) == -1) {
				holder.push(list[m]);
			}
		}
		list = holder;
	}
	console.log("The number of particles that remain after all collisions are resolved is " + list.length + ".");
});