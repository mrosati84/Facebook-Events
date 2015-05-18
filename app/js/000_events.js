/**global FB */

(function(exports) {
    'use strict';

    exports.EVENTS = {
        findNearbyPlaces: function (distance) {
            return new Promise(function (resolve, reject) {
                distance = distance || 5000;

                navigator.geolocation.getCurrentPosition(function(position) {
                    var latlng = position.coords.latitude + ',' + position.coords.longitude;

                    FB.api('/search/?q=&type=place&center=' + latlng + '&distance=' + distance, function (places) {
                        (places.error) ? reject(places) : resolve(places);
                    });
                }, function(error) {
                    reject(error);
                });
            });
        },
        findEventsByPlace: function (places) {

        }
    };
}(this));
