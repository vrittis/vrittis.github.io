var surveillance = angular.module("surveillance", ['ngCookies','angularLocalStorage']);

surveillance.controller("StackOverflow", function ($scope, $http, $interval, storage) {

	storage.bind($scope, "queries", {
	defaultValue:[{
					"title" : "angularjs is used in this app",
					"search" : "https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=angularjs&site=stackoverflow"
				}
			]
	});
	
	$scope.refreshAll = function () {
		console.log("Refresh all queries");
		for (var i = 0; i < $scope.queries.length; i++) {
			$scope.refresh($scope.queries[i]);
		}
	};

	$scope.refresh = function (query) {
		console.log("Refresh " + query.title);
		query.results = [];
		$http.get(query.search).
		success(function (data) {
			query.results = data.items;
		});
	}

	$scope.add = function () {
		var query = {"title":$scope.newQueryTitle, "search":$scope.newQuerySearch};
		$scope.queries.push(query);
		$scope.refresh(query);
<<<<<<< HEAD
	};

	$scope.remove = function (query) {
		var index = $scope.queries.indexOf(query);
		if (index > -1) {
			$scope.queries.splice(index, 1);
		}
	};

	$scope.retrieveQueries = function() {
		return new Blob(JSON.stringify($scope.queries), {type: "application/json"});
	};
	
	$scope.refreshAll();

});

surveillance.directive('downloadQueries', function ($compile) {
    return {
        restrict:'E',
        scope:{ getUrlData:'&getData'},
        link:function (scope, elm, attrs) {
            var url = URL.createObjectURL(scope.getUrlData());
            elm.append($compile(
                '<a class="btn" download="backup.json"' +
                    'href="' + url + '">' +
                    'Export settings' +
                    '</a>'
            )(scope));
        }
    };
=======
	};

	$scope.remove = function (query) {
		var index = $scope.queries.indexOf(query);
		if (index > -1) {
			$scope.queries.splice(index, 1);
		}
	};

	$scope.refreshAll();

>>>>>>> f5e65e094624500e7151daaf1695b80768a5dfec
});
