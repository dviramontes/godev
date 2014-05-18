'use strict';

angular.module('godev-main',['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
      });
  })
  .controller('MainCtrl', function ($scope) {
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
