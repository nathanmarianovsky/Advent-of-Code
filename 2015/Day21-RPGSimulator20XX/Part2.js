// Declare the necessary variables.
const fs = require("fs"),
	weapons = { "dagger": { "cost": 8, "damage": 4 }, "shortsword": { "cost": 10, "damage": 5 }, "warhammer": { "cost": 25, "damage": 6 }, "longsword": { "cost": 40, "damage": 7 }, "greataxe": { "cost": 74, "damage": 8 } },
	armor = { "leather": { "cost": 13, "armor": 1 }, "chainmail": { "cost": 31, "armor": 2 }, "splintmail": { "cost": 53, "armor": 3 }, "bandedmail": { "cost": 75, "armor": 4 }, "platemail": { "cost": 102, "armor": 5 } },
	rings = { "damage+1": {"cost": 25, "damage": 1, "armor": 0 }, "damage+2": {"cost": 50, "damage": 2, "armor": 0 }, "damage+3": {"cost": 100, "damage": 3, "armor": 0 }, "defense+1": {"cost": 20, "damage": 0, "armor": 1 }, "defense+2": {"cost": 40, "damage": 0, "armor": 2 }, "defense+3": {"cost": 80, "damage": 0, "armor": 3 } };

// Checks if a javascript object is empty or not.
var isEmpty = obj => {
  	for(let key in obj) {
    	if(obj.hasOwnProperty(key)) { return false; }
  	}
  	return true;
}

// Construcs a player object giving a specific weapon, armor, and rings.
var construct = (weapon, armor, ring1, ring2) => {
	if(isEmpty(armor) && !isEmpty(ring1) && !isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"] + ring1["damage"] + ring2["damage"],
			"armor": ring1["armor"] + ring2["armor"],
			"cost": weapon["cost"] + ring1["cost"] + ring2["cost"]
		};
	}
	else if(isEmpty(armor) && !isEmpty(ring1) && isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"] + ring1["damage"],
			"armor": ring1["armor"],
			"cost": weapon["cost"] + ring1["cost"]
		};
	}
	else if(!isEmpty(armor) && !isEmpty(ring1) && !isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"] + ring1["damage"] + ring2["damage"],
			"armor": armor["armor"] + ring1["armor"] + ring2["armor"],
			"cost": weapon["cost"] + armor["cost"] + ring1["cost"] + ring2["cost"]
		};
	}
	else if(!isEmpty(armor) && !isEmpty(ring1) && isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"] + ring1["damage"],
			"armor": armor["armor"] + ring1["armor"],
			"cost": weapon["cost"] + armor["cost"] + ring1["cost"]
		};
	}
	else if(!isEmpty(armor) && isEmpty(ring1) && isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"],
			"armor": armor["armor"],
			"cost": weapon["cost"] + armor["cost"]
		};
	}
	else if(isEmpty(armor) && isEmpty(ring1) && isEmpty(ring2)) {
		var obj = {
			"hitPoints": 100,
			"damage": weapon["damage"],
			"armor": 0,
			"cost": weapon["cost"]
		};
	}
	return obj;
};

// Produces all of the possible players given the current weapons, armor pieces, and rings.
var possibilities = () => {
	const holder = [];
	for(let key in weapons) {
		let currentWeapon = weapons[key];
		let standalone = construct(currentWeapon, {}, {}, {});
		holder.push(standalone);
		for(let iter in armor) {
			let currentArmor = armor[iter];
			standalone = construct(currentWeapon, currentArmor, {}, {});
			holder.push(standalone);
			for(let cur in rings) {
				let currentRing1 = rings[cur];
				standalone = construct(currentWeapon, currentArmor, currentRing1, {});
				holder.push(standalone);
				for(let match in rings) {
					if(match != cur) {
						let currentRing2 = rings[match];
						standalone = construct(currentWeapon, currentArmor, currentRing1, currentRing2);
						holder.push(standalone);
					}
				}
			}
		}
		for(let cur in rings) {
			let currentRing1 = rings[cur];
			standalone = construct(currentWeapon, {}, currentRing1, {});
			holder.push(standalone);
			for(let match in rings) {
				if(match == cur) { match++; }
				let currentRing2 = rings[match];
				standalone = construct(currentWeapon, {}, currentRing1, currentRing2);
				holder.push(standalone);
			}
		}
	}
	return holder;
};

// Simulates a single turn of a battle between a player and boss given who the attacker is during this turn.
var turn = (player, boss, attacker) => {
	let totalDamage = 0;
	if(attacker == "player") {
		if(boss.armor >= player.damage) {
			totalDamage = 1;
		}
		else {
			totalDamage = player.damage - boss.armor;
		}
		var obj = {
			"hitPoints": boss.hitPoints - totalDamage,
			"damage": boss.damage,
			"armor": boss.armor
		};
	}
	else if(attacker == "boss") {
		if(player.armor >= boss.damage) {
			totalDamage = 1;
		}
		else {
			totalDamage = boss.damage - player.armor;
		}
		var obj = {
			"hitPoints": player.hitPoints - totalDamage,
			"damage": player.damage,
			"armor": player.armor,
			"cost": player.cost
		};
	}
	return obj;
};

// Simulates a battle between a player and boss and returns the status in relation to the player.
var battle = (player, boss) => {
	let count = 0,
		status = "";
	while(player.hitPoints > 0 && boss.hitPoints > 0) {
		if(count % 2 == 0) {
			boss = turn(player, boss, "player");
		}
		else {
			player = turn(player, boss, "boss");
		}
		count++;
	}
	player.hitPoints > boss.hitPoints ? status = "WON" : status = "LOST";
	return status;
};

// Returns a positive value if the right player cost is higher than the left one.
var compare = (left, right) => right.player.cost - left.player.cost;

// Read and parse. Create a boss object based on the input file and let all possible players battle out the boss. Then compare all of the players and pick the most expensive one that lost.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	const collection = data.split("\n"),
		results = [];
	let	boss = {
		"hitPoints": parseInt(collection[0].split(" ")[2]),
		"damage": parseInt(collection[1].split(" ")[1]),
		"armor": parseInt(collection[2].split(" ")[1])
	};
	const finalCollection = possibilities();
	finalCollection.forEach(player => {
		results.push({ "player": player, "status": battle(player, boss) });
	});
	results.sort(compare);
	for(let i = 0; i < results.length; i++) {
		if(results[i].status === "LOST") {
			console.log("The most amount of gold that can be spent to lose the fight is " + results[i].player.cost + ".");
			break;
		}
	}
});