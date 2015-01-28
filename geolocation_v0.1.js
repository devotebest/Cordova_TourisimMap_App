// Wait for Cordova to load

document.addEventListener("deviceready", onDeviceReady, false);

document.addEventListener("deviceready", function(){
  if(navigator.network.connection.type == Connection.NONE){
    alert('no internet access');
  }
});

$.mobile.defaultPageTransition = "slide";
$(function() {
    drawMap();
    $('.m-menu-nearby').click(function(){
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
        google.maps.event.trigger(map, "resize");
    });
});

function drawMap(){
    var lat = '-34.397';
    var lng = '150.644';
    var latlng = new google.maps.LatLng (lat, lng);
    var options = { 
        zoom : 12, 
        center : latlng, 
        mapTypeId : google.maps.MapTypeId.ROADMAP 
    };
    var $content = $("#map");
    //$content.height (screen.height - 100);
    var map = new google.maps.Map ($content[0], options);
    //$.mobile.changePage ($("#nearby"));
    new google.maps.Marker ( 
    { 
        map : map, 
        animation : google.maps.Animation.DROP,
        position : latlng  
    });
}


// Init google map

/*var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);*/


// Cordova is ready
//
function onDeviceReady() {
    
}

// onSuccess Geolocation

function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          +                                   position.timestamp          + '<br />';
}

// onError Callback receives a PositionError object

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}