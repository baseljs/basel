var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
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
    done(options,renameRemote)
  });
}

var changeJson = function(options, done){
	var filename = path.join(process.cwd(), options.name,'package.json');
	var json = JSON.parse(fs.readFileSync(filename));
	json.name = options.name;
	json.titel = options.title;
	fs.writeFileSync(filename, JSON.stringify(json));
	done(options)
}

var renameRemote = function(options, done){
	shell.exec('cd '+ options.name + ' && git remote rename origin upstream', function (status, error) {
	    if (!status) {
		    console.log('  Added the "remote" upstream origin');
		    console.log();
		    console.log();
		    console.log('#############################################');
		    console.log();
		    console.log(chalk.green.bold('  Congratulations you have basel-io installed.'));
		    console.log();

	      	// done();
	    } else {
	      console.log(error);
		  // done(error);
	    }
	 });
}