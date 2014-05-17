'use strict';

angular.module('godev', [ 'ngRoute','godev-main','templates', 'google-maps'])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });
