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

	$http.get("?controller=user").success(function (data) {
		$scope.users = data;
	});
})
.controller("gameController", function ($scope, $rootScope, $http) {

	$scope.level = 0;
	$scope.health = 100;
	$scope.score = 0;

	$rootScope.$on('caughtPokemon', function () {
		$scope.level++;
		$scope.score += parseInt($rootScope.currentPower);
	});

	$rootScope.$on('notCaughtPokemon', function () {

		if (($scope.health - 2 * parseInt($rootScope.currentPower)) <= 0)
		{
			$scope.health = 0;
			$rootScope.$emit('endGame');
		}
		else
		{
			$scope.level++;
			$scope.health -= 2 * parseInt($rootScope.currentPower);
		}
	});

	$rootScope.$on('endPokemons', function () {
		$rootScope.$emit('endGame');
	});

	$rootScope.$on('endGame', function () {
		$http.post("?controller=user",
			{id:0, name: "Michael", score: $scope.score})
			.success(function () {
				
			})
	});
})
.controller("menuController", function ($scope, $http) {
	$http.get("?controller=menu").success(function (data) {
		$scope.items = data;
	});
})
.controller("pokemonController", function ($http, $scope, $interval, $timeout, $rootScope) {

	var pokemons;

	$http.get("?controller=pokemon").success(function (data) {
		pokemons = data;
		$scope.next();
	});

	var current = 0;
	var isEnd = false;
	$scope.power = 0;
	$scope.speed = 1;
	$scope.image = "images/pokemons/1.png";
	$scope.active = "hidden";

	var timer;
	$scope.x = 50;
	$scope.y = 20;

	var animation, time = 0;

	$scope.move = function () {
		$scope.active = "visible";
		animation = $interval(function () {
			time += parseInt($scope.speed) / 2;
			$scope.x = 40*Math.sin(time/60) + 50;
			$scope.y = 15*Math.cos(time/20) + 20;
		}, 30);

		timer = $timeout(function () {
			$scope.notCaught();
		}, 8000)
	};

	$scope.notCaught = function () {
		$rootScope.$emit('notCaughtPokemon');
		$scope.stop();
	};

	$scope.caught = function () {
		$rootScope.$emit('caughtPokemon');
		$timeout.cancel(timer);
		$scope.stop();
	};

	$scope.stop = function () {
		$scope.active = "hidden";
		$interval.cancel(animation);
		time = 0;
		$scope.x = 50;
		$scope.y = 20;

		if (!isEnd)
			$scope.next();
	};

	$scope.next = function () {

		if (current < pokemons.length)
		{
			$scope.power = pokemons[current].power;
			$rootScope.currentPower = $scope.power;
			$scope.speed = pokemons[current].speed;
			$scope.image = pokemons[current].image;

			current++;

			$scope.move();
		}
		else
		{
			$rootScope.$emit('endPokemons');
		}
	};

	$rootScope.$on('endGame', function () {
		isEnd = true;
	});
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