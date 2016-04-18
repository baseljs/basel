var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var series = require('async-series');
var sqlite_sync = require('sqlite-sync');
var sqlite_cipher = require('sqlite-cipher');
var database;

exports.init = function (options, done) {
	var databaseFile = (options.database.split('\\')).length > 1 ? options.database : path.join(process.cwd(),options.name,'model', options.database+'.db');
	if(options.cipher){
		sqlite_cipher.connect(databaseFile, options.password, options.algorithm);
		database = sqlite_cipher;
	}else{
		sqlite_sync.connect(databaseFile);
		database = sqlite_sync;
	}
	console.log("Connected in database");
	if(done){
		database.run('CREATE TABLE crud (
		    id         INTEGER   PRIMARY KEY AUTOINCREMENT,
		    name       CHAR (50),
		    [view]     CHAR (50),
		    controller CHAR (50),
		    table_      CHAR (50),
		    route      CHAR (50),
		    show_menu  INT       DEFAULT (1),
		    ativo      INT       DEFAULT (1) 
		)');
		database.run("INSERT INTO crud (name, view, controller) VALUES ('Example', 'example.html', 'exampleController')");
		done(options)	
	}
}

exports.wizard = function(options){
	options.database = (options.database.split('\\')).length > 1 ? options.database : path.join(process.cwd(),options.database);
	if(options.connect){
		this.init(options);
	}else if(!database){
		this.init(options);
	}
	if(options.sql){
		console.log(database.run(options.sql));
	}
	if(options.table){
		createTable(options);
	}
}

function createTable(options){
	var colunms = JSON.parse(options.columns);
	var references = (options.references) ? JSON.parse(options.references) : [];
	var incremental = (options.incremental) ? options.incremental.split(',') : [];
	var colSql = [];

	var keys = Object.keys(colunms);
	for(var i = 0 ; i < keys.length ; i++){
		var sql = keys[i]+" "+colunms[keys[i]];
		if(keys[i] == options.primary){
			sql += " PRIMARY KEY";
		}
		for(j in incremental){
			if(incremental[j] == keys[i]){
				sql += " AUTOINCREMENT";
			}
		}
		if(references[keys[i]]){
			var parts = references[keys[i]].split('.');
			sql += " REFERENCES "+parts[0]+" ("+parts[1]+")";
		}
		colSql.push(sql)
	}

	var sql = "CREATE TABLE "+options.table+"("+colSql.join(',')+")";
	var res = database.run(sql);
	if(res == true){
		console.log("Table "+options.table+" created in database: "+options.database);
	}else{
		console.log("Error: "+res);
	}
	
}



