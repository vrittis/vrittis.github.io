var surveillance = angular.module("surveillance", ['ngAnimate','ngCookies','angularLocalStorage']);

surveillance.controller("StackOverflow", function ($scope, $http, $interval, storage) {

	storage.bind($scope, "queries", {
	defaultValue:[{
					"title" : "angularjs is used in this app",
					"search" : "https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=angularjs&site=stackoverflow"
				}
			]
	});
	
	$scope.items = {};
	
	$scope.refreshAll = function () {
		console.log("Refresh all queries");
		for (var i = 0; i < $scope.queries.length; i++) {
			$scope.refresh($scope.queries[i]);
		}
	};

	$scope.refresh = function (query) {
		console.log("Refresh \"" + query.title + "\"");
		$scope.items[query.title] = [];
		$http.get(query.search).
		success(function (data) {
			console.log("Refresh \"" + query.title + "\" successful");
			$scope.items[query.title] = data.items;
		});
	}

	$scope.add = function () {
		var query = {"title":$scope.newQueryTitle, "search":$scope.newQuerySearch};
		$scope.queries.push(query);
		$scope.refresh(query);
	};

	$scope.remove = function (query) {
		var index = $scope.queries.indexOf(query);
		if (index > -1) {
			$scope.queries.splice(index, 1);
		}
	};

	$scope.prepareRaw = function() {
		$scope.stringifiedQueries = JSON.stringify($scope.queries);
	};
	
    $scope.loadRaw = function() {
		try {
			var loadedQueries = angular.fromJson($scope.stringifiedQueries);
			$scope.queries = loadedQueries;
			$scope.refreshAll();
		} catch (e) {
			// something bad happened
			// we should alert the user
			console.log("Couldn't read the JSON");
		}
	};
	
	$scope.refreshAll();

});
