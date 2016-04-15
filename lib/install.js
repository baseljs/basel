var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var series = require('async-series');
var database = require('./database');
exports.init = function(options) {
	series([
	  function(done) {
	    clone(options,done);
	  },
	  function(done) {
	    changeJson(options,done)
	  },
	  function(done) {
	    renameRemote(options)
	  }
	], function(err) {
	  console.log(err.message) // "another thing" 
	})
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
    done()
  });
}

var changeJson = function(options, done){
	var filename = path.join(process.cwd(), options.name,'package.json');
	var json = JSON.parse(fs.readFileSync(filename));
	json.name = options.name;
	json.titel = options.title;
	fs.writeFileSync(filename, JSON.stringify(json));
	done()
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
		    database.init(options);
	    } else {
	      console.log(error);
		  // done(error);
	    }
	 });
}