'use strict';

angular.module('godev-main', [])
    .controller('MainCtrl', function($scope, API, $http) {

        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            marker: {
                latitude: 0,
                longitude: 0
            },
            zoom: 12,
            control: {}
        };


        API.getRandomTicket().then(function(data) {

            $scope.map.control.refresh({
                latitude: data[0].latitude,
                longitude: data[0].longitude
            });

            $scope.map.marker = {
                latitude: data[0].latitude,
                longitude: data[0].longitude
            };

            $scope.about = data[0].about;
            $scope.need = data[0].needs;
            $scope.location = data[0].address;

            $scope.ident = data[0].ident;
        });


        $scope.openMap = function() {
            window.open("https://maps.google.com/maps?q=" + ($scope.map.marker.latitude + .0000) + "," + ($scope.map.marker.longitude + .0000), '_blank');
        }

        $scope.hideSocial = true;
        $scope.hideMessage = true;

        $scope.showSocialMedia = function() {
            $scope.hideSocial = !$scope.hideSocial;
        }

        $scope.sendTextMessage = function() {
            $scope.hideMessage = !$scope.hideMessage;
        }

        $scope.reloadPage = function() {
            document.location.reload(true);
        }
        $scope.reachOut = function() {
            var payload = {
                email: $scope.email,
                phoneNumber: $scope.phoneNumber
            }
            console.log('here...')
            $http.post('/reachout/' + $scope.ident, payload)
                .success(function() {
                    console.log('success');
                })
                .error(function(err) {
                    console.log(err)
                });
        }
    });
