// Declare the necessary variables
var fs = require("fs"),
	cluster = require("cluster"),
	numCPUs = require("os").cpus().length;

// Returns an array containing all possible rule changes.
var possibilities = (phrase, rules, goal) => {
	var holder = [],
		indices = [];


	// rules.forEach(rule => {
	// 	indices = find_indices(phrase, rule.result);
	// 	indices.forEach(iter => {
	// 		holder.push(phrase.substring(0, iter) + rule.letters + phrase.substring(iter + rule.result + 1));
	// 	});
	// });


	rules.forEach(rule => {
		indices = find_indices(phrase, rule.letters);
		indices.forEach(iter => {
			var word = phrase.substring(0, iter) + rule.result + phrase.substring(iter + rule.letters.length + 1);
			if(word.length <= goal.length) { holder.push(word); }
		});
	});


	// console.log(holder);


	return holder;
};




var memory = (container, current) => {
	var next_iter = [];
	for(var i = 0; i < container.length; i++) {
		var left = current.substring(0, index),
			right = current.substring(index + container[i].length + 1),
			existenceLeft = container.some(elem => elem.value === left),
			index = current.indexOf(container[i]),
			existenceRight = container.some(elem => elem.value === right);
		if(index !== -1 && (existenceLeft || left === "") && (existenceRight || right === "")) {
			container[i].variations.forEach(middleIter => {
				if(!next_iter.some(elem => elem === left + middleIter + right)) {
					next_iter.push(left + middleIter + right);
				}
			});
			var count = 0;
			for(var j = 0; j < container.length; j++) {
				if(container[j].value === left) {
					container[j].variations.forEach(leftIter => {
						if(!next_iter.some(elem => elem === leftIter + container[i].value + right)) {
							next_iter.push(leftIter + container[i].value + right);
						}
					});
					count++;
				}
				else if(container[j].value === right) {
					container[j].variations.forEach(rightIter => {
						if(!next_iter.some(elem => elem === left + container[i].value + rightIter)) {
							next_iter.push(left + container[i].value + rightIter);
						}
					});
					count++;
				}
				if(count === 2) { break; }
			}
			break;
		}
	}
	return next_iter;
};



var find_indices = (str, toSearch) => {
    var indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) { indices.push(pos); }
    return indices;
};





var driver = (phrase, rules) => {
	var holder1 = possibilities("e", rules, phrase),
		holder2 = [],
		// holder3 = [],
		container = [];
		counter = 1;

	rules.forEach(rule => {
		if(container.some(elem => elem.value === rule.letters)) {
			container.forEach(iter => {
				if(iter.value === rule.letters) { iter.possibilities.push(rule.result); }
			});
		}
		else {
			container.push({
				"value": rule.letters,
				"possibilities": [rule.result]
			});
		}
	});

	// console.log(container);

	// console.log(holder1);
	// while(counter < 4) {
	// while(!holder1.some(elem => elem.length === "e")) {
	// console.log(counter, "phrase length: " + phrase.length, "arr size: " + holder1.length, "biggest length in arr: " + holder1[0].length, "smallest length in arr: " + holder1[holder1.length - 1].length);
	// console.log(holder1);
	while(!holder1.some(elem => elem.length === phrase)) {
		// console.log(holder1);

		// holder3 = [];

		holder1.forEach(iter => {
			// var memo = memory(container, iter);
			// var tmp = possibilities(iter, rules, phrase);
			// if(memo.length === 0) {
				if (cluster.isMaster) {
					for(var i = 0; i < numCPUs; i++) { cluster.fork(); }
					cluster.on("exit", (worker, code, signal) => { cluster.fork(); });
				} 
				else {
				  	// driver(phrase, rules);
				}
				var memo = possibilities(iter, rules, phrase);
				container.push({
					"value": iter,
					"variations": memo
				});
			// }
			memo.forEach(result => {
				if(!holder2.some(elem => elem === result) && !holder1.some(elem => elem === result)) { holder2.push(result); }
			});
			// tmp.forEach(result => {
			// 	if(!holder3.some(elem => elem === result) && !holder1.some(elem => elem === result)) { holder3.push(result); }
			// });
		});
		counter++;
		holder1 = holder2;
		holder2 = [];
		holder1.sort((left, right) => {
			return right.length - left.length;
		});
		// holder3.sort((left, right) => {
		// 	return right.length - left.length;
		// });
		// console.log(container);
		// console.log(holder1[0].length, holder1[holder1.length - 1].length);
		// holder1 = holder1.slice(0, 200);

		// console.log(holder1.length);
		console.log(counter, "phrase length: " + phrase.length, "arr size: " + holder1.length, "biggest length in arr: " + holder1[0].length, "smallest length in arr: " + holder1[holder1.length - 1].length);
		// console.log(counter, "phrase length: " + phrase.length, "arr size: " + holder3.length, "biggest length in arr: " + holder3[0].length, "smallest length in arr: " + holder3[holder3.length - 1].length);
	}

	console.log("answer: " + counter);
	return counter;
};






// var breakup = (phrase, rules) => {
// 	var holder = phrase,
// 		container1 = possibilities(holder, rules),
// 		container2 = [],
// 		counter = 1;
// 	while(!container1.some(elem => elem.length <= 1)) {
// 		console.log(container1);
// 		container1.forEach(result => {
// 			var tmp = possibilities(result, rules);
// 			tmp.forEach(new_result => {
// 				if(!container2.some(elem => elem === new_result) && new_result.length < result.length) { container2.push(new_result); }
// 			});
// 		});
// 		counter++;
// 		console.log(counter);
// 		container1 = container2;
// 		container2 = [];
// 	}
// 	return counter;
// };



// Read and parse. For each rule create an object and pass the collection of rules and phrase to the possibilities function.
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var collection = data.split("\n"),
		rules = [],
		phrase = "";
	for(var i = 0; i < collection.length - 3; i++) {
		var tmp = collection[i].split("=>");
		var obj = {
			"letters": tmp[0].substring(0, tmp[0].length - 1),
			"result": tmp[1].substring(1, tmp[1].length)
		};
		rules.push(obj);
	}

	phrase = collection[collection.length - 2];

	// console.log(driver(phrase, rules));

	if (cluster.isMaster) {
		for(var i = 0; i < numCPUs; i++) { cluster.fork(); }
		cluster.on("exit", (worker, code, signal) => { cluster.fork(); });
	} 
	else {
	  	driver(phrase, rules);
	}

	// driver(phrase, rules);
	// console.log(breakup(phrase, rules));
	// console.log(rules, phrase);
	// console.log(possibilities(phrase, rules));
});