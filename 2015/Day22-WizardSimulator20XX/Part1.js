// Declare the necessary variables.
const fs = require("fs");

// Simulates a given effect.
var activateEffect = (player, boss, effect) => {
	if(effect.name == "MagicMissile") {
		if(player.mana >= 53) {
			boss.hitPoints -= 4;
			if(effect.status != "paid") {
				player.mana -= 53;
				player.used += 53;
				effect.status = "paid";
			}
		}
		else { player.hitPoints = -1; }
	}
	else if(effect.name == "Drain") {
		if(player.mana >= 73) {
			boss.hitPoints -= 2;
			player.hitPoints += 2;
			if(effect.status != "paid") {
				player.mana -= 73;
				player.used += 73;
				effect.status = "paid";
			}
		}
		else { player.hitPoints = -1; }
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
		else { player.hitPoints = -1; }
	}
	else if(effect.name == "Poison") {
		if(player.mana >= 173) {
			boss.hitPoints -= 3;
			if(effect.status != "paid") {
				player.mana -= 173;
				player.used += 173;
				effect.status = "paid";
			}
		}
		else { player.hitPoints = -1; }
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
		else { player.hitPoints = -1; }
	}
};

// Simulates a single turn between a player and boss.
var turn = (player, boss, attacker, effects, magic) => {
	let damage = 0;
	effects.forEach(iter => {
		if(iter.num == 0 && iter.name == "Shield") { player.armor = 0; }
		if(iter.num >= 0) { 
			activateEffect(player, boss, iter);
		}
		iter.num--;
	});
	if(attacker == "player") {
		if(magic == "Shield" || magic == "Poison") {
			effects.push({ "name": magic, "status": "unpaid", "num": 6 });
		}
		else if(magic == "Recharge") {
			effects.push({ "name": magic, "status": "unpaid", "num": 5 });
		}
		else if(magic == "MagicMissile" || magic == "Drain") {
			activateEffect(player, boss, { "name": magic, "status": "unpaid", "num": 1 });
		}
	}
	else if(attacker == "boss") {
		player.armor >= boss.damage ? damage = 1 : damage = boss.damage - player.armor;
		player.hitPoints -= damage;
	}
};

// Simulates a battle between a player and a boss.
var battle = (player, boss, moves) => {
	let effects = [],
		count = 0;
	while(player.hitPoints > 0 && boss.hitPoints > 0 && (count / 2) < moves.length) {
		count % 2 == 0 ? turn(player, boss, "player", effects, moves[count / 2]) : turn(player, boss, "boss", effects);
		count++;
	}
};

// Generates the possible battle scenarios based on the previous input. If the input is empty, then the default moves are returned.
var generator = arr => {
	const final = [];
	if(arr.length == 0) {
		final.push({ "name": ["MagicMissile"], "status": "UNKNOWN" }, { "name": ["Drain"], "status": "UNKNOWN" },
			{ "name": ["Shield"], "status": "UNKNOWN" }, { "name": ["Poison"], "status": "UNKNOWN" }, { "name": ["Recharge"], "status": "UNKNOWN" });
	}
	else {
		arr.forEach(iter => {
			if(iter.status != "LOST") {
				let container = generator([]);
				container.forEach(cur => {
					let upto = iter.name,
						scenario = upto.concat(cur.name),
						identifier = true;
					for(let k = 0; k < scenario.length; k++) {
						let tmp = [];
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
						final.push({ "name": scenario, "status": "UNKNOWN" }); 
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
	const result = [],
		collection = data.split("\n");
	let current = [],
		holder = [],
		counter = 0,
		boss = { "hitPoints": parseInt(collection[0].split(" ")[2]), "damage": parseInt(collection[1].split(" ")[1]) };
	while(!holder.some(elem => elem.status == "WON")) {
		current = generator(holder);
		counter++;
		holder = [];
		current.forEach(iter => {
			let opponent = { "hitPoints": boss.hitPoints, "damage": boss.damage },
				player = { "hitPoints": 50, "armor": 0, "mana": 500, "used": 0 },
				moves = iter.name;
			battle(player, opponent, moves);
			if(player.hitPoints > 0 && opponent.hitPoints <= 0) {
				holder.push({ "name": moves, "status": "WON", "used": player.used, "player": player, "boss": opponent });
			}
			else if(player.hitPoints > 0 && opponent.hitPoints > 0) {
				holder.push({ "name": moves, "status": "UNKNOWN", "used": player.used, "player": player, "boss": opponent });
			}
		});
		holder.sort((left, right) => right.used - left.used);
	}
	holder.forEach(elem => { if(elem.status == "WON" && elem.boss.hitPoints < 0) { result.push(elem); }});
	console.log("The least amount of mana required to win the fight is " + result.sort((left, right) => left.used - right.used)[0].used + ".");
});