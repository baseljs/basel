var fs = require('fs'),
	path = require('path');

var jsonFile = path.join(process.cwd(),'basel.json');

if(fs.existsSync(jsonFile)){
	exports.config = JSON.parse(fs.readFileSync(jsonFile));
}else{
	exports.erro = "This directory is not a BASEL app";
}