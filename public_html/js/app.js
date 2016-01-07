var App = angular.module('app', ['ngMaterialize', 'ngRoute', 'ngMessages', 'ngCookies']);
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/js/view/auth/login.html',
        controller: 'Auth'
    });
    $routeProvider.when('/New/Entry', {
        templateUrl: '/js/view/DataEntry/entry.html',
        controller: 'NewEntry'
    });
    $locationProvider.html5Mode(true);
}]);