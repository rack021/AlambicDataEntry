var App = angular.module('app');
App.controller('Auth', function ($scope, Factory, $location, $cookies) {
    validUser($location, $cookies);
    $scope.error = false;

    $scope.loginBtn = function (isValid) {
        var api = $location.absUrl() + 'authenticate';
        if (isValid) {

            var userCredential = {
                name: $scope.name,
                password: $scope.password
            };
            Factory.login(api, userCredential, function (err, data) {
                if (err) {
                    $scope.error = true;
                } else {
                    $cookies.put("token", data.token);
                }
            });
        }

    };
});


App.controller('NewEntry', function ($scope, Factory, $location, $cookies) {
    validUser($location, $cookies);
});

var validUser = function ($location, $cookies) {
    if ($cookies.get('token')) {
        $location.path('/New/Entry');
    } else {
        $location.path('/');
    }
}