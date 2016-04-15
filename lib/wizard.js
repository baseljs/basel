'use strict';

var inquirer = require('inquirer'),
	install = require('./install'),
  _ = require('lodash');

module.exports = function(options) {
	function required(value) {
		return !!value.trim() || 'Required';
	}
	var questions = [{
		type: 'input',
		name: 'name',
		message: 'What would you name your basel app?',
		default: options.name,
		validate: required
	}];

	if(!options.title){
		questions.push({
			type: 'input',
			name: 'title',
			message: 'What will be the title of your application window?',
			default: options.name,
			validate: required
		});
	}

	if(options.cipher){
		if(!options.password){
			questions.push({
				type: 'input',
				name: 'password',
				message: 'What is the sqlite-cipher password?',
				validate: required
			});
		}
		if(!options.algorithm){
			questions.push({
				type: 'input',
				name: 'algorithm',
				message: 'What is the sqlite-cipher algorithm?',
				validate: required,
				default: 'aes-256-ctr'
			});
		}
	}

	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    install.init(options);
	});

};