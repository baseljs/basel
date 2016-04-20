exports.json = function (str) {
	var object = {};
	var parts = str.split(',');
	for(i in parts){
		var partsItem = parts[i].split(':');
		object[partsItem[0].trim()] = partsItem[1].trim();
	}
	return object;
}