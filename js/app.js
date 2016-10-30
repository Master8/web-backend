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
.controller("pagesController",function($scope, $http, $interval){

	$scope.x = 100;
	$scope.y = 70;

	$http.get("?controller=user").success(function (data) {
		$scope.users = data;
	});

	var animation, time = 0;

	var startAnimation = function () {
		animation = $interval(function () {
			time++;
			$scope.x += 7*Math.sin(time/50);
			$scope.y += 5*Math.cos(time/20);
		}, 50);
	};

	startAnimation();
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