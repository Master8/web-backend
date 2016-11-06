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


})
.controller("gameController", function ($scope) {

	$scope.level = 0;
	$scope.health = 100;
	$scope.score = 0;

})
.controller("menuController", function ($scope, $http) {
	$http.get("?controller=menu").success(function (data) {
		$scope.items = data;
	});
})
.controller("pokemonController", function ($http, $scope, $interval, $timeout) {

	var pokemons;

	$http.get("?controller=pokemon").success(function (data) {
		pokemons = data;
		$scope.next();
	});

	var current = 0;
	$scope.power = 15;
	$scope.speed = 4;
	$scope.image = "images/pokemons/1.png";
	$scope.active = "hidden";

	var timer;
	$scope.x = 0;
	$scope.y = 20;

	var animation, time = 0;

	$scope.move = function () {
		$scope.active = "visible";
		animation = $interval(function () {
			time++;
			$scope.x += 5*Math.sin(time/50);
			$scope.y += 2*Math.cos(time/20);
		}, 50);

		timer = $timeout(function () {
			$scope.notCaught();
		}, 7000)
	};

	$scope.notCaught = function () {
		$rootScope.$emit("notCaughtPokemon");
		$scope.stop();
	};

	$scope.caught = function () {
		$rootScope.$emit("caughtPokemon");
		$scope.stop();
	};

	$scope.stop = function () {
		$scope.active = "hidden";
		$interval.cancel(animation);
		$timeout.cancel(timer);
		time = 0;
		$scope.x = 0;
		$scope.y = 20;

		$scope.next();
	};

	$scope.next = function () {

		if (current < pokemons.length)
		{
			$scope.power = pokemons[current].power;
			$scope.speed = pokemons[current].speed;
			$scope.image = pokemons[current].image;

			current++;

			$scope.move();
		}
		else
		{
			$rootScope.$emit("endPokemons");
		}
	};
})
.directive("header", function(){
	return {
		templateUrl:"assets/directives/header.html",
		replace: true,
		restrict: 'E',
		scope:{
		},
		controller: "menuController"
	}
})
.directive("pokemon", function () {
	return {
		templateUrl:"assets/directives/pokemon.html",
		replace: true,
		restrict: 'E',
		scope:{
		},
		controller: "pokemonController"
	}
})