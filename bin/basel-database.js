#!/usr/bin/env node
var basel = require('../lib/basel.config.js'),
	database = require('../lib/database.js'),
	inquirer = require('inquirer'),
	program = require('commander'),
	utils = require('../lib/utils')
	_ = require('lodash');

program
  .description('Create and access the database of a BASEL Application')
  .option('-p, --password <password>', 'Data base encripted passowrd')
  .option('-a, --algorithm <algorithm>', 'Data base encripted algorithm')
  .option('-s, --sql <sql>', 'Sql to run')
  .option('-t, --table <table>', 'Create database table')
  .option('-c, --columns <columns>', 'Database table columns. Ex: "id:INTEGER, name:TEXT"')
  .option('-p, --pk <primary>', 'Database table primary key')
  .option('-r, --references <references>', 'Refences. Ex: "profile:profiles.id"')
  .option('-i, --incremental <incremental>', 'incremental columns. Ex: id or "id, number, ..." ')
  .parse(process.argv);

basel.config.database = program.args.length ? program.args[0] : basel.config.database;
basel.config.password = program.password;
basel.config.algorithm = program.algorithm;

basel.config.sql = program.sql;
basel.config.table = program.table;
basel.config.columns = program.columns;
basel.config.primary = program.primary;
basel.config.references = program.references;
basel.config.incremental = program.incremental;

if(program.args.length){
	basel.config.connect = true;
}

if(basel.error){
	console.log(basel.error)
}else{
	// console.log(basel.config)
	wizard(basel.config);
}

function required(value) {
	return !!value.trim() || 'Required';
}

function wizard (options) {
	var questions = [];

	if(options.cipher && !options.password){
		questions.push({
			type: 'input',
			name: 'password',
			message: 'What is the sqlite-cipher password?',
			validate: required
		});
	}

	if(options.cipher && !options.algorithm){
		questions.push({
			type: 'input',
			name: 'algorithm',
			message: 'What is the sqlite-cipher algorithm?',
			validate: required,
			default: 'aes-256-ctr'
		});
	}

	if(options.table){
		if(!options.columns){
			questions.push({
				type: 'input',
				name: 'columns',
				message: 'You need to inform the columns of your table',
				validate: required,
				default: "{id: 'INTEGER',name:'TEXT'}"
			});
		}
		if(!options.primary){
			var cols = utils.json(options.columns);
			questions.push({
				type: 'input',
				name: 'primary',
				message: 'What is the primary key?',
				validate: required,
				default: Object.keys(cols)[0]
			});
		}
		if(!options.incremental){
			questions.push({
				type: 'input',
				name: 'incremental',
				message: 'Do you have any incremental columns?',
				validate: required,
			});
		}
	}

	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    database.wizard(options);
	});
}