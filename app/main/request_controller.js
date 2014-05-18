'use strict';

angular.module('godev-request', ['ngRoute'])
    .controller('RequestCtrl', function($scope, API, $http) {

        // var coords  = navigation.geolocation

        $scope.map = {
            center: {
                latitude: 39.740617,
                longitude: -104.987106
            },
            marker: {
                latitude: 39.740617,
                longitude: -104.987106
            },
            zoom: 12,
            control: {}
        };

        $scope.address = '';

        var lookupAddress = function(addr) {
            // $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ addr +'&sensor=true&key=AIzaSyB6dzb6lJyQa00R9OWC2W0LGiUrEibLPaU', function(data){
//             $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+CA&sensor=true&key=AIzaSyB6dzb6lJyQa00R9OWC2W0LGiUrEibLPaU
// ', function(data) {
//                 console.log(data);
//             });
        }

        lookupAddress('800 ogden st');

        $scope.$watch('address', function() {

            // http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false&key=API_KEY
            console.log('address is now ' + $scope.address);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: $scope.address
            }, function(result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    $scope.map.control.refresh({
                        latitude: result[0].geometry.location.k,
                        longitude: result[0].geometry.location.A
                    });
                    $scope.map.marker = {
                    	latitude: result[0].geometry.location.k,
                        longitude: result[0].geometry.location.A
                    };
                }
            });

            // TODO: update map with geotag of new address
        });


    });
