#!/usr/bin/env node
var basel = require('../lib/basel.config.js'),
	inquirer = require('inquirer'),
	program = require('commander'),
	crud = require('../lib/crud.js'),
	utils = require('../lib/utils'),
	_ = require('lodash');

program
  .description('Create a BASEL crud in the current app')
  .option('-t, --table <table>', 'Database Table')
  .option('-n, --columns <columns>', 'For new tables. Table columns. Ex: "id:INTEGER, name:TEXT"')
  .option('-p, --pk <primary>', 'Primary key of new table')
  .option('-f, --references <references>', 'Refences of new table. Ex: "profile:profiles.id"')
  .option('-i, --incremental <incremental>', 'incremental columns. Ex: id or "id, number, ..." ')
  .option('-d, --database <database>', 'Database')
  .option('-c, --controller <controller>', 'Controller name')
  .option('-v, --view <view>', 'View name (.html)')
  .option('-r, --route <route>', 'Route (Ex.: persons)')
  .option('-m, --menu <menu>', 'Show in main menu (1 - Yes, 0 - No) Default 1')

  .option('-l, --list ', 'List cruds')
  .parse(process.argv);


basel.config.name_ = program.args.length ? program.args[0] : 'basel';
basel.config.table = program.table;
basel.config.columns = program.columns;
basel.config.primary = program.primary || program.pk;
basel.config.references = program.references;
basel.config.incremental = program.incremental;
basel.config.database = program.database || basel.config.database;
basel.config.controller = program.controller;
basel.config.view = program.view;
basel.config.route = program.route;
basel.config.show_menu = program.menu || 1;

basel.config.list = program.list;


if(basel.error){
	console.log(basel.error)
}else{
	if(basel.config.list){

	}else{
		wizard(basel.config);
	}
}

function wizard (options) {
	var questions = [];
	options.controller = options.controller || options.name_+"Controller";
	options.view = options.view || options.name_+".html";

	if(!options.table){
		questions.push({
			type: 'input',
			name: 'table',
			message: 'What is the database table?'
		});
	}

	if(!options.route){
		var word = options.name_.toLowerCase().replace(/ /g,'');
		questions.push({
			type: 'input',
			name: 'route',
			message: 'What is the route way?',
			default: word
		});
	}

	if(options.columns){
		if(!options.primary){
			var cols = utils.json(options.columns);
			questions.push({
				type: 'input',
				name: 'primary',
				message: 'What is the primary key?',
				default: Object.keys(cols)[0]
			});
		}
		if(!options.incremental){
			questions.push({
				type: 'input',
				name: 'incremental',
				message: 'Do you have any incremental columns?'
			});
		}
	}

	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    crud.init(options);
	});
}