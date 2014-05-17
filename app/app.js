'use strict';

angular.module('godev', [ 'ngRoute','godev-main','templates' ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });