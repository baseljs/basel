var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var series = require('async-series');
var sqlite_sync = require('sqlite-sync');
var sqlite_cipher = require('sqlite-cipher');

exports.init = function (options, done) {
	var databaseFile = (options.database.split('/')).length > 1 ? options.database : path.join(process.cwd(),options.name,'model', options.database+'.db');
	if(options.cipher){
		sqlite_cipher.connect(databaseFile, options.password, options.algorithm);
	}else{
		sqlite_sync.connect(databaseFile);
	}
	console.log("Connected in database");
	done(options)
}



