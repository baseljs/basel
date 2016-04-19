#!/usr/bin/env node
var basel = require('../lib/basel.config.js'),
	inquirer = require('inquirer'),
	program = require('commander'),
	crud = require('../lib/crud.js'),
	_ = require('lodash');

program
  .description('Create a BASEL crud in the current app')
  .option('-tbl, --table <table>', 'Database Table')
  .option('-db, --database <database>', 'Database')
  .option('-c, --controller <controller>', 'Controller name')
  .option('-v, --view <view>', 'View name (.html)')
  .parse(process.argv);

basel.config.name_ = program.args.length ? program.args[0] : 'basel';
basel.config.table = program.table;
basel.config.database = program.database || basel.config.database;
basel.config.controller = program.controller;
basel.config.view = program.view;


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


	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    crud(options);
	});
}