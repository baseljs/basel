#!/usr/bin/env node
var wizard = require('../lib/wizard'),
	program = require('commander');

program
  .description('Create a BASEL application in the current working directory')
  .option('-d, --database <database>', 'Data base name')
  .option('-c, --cipher ', 'Data base encripted')
  .option('-p, --passowrd <passowrd>', 'Data base encripted passowrd')
  .option('-a, --algorithm <algorithm>', 'Data base encriptation algorithm')
  .option('-t, --title <title>', 'Application title')
  .option('-e, --description <description>', 'Application description')
  .option('-u, --url <url>', 'URL of Git repository')
  .option('-b, --base <base>', 'Base app for BASEL')
  .parse(process.argv);

var options = {
  name: program.args.length ? program.args[0] : 'basel',
  database: program.database || 'database',
  title: program.title,
  type: program.type || 'simple',
  description: program.description || 'BASEL Application',
  cipher: program.cipher,
  passowrd: program.passowrd,
  algorithm: program.algorithm,
  url: program.url,
  base: program.base
};

wizard(options);
