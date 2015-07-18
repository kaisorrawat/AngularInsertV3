var app = angular.module('demoApp',['ngRoute','ui.bootstrap']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when
		(
			'/',
			{
				controller: 'customerCtrl',
				templateUrl: 'view1.html'
			}
		)
		.when
		(
			'/edit/:id',
			{
				controller: 'EditCtrl',
				templateUrl: 'customerEdit2.html'
			}
		)
		
		.otherwise({redirectTo:'/'});
}]);