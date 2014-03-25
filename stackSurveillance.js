function stackSurveillance($scope, $http, $interval) {

	$scope.searches = [
	{"title":"Castle & co",
	"search":"https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=castle&site=stackoverflow"}
	, 
	{"title":"nsubstitute",
	"search":"https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=nsubstitute&site=stackoverflow"}
	, 
	{"title":"log4net",
	"search":"https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=log4net&site=stackoverflow"}
	, {"title":"automapper",
	"search":"https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=25&order=desc&sort=creation&closed=False&tagged=automapper&site=stackoverflow"}
	];

	$scope.queries = [];
	
	var running;
	$scope.start = function()	{
		if (angular.isDefined(running)) return;
		
		running = $interval($scope.refresh, 6000);
	};
	
	$scope.refresh = function() {
		$scope.queries = [];
				for (var i = 0; i < $scope.searches.length -1; i++)
				{
					$http.get($scope.searches[i].search).
					success(function(data) {
						$scope.queries.push(data.items);
					});
				}
	}
	
	$scope.stop = function() {
	if (angular.isDefined(running)) {
	$interval.cancel(running);
	running = undefined;
	}
	};
	
	 $scope.$on('$destroy', function() {
$scope.stop();
});


}
