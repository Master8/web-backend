"use strict";

var app = angular.module("game", ["ngRoute", "ngResource"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/page/:name", {
        templateUrl : function(page){
        	return "assets/"+page.name+".html"
        },
        controller: "pagesController"
    })
    .otherwise("/page/start");
})
.controller("pagesController",function($scope,$http){

	$http.get("?controller=user").success(function (data) {
		$scope.users = data;
	});
})
.controller("menuController", function ($scope, $http) {
	$http.get("?controller=menu").success(function (data) {
		$scope.items = data;
	});
})
.directive("header", function(){
	return {
		templateUrl:"assets/directives/header.html",
		replace: true,
		restrict: 'E',
		scope:{
			current: '='
		}
	}
})