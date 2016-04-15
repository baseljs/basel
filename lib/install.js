var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
exports.init = function(options) {
	clone(options, changeJson);
}

var clone = function(options, done){
	var url;
	if (options.type == 'simple') {
		url = "https://github.com/ClubeDosGeeksCoding/electron-angularjs-sqlite";
	}else{
		url = "https://github.com/ClubeDosGeeksCoding/electron-angularjs-tabs"
	}
	var gitCmd = 'git clone '+url+' "'+options.name+'"';
	console.log('Cloning into destination folder:' +options.name);
	console.log(gitCmd);
	shell.exec(gitCmd , function(status, output) {
    if (status) {
	    console.log(output);
    }
    console.log();
    done(options)
  });
}

var changeJson = function(options, done){
	var filename = path.join(process.cwd(), options.name,'package.json');
	var json = JSON.parse(fs.readFileSync(filename));
	json.name = options.name;
	json.titel = options.title;
	fs.writeFileSync(filename, JSON.stringify(json));
}