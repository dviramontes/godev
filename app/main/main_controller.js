'use strict';

angular.module('godev-main', ['ngRoute'])
    .service('API', function($http) {
        return {
            ticket: function(id) {
                return $http.get("/ticket/" + id).then(function(response) {
                    if (response.data.error) {
                        return null;
                    } else {
                        return response.data;
                    }
                });
            }
        }
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function($scope, API) {
        
        API.ticket(0).then(function(data){
          console.log(data)
          // $scope.ticket = data;
        });
        
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 12
        };

        $scope.openMap = function() {
            window.open("https://maps.google.com/maps?q=" +
                ($scope.map.center.latitude + .0000) + "," + ($scope.map.center.longitude + .0000), '_blank');
        }

        $scope.about = "lorem ipsum dolor sit amet";

        $scope.need = "lorem";
    });
