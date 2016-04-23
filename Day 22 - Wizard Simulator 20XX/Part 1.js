// Declare the necessary variables
var fs = require("fs"),
	assortment = [];

// Simulates a given effect.
var activate_effect = (player, boss, effect) => {
	if(effect.name == "MagicMissile") {
		if(player.mana >= 53) {
			boss.hit_points -= 4;
			if(effect.status != "paid") {
				player.mana -= 53;
				player.used += 53;
				effect.status = "paid";
			}
		}
		else { player.hit_points = -1; }
	}
	else if(effect.name == "Drain") {
		if(player.mana >= 73) {
			boss.hit_points -= 2;
			player.hit_points += 2;
			if(effect.status != "paid") {
				player.mana -= 73;
				player.used += 73;
				effect.status = "paid";
			}
		}
		else { player.hit_points = -1; }
	}
	else if(effect.name == "Shield") {
		if(player.mana >= 113) {
			if(player.armor == 0) {
				player.armor += 7;
				if(effect.status != "paid") {
					player.mana -= 113;
					player.used += 113;
					effect.status = "paid";
				}
			}
		}
		else { player.hit_points = -1; }
	}
	else if(effect.name == "Poison") {
		if(player.mana >= 173) {
			boss.hit_points -= 3;
			if(effect.status != "paid") {
				player.mana -= 173;
				player.used += 173;
				effect.status = "paid";
			}
		}
		else { player.hit_points = -1; }
	}
	else if(effect.name == "Recharge") {
		if(player.mana >= 229) {
			player.mana += 101;
			if(effect.status != "paid") {
				player.mana -= 229;
				player.used += 229;
				effect.status = "paid";
			}
		}
		else { player.hit_points = -1; }
	}
	return [player, boss, effect];
};

// Simulates a single turn between a player and boss.
var turn = (player, boss, attacker, effects, magic) => {
	var damage = 0,
		outcome = [];
	effects.forEach(iter => {
		if(iter.num == 0 && iter.name == "Shield") { player.armor = 0; }
		if(iter.num >= 0) { 
			outcome = activate_effect(player, boss, iter); 
			player = outcome[0];
			boss = outcome[1];
			iter = outcome[2];
		}
		iter.num--;
	});
	if(attacker == "player") {
		if(magic == "Shield" || magic == "Poison") { 
			var obj = {
				"name": magic,
				"status": "unpaid",
				"num": 6
			};
			effects.push(obj);
		}
		else if(magic == "Recharge") { 
			var obj = {
				"name": magic,
				"status": "unpaid",
				"num": 5
			};
			effects.push(obj);
		}
		else if(magic == "MagicMissile" || magic == "Drain") { 
			var obj = {
				"name": magic,
				"status": "unpaid",
				"num": 1
			};
			outcome = activate_effect(player, boss, obj);
			player = outcome[0];
			boss = outcome[1];
		}
	}
	else if(attacker == "boss") {
		player.armor >= boss.damage ? damage = 1 : damage = boss.damage - player.armor;
		player.hit_points -= damage;
	}
	return [player, boss, effects];
};

// Simulates a battle between a player and a boss.
var battle = (player, boss, moves) => {
	var effects = [],
		outcome = [],
		count = 0;
	while(player.hit_points > 0 && boss.hit_points > 0 && (count / 2) < moves.length) {
		count % 2 == 0 ? outcome = turn(player, boss, "player", effects, moves[count / 2]) : outcome = turn(player, boss, "boss", effects);
		player = outcome[0];
		boss = outcome[1];
		effects = outcome[2];
		count++;
	}
	return [player, boss];
};

// Generates the possible battle scenarios based on the previous input. If the input is empty, then the default moves are returned.
var generator = arr => {
	var final = [];
	if(arr.length == 0) {
		var obj1 = {
			"name": ["MagicMissile"],
			"status": "UNKNOWN"
		},
			obj2 = {
			"name": ["Drain"],
			"status": "UNKNOWN"
		},
			obj3 = {
			"name": ["Shield"],
			"status": "UNKNOWN"
		},
			obj4 = {
			"name": ["Poison"],
			"status": "UNKNOWN"
		},
			obj5 = {
			"name": ["Recharge"],
			"status": "UNKNOWN"
		};
		final.push(obj1);
		final.push(obj2);
		final.push(obj3);
		final.push(obj4);
		final.push(obj5);
	}
	else {
		arr.forEach(iter => {
			if(iter.status != "LOST") {
				var container = generator([]);
				container.forEach(cur => {
					var upto = iter.name,
						scenario = upto.concat(cur.name),
						identifier = true;
					for(var k = 0; k < scenario.length; k++) {
						var tmp = [];
						if(scenario[k] == "Shield") {
							scenario.length - k >= 6 ? tmp = scenario.slice(k + 1, k + 3) : tmp = scenario.slice(k + 1);
							if(tmp.some(elem => elem == "Shield")) { identifier = false; }
						}
						else if(scenario[k] == "Poison") {
							scenario.length - k >= 6 ? tmp = scenario.slice(k + 1, k + 3) : tmp = scenario.slice(k + 1);
							if(tmp.some(elem => elem == "Poison")) { identifier = false; }
						}
						else if(scenario[k] == "Recharge") {
							scenario.length - k >= 5 ? tmp = scenario.slice(k + 1, k + 2) : tmp = scenario.slice(k + 1);
							if(tmp.some(elem => elem == "Recharge")) { identifier = false; }
						}
					}
					if(identifier) { 
						var obj = {
							"name": scenario,
							"status": "UNKNOWN"
						};
						final.push(obj); 
					}
				});
			}
		});
	}
	return final;
};

// Read and parse. Create a boss object based on the input file and let all possible players battle out the boss. Then compare all of the players and pick the cheapest one that won.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var current = [],
		holder = [],
		result = [],
		counter = 0,
		collection = data.split("\n");
	var	boss = {
		"hit_points": parseInt(collection[0].split(" ")[2]),
		"damage": parseInt(collection[1].split(" ")[1])
	};
	while(!holder.some(elem => elem.status == "WON")) {
		current = generator(holder);
		counter++;
		holder = [];
		current.forEach(iter => {
			var opponent = {
				"hit_points": boss.hit_points,
				"damage": boss.damage
			};
			var player = {
				"hit_points": 50,
				"armor": 0,
				"mana": 500,
				"used": 0
			};
			var moves = iter.name;
			var outcome = battle(player, opponent, moves);
			if(outcome[0].hit_points > 0 && outcome[1].hit_points <= 0) {
				var obj = {
					"name": moves,
					"status": "WON",
					"used": outcome[0].used,
					"player": player,
					"boss": opponent
				};
				holder.push(obj);
			}
			else if(outcome[0].hit_points > 0 && outcome[1].hit_points > 0) {
				var obj = {
					"name": moves,
					"status": "UNKNOWN",
					"used": outcome[0].used,
					"player": player,
					"boss": opponent
				};
				holder.push(obj);
			}
		});
		holder.sort((left, right) => {
			return right.used - left.used;
		});
	}
	holder.forEach(elem => {
		if(elem.status == "WON" && elem.boss.hit_points < 0) { result.push(elem); }
	});
	result.sort((left, right) => { return left.used - right.used; });
	console.log("The least amount of mana required is: " + result[0].used);
});