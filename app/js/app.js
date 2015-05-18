(function(exports) {
    var mapCanvas = document.getElementById('map-canvas');

    navigator.geolocation.getCurrentPosition(function (position) {
        var map = new google.maps.Map(mapCanvas, {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    });
}(this));
