var row = 3010,
	column = 3019,
	initial = 20151125;

var generator = current => (current * 252533) % 33554393;

var necessary = (row, column) => (row + column) - 1;

var decompose = val => {
	var arr = [];
	for(var i = 1; i < val; i++) {
		arr.push([val - i, i]);
	}
	return arr;
};

var determine_value = (size, initial, row, column) => {
	for(var i = 3; i <= size; i++) {
		var decomposition = decompose(i);
		for(var j = 0; j < decomposition.length; j++) {
			decomposition[j].push(generator(initial));
			if(decomposition[j][0] == row && decomposition[j][1] == column) {
				console.log("The value located at (" + decomposition[j][0] + "," + decomposition[j][1] + ") is: " + decomposition[j][2]);
			}
			initial = generator(initial);
		}
	}
};

determine_value(row + column, initial, row, column);