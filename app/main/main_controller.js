'use strict';

angular.module('godev-main', [])
    .controller('MainCtrl', function($scope, API) {

        API.getRandomTicket().then(function(data) {

            console.log(data)

            $scope.map = {
                center: {
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                zoom: 12
            };

        });

        $scope.map = {
            center: {
                latitude: 39.740617,
                longitude: -104.987106
            },
            zoom: 12
        };

        $scope.openMap = function() {
            window.open("https://maps.google.com/maps?q=" + ($scope.map.center.latitude + .0000) + "," + ($scope.map.center.longitude + .0000), '_blank');
        }

        $scope.about = "lorem ipsum dolor sit amet";
        $scope.need = "lorem";

        
        $scope.hideSocial= true;
        $scope.hideMessage = true;
        
        $scope.showSocialMedia = function() {
            $scope.hideSocial  = !$scope.hideSocial;
        }

        $scope.sendTextMessage = function() {
            $scope.hideMessage = !$scope.hideMessage;
        }

        $scope.reloadPage = function() {
            document.location.reload(true);
        }
    });
