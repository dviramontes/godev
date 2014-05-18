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
      zoom: 8
    };

    $scope.about = "lorem ipsum dolor sit amet";
    
    $scope.need = "lorem";
  });
