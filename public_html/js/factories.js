var App = angular.module('app');
App.factory('Factory', ['$http', function ($http) {
    function getDataFromServer(url, callback, noContent) {
        $http.get(url).
        success(function (data, status, headers, config) {

            if (status == 200 && data != noContent) {
                callback(null, data);
            } else {
                callback("No Content", null);
            }
        }).
        error(function (data, status, headers, config) {
            callback("Error occurred", null);
        });
    };

    function postDataToServer(url, data, callback, noContent) {
        $http.post(url, data).
        success(function (data, status, headers, config) {
            if (status == 200 && data != noContent) {
                callback(null, data);
            } else {
                callback("No Content", null);
            }
        }).
        error(function (data, status, headers, config) {
            callback("Error occurred", null);
        });
    };


    return {
        login: function (api, UserInfo, callback) {
            postDataToServer(api, UserInfo, callback, "");
        }

    }
}]);