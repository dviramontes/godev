'use strict';

angular.module('godev-request', ['ngRoute'])
    .controller('RequestCtrl', function($scope, API, $http) {

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

        $scope.$watch('address', function() {

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

        $scope.submitForm = function() {

            var payload = {
                email: $scope.email,
                phoneNumber: $scope.phoneNumber,
                about: $scope.about,
                needs: $scope.needs,
                latitude: $scope.map.marker.latitude,
                longitude: $scope.map.marker.longitude
            }

            $http.post('/ticket', payload)
                .success(function() {
                    console.log('success');
                })
                .error(function(err) {
                    console.log(err)
                    console.error('no!')
                });
        }


    });
