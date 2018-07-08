// Declare the necessary variables
var fs = require("fs"),
	weapons = {
		"dagger": { "cost": 8, "damage": 4 },
		"shortsword": { "cost": 10, "damage": 5 },
		"warhammer": { "cost": 25, "damage": 6 },
		"longsword": { "cost": 40, "damage": 7 },
		"greataxe": { "cost": 74, "damage": 8 }
	},
	armor = {
		"leather": { "cost": 13, "armor": 1 },
		"chainmail": { "cost": 31, "armor": 2 },
		"splintmail": { "cost": 53, "armor": 3 },
		"bandedmail": { "cost": 75, "armor": 4 },
		"platemail": { "cost": 102, "armor": 5 }
	},
	rings = {
		"damage+1": {"cost": 25, "damage": 1, "armor": 0 },
		"damage+2": {"cost": 50, "damage": 2, "armor": 0 },
		"damage+3": {"cost": 100, "damage": 3, "armor": 0 },
		"defense+1": {"cost": 20, "damage": 0, "armor": 1 },
		"defense+2": {"cost": 40, "damage": 0, "armor": 2 },
		"defense+3": {"cost": 80, "damage": 0, "armor": 3 }
	};

// Construcs a player object giving a specific weapon, armor, and rings.
var construct = (weapon, armor, ring1, ring2) => {
	if(is_empty(armor) && !is_empty(ring1) && !is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"] + ring1["damage"] + ring2["damage"],
			"armor": ring1["armor"] + ring2["armor"],
			"cost": weapon["cost"] + ring1["cost"] + ring2["cost"]
		};
	}
	else if(is_empty(armor) && !is_empty(ring1) && is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"] + ring1["damage"],
			"armor": ring1["armor"],
			"cost": weapon["cost"] + ring1["cost"]
		};
	}
	else if(!is_empty(armor) && !is_empty(ring1) && !is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"] + ring1["damage"] + ring2["damage"],
			"armor": armor["armor"] + ring1["armor"] + ring2["armor"],
			"cost": weapon["cost"] + armor["cost"] + ring1["cost"] + ring2["cost"]
		};
	}
	else if(!is_empty(armor) && !is_empty(ring1) && is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"] + ring1["damage"],
			"armor": armor["armor"] + ring1["armor"],
			"cost": weapon["cost"] + armor["cost"] + ring1["cost"]
		};
	}
	else if(!is_empty(armor) && is_empty(ring1) && is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"],
			"armor": armor["armor"],
			"cost": weapon["cost"] + armor["cost"]
		};
	}
	else if(is_empty(armor) && is_empty(ring1) && is_empty(ring2)) {
		var obj = {
			"hit_points": 100,
			"damage": weapon["damage"],
			"armor": 0,
			"cost": weapon["cost"]
		};
	}
	return obj;
};

// Checks if a javascript object is empty or not.
var is_empty = obj => {
  	for(var key in obj) {
    	if(obj.hasOwnProperty(key)) { return false; }
  	}
  	return true;
}

// Produces all of the possible players given the current weapons, armor pieces, and rings.
var possibilities = () => {
	var holder = [];
	for(var key in weapons) {
		var current_weapon = weapons[key];
		var standalone = construct(current_weapon, {}, {}, {});
		holder.push(standalone);
		for(var iter in armor) {
			var current_armor = armor[iter];
			standalone = construct(current_weapon, current_armor, {}, {});
			holder.push(standalone);
			for(var cur in rings) {
				var current_ring1 = rings[cur];
				standalone = construct(current_weapon, current_armor, current_ring1, {});
				holder.push(standalone);
				for(var match in rings) {
					if(match != cur) {
						var current_ring2 = rings[match];
						standalone = construct(current_weapon, current_armor, current_ring1, current_ring2);
						holder.push(standalone);
					}
				}
			}
		}
		for(var cur in rings) {
			var current_ring1 = rings[cur];
			standalone = construct(current_weapon, {}, current_ring1, {});
			holder.push(standalone);
			for(var match in rings) {
				if(match == cur) { match++; }
				var current_ring2 = rings[match];
				standalone = construct(current_weapon, {}, current_ring1, current_ring2);
				holder.push(standalone);
			}
		}
	}
	return holder;
};

// Simulates a single turn of a battle between a player and boss given who the attacker is during this turn.
var turn = (player, boss, attacker) => {
	var total_damage = 0;
	if(attacker == "player") {
		if(boss.armor >= player.damage) {
			total_damage = 1;
		}
		else {
			total_damage = player.damage - boss.armor;
		}
		var obj = {
			"hit_points": boss.hit_points - total_damage,
			"damage": boss.damage,
			"armor": boss.armor
		};
	}
	else if(attacker == "boss") {
		if(player.armor >= boss.damage) {
			total_damage = 1;
		}
		else {
			total_damage = boss.damage - player.armor;
		}
		var obj = {
			"hit_points": player.hit_points - total_damage,
			"damage": player.damage,
			"armor": player.armor,
			"cost": player.cost
		};
	}
	return obj;
};

// Simulates a battle between a player and boss and returns the status in relation to the player.
var battle = (player, boss) => {
	var count = 0,
		status = "";
	while(player.hit_points > 0 && boss.hit_points > 0) {
		if(count % 2 == 0) {
			boss = turn(player, boss, "player");
		}
		else {
			player = turn(player, boss, "boss");
		}
		count++;
	}
	player.hit_points > boss.hit_points ? status = "WON" : status = "LOST";
	return status;
};

// Returns a positive value if the left player cost is higher than the right one.
var compare = (left, right) => left.player.cost - right.player.cost;

// Read and parse. Create a boss object based on the input file and let all possible players battle out the boss. Then compare all of the players and pick the cheapest one that won.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var collection = data.split("\n"),
		results = [];
	var	boss = {
		"hit_points": parseInt(collection[0].split(" ")[2]),
		"damage": parseInt(collection[1].split(" ")[1]),
		"armor": parseInt(collection[2].split(" ")[1])
	};
	collection = possibilities();
	collection.forEach(player => {
		var obj = {
			"player": player,
			"status": battle(player, boss)
		};
		results.push(obj);
	});
	results.sort(compare);
	for(var i = 0; i < results.length; i++) {
		if(results[i].status === "WON") {
			console.log("Here is the cheapest player to win:\n", results[i].player);
			break;
		}
	}
});