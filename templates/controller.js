"use strict";
app.controller("CONTROLLER_NAME", function($scope, $location){

	$scope.table_name = "TABLE_NAME";
	$scope.primary_key = "PRIMARY_KEY";

	//List
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			$scope.items = data;
		});
	}

	//Saving
	$scope.save = function(){
		if($scope.form[$scope.primary_key]){
			//Edit
			var id = $scope.form[$scope.primary_key];
			delete $scope.form[$scope.primary_key];
			delete $scope.form.$$hashKey; 
			basel.database.update($scope.table_name, $scope.form, {$scope.primary_key: id}); 
		}else{
			//new
			basel.database.insert($scope.table_name, $scope.form); 
		}
		$scope.form = {};
		$scope.list();
		$('#modalNew').modal('hide');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Open to edit
	$scope.edit = function(data){
		$scope.form = data;
		$('#modalNew').modal('show');
	}

	//Delete
	$scope.delete = function(data){
		if(confirm("Are you sure?")){
			basel.database.delete($scope.table_name, {$scope.primary_key: data[$scope.primary_key]});
			$scope.list();
		}
	}
});