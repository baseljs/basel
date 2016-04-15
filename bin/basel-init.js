#!/usr/bin/env node
var wizard = require('../lib/wizard'),
	program = require('commander');

program
  .description('Create a BASEL application in the current working directory')
  .option('-b, --branch <branch>', 'git branch')
  .option('-db, --database <database>', 'Data base name')
  .option('-t, --title <title>', 'Data base name')
  .option('-tp, --type <type>', 'Application type')
  .option('-d, --description <description>', 'Application description')
  .parse(process.argv);

var options = {
  name: program.args.length ? program.args[0] : 'basel',
  branch: program.branch || 'master',
  database: program.database || 'database',
  title: program.title,
  type: program.type || 'simple',
  description: program.description || 'BASEL Application'
};

wizard(options);