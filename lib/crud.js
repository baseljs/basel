var jsdom = require("jsdom");
var fs = require("fs");
var _database = require('./database.js');
var series = require('async-series');
var path = require('path');

module.exports = function  (options) {
	options.db = _database.init(options);
	series([
	  function(done) {
	    view(options,done);
	  },
	  function(done) {
	    controller(options,done)
	  },
	  function(done) {
	    index(options)
	  }
	], function(err) {
	  console.log(err.message) // "another thing" 
	});
}

function view(options, done){
	console.log("Creating view...")
	var db = options.db;
	var fields = db.run('PRAGMA table_info(?)',[options.table]);
	var template = path.join(process.cwd(),'templates','crud.html');
	if(!fs.existsSync(template)){
		template = path.join(__dirname,'templates','crud.html');
	}
	fs.readFile(template, 'utf8', function(error, data) {
	    jsdom.env(data, function (errors, window) {
	        var $ = require('jquery')(window);

	        $('.basel-controller').attr('ng-controller',options.controller);
	        $('.modal-title').text(options.name_)

	        var headTable = $('.basel-table-head').append($('<tr/>')).find('tr');
	        var bodyTable = $('.basel-table-body').append($('<tr/>').attr('dir-paginate','item in items | filter: search | itemsPerPage: 10')).find('tr');
	        var form = $('.basel-form');

	        for(var i = 0 ; i < fields.length ; i++){
	        	var field = fields[i];
	        	headTable.append('<th>'+field.name+'</th>');
	        	bodyTable.append('<td>{{item.'+field.name+'}}</td>');

	        	var input = $('<input/>').attr({
	        		type:'text',
	        		class:'form-control',
	        		"ng-model":"form."+field.name
	        	});

	        	form.append($('<div/>', {
	        		class:'form-group'
	        	}).append($('<label/>').text(field.name)).append(input));
	        }

	        headTable.append('<th></th>');

	        var btnEdit = $('<button>').attr({
	        	class:"btn btn-info btn-xs",
	        	"ng-click":'edit(item)'
	        }).html('<span class="glyphicon glyphicon-pencil"></span> Edit');

	        var btnDelete = $('<button>').attr({
	        	class:"btn btn-danger btn-xs",
	        	"ng-click":'delete(item)'
	        }).html('<span class="glyphicon glyphicon-trash"></span> Delete');

	        bodyTable.append($('<td/>').append(btnEdit).append(btnDelete))

	        fs.writeFile(path.join(process.cwd(),'views',options.view), window.document.documentElement.outerHTML, function (error){
	            if (error) throw error;
	            console.log("View created!")
	            done();
	        });
	    });
	});
}

function controller(options, done){
	console.log("Creating controller...");
	var db = options.db;
	var fields = db.run('PRAGMA table_info(?)',[options.table]);
	var template = path.join(process.cwd(),'templates','controller.js');
	if(!fs.existsSync(template)){
		template = path.join(__dirname,'templates','controller.js');
	}
	fs.readFile(template, 'utf8', function(error, data) {

		data = data.split('CONTROLLER_NAME').join(options.controller);
		data = data.split('TABLE_NAME').join(options.table);

		for(var i = 0 ; i < fields.length ; i++){
			if(fields[i].pk == 1){
				data = data.split('PRIMARY_KEY').join(fields[i].name);
				break;
			}
		}

		fs.writeFile(path.join(process.cwd(),'controllers',options.controller+".js"), data, function (error){
            if (error) throw error;
            console.log("Controller created!")
            done();
        });
	});
}

function index(options){
	var db = options.db;
	fs.readFile(path.join(process.cwd(),'index.html'), 'utf8', function(error, data) {
	    jsdom.env(data, function (errors, window) {
	        var $ = require('jquery')(window);
	        if( ! $('script[src="controllers/'+options.controller+'.js"]').length){
	        	$('head').append('<script src="controllers/'+options.controller+'.js" />')
	        }
	        db.insert('crud',{
	        	name: options.name_,
	        	view: options.view,
	        	controller: options.controller,
	        	table_: options.table,
	        	route: options.route,
	        	show_menu: options.show_menu
	        });
	        fs.writeFile(path.join(process.cwd(),'index.html'), window.document.documentElement.outerHTML, function (error){
	            if (error) throw error;
	            console.log();
	        console.log("CRUD created!");
	        });
	        
	    });
	});
}
