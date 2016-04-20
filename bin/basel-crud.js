#!/usr/bin/env node
var basel = require('../lib/basel.config.js'),
	inquirer = require('inquirer'),
	program = require('commander'),
	crud = require('../lib/crud.js'),
	_ = require('lodash');

program
  .description('Create a BASEL crud in the current app')
  .option('-t, --table <table>', 'Database Table')
  .option('-d, --database <database>', 'Database')
  .option('-c, --controller <controller>', 'Controller name')
  .option('-v, --view <view>', 'View name (.html)')
  .option('-r, --route <route>', 'Route (Ex.: persons)')
  .option('-m, --menu <menu>', 'Show in main menu (1 - Yes, 0 - No)')
  .parse(process.argv);

basel.config.name_ = program.args.length ? program.args[0] : 'basel';
basel.config.table = program.table;
basel.config.database = program.database || basel.config.database;
basel.config.controller = program.controller;
basel.config.view = program.view;
basel.config.route = program.route;
basel.config.show_menu = program.menu || 1;


if(basel.error){
	console.log(basel.error)
}else{
	// console.log(basel.config)
	wizard(basel.config);
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

	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    crud(options);
	});
}