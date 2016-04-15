'use strict';

var inquirer = require('inquirer'),
	install = require('./install'),
  _ = require('lodash');

module.exports = function(options) {
	function required(value) {
		return !!value.trim() || 'Required';
	}
	if(!options.title){
		questions.push({
			type: 'input',
			name: 'title',
			message: 'What will be the title of your application window?',
			validate: required
		})
	}
	var questions = [{
		type: 'input',
		name: 'name',
		message: 'What would you name your basel app?',
		default: options.name,
		validate: required
	}];


	inquirer.prompt(questions, function(results) {
	    _.assign(options, results);
	    install.init(options);
	});

};