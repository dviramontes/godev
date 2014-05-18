'use strict';

angular.module('godev', ['ngRoute', 'godev-main', 'godev-request','templates', 'google-maps'])
    .service('API', function($http) {
        return {
            getRandomTicket: function() {
                return $http.get("/random").then(function(response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            },

        }
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            })
            .when('/request', {
                templateUrl: 'main/request.html',
                controller: 'RequestCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });;
    });
