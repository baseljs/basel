exports.json = function (str) {
	var object = {};
	var parts = str.split(',');
	for(i in parts){
		var partsItem = parts[i].split(':');
		object[partsItem[0]] = partsItem[1];
	}
	return object;
}