var g_userPosition = new Object();
var bGeoSuccess = false;
g_userPosition.coords = new Object;
/*g_userPosition.coords.latitude = 41.3;
g_userPosition.coords.longitude = -81.1;
*/
//41.468371,	-81.03948
	
$(document).ready(function(){
    $("#custom-select-1").change(function() {
    	
    	var selectVal = $( this ).val().split('/');
    	window.errorNum = 0;
        max_height();
        $.mobile.loading( 'show', {
                text: 'Getting your position',
                textVisible: true,
                theme: 'a',
                html: ""
        });
        var directionsDisplay;
        var latitude = selectVal[0];
        var longitude = selectVal[1];

        var position = new Object();
        if(latitude && longitude){
            window.dlat = latitude;
            window.dlon = longitude;
            navigator.geolocation.getCurrentPosition(onSuccessShowDirection, onError,{'enableHighAccuracy':true,'timeout':30000, maximumAge: 30000});
        }else{
            navigator.geolocation.getCurrentPosition(takeFirstDirection, onError,{'enableHighAccuracy':true,'timeout':30000, maximumAge: 30000});
        }
    });
	
	var response = $('#all-dest');
    if ($('#all-dest option').length == 1){
        $.ajax({
			url: ''+sitefiles+'ajaxdb.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data){
				response.empty();
				response.append('<option value="" selected="selected">Business</option>');
				$.each(data, function(i,item){ 
					//var landmark = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-last-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#direction?lan='+item.latitude+'&lon='+item.longitude+'" class="ui-link-inherit">'+item.name+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
					var landmark = '<option value="'+item.latitude+'/'+item.longitude+'">'+item.name+'</option>';
					response.append(landmark);
				 });
			},
			error: function(){
				alert('There was an error loading the data of geolocation');
				$.mobile.loading( 'hide', {});
			}
        });
    }
});

$(document).on("pagebeforeshow", "#direction", function(e, data){ 
	//getBusiness();
});

$(document).on('pageshow', '#nearby', function (event) {
    window.errorNum = 0;
    max_height();
    $.mobile.loading( 'show', {
            text: 'Getting your position',
            textVisible: true,
            theme: 'a',
            html: ""
    });

	if(bGeoSuccess == true) {
		takeNearbyMarkers(g_userPosition);
	}else {
		navigator.geolocation.getCurrentPosition(takeNearbyMarkers, onError, {'enableHighAccuracy':true,'timeout':30000});
	}    
});
$(document).on('pageshow', '#direction', function (event) {
    window.errorNum = 0;
    max_height();
    $.mobile.loading( 'show', {
            text: 'Getting your position',
            textVisible: true,
            theme: 'a',
            html: ""
    });
    
    var directionsDisplay;
    if ($.mobile.pageData && $.mobile.pageData.lan){
        //console.log("Parameter long=" + $.mobile.pageData.lan);
        var latitude = $.mobile.pageData.lan;
    }
    if ($.mobile.pageData && $.mobile.pageData.lon){
        //console.log("Parameter long=" + $.mobile.pageData.lan);
        var longitude = $.mobile.pageData.lon;
    }
    
    var position = new Object();
    if(latitude && longitude){
        window.dlat = latitude;
        window.dlon = longitude;

		position.coords = new Object;
		position.coords.latitude = latitude;
		position.coords.longitude = longitude;
		
		var st = window.dlat+"/"+window.dlon;
		var num = 0, row = 0;
		jQuery("#all-dest").find("option").each(function()
		{
			if($(this).val() == st) {
				$(this).attr("selected","selected");
				row = num;
			}
			num++;
		});
		$("#all-dest").prop('selectedIndex', row);  
		
		if(bGeoSuccess == true) {
			onSuccessShowDirection(g_userPosition);
		}
		else {
			navigator.geolocation.getCurrentPosition(onSuccessShowDirection, onError,{'enableHighAccuracy':true,'timeout':30000});
		}
    }else{
		if(bGeoSuccess == true) {
			takeFirstDirection(g_userPosition);
		}else{
			navigator.geolocation.getCurrentPosition(takeFirstDirection, onError,{'enableHighAccuracy':true,'timeout':30000});
		}
    }
});

$(document).on("pagebeforeshow", "#direction", function(e, data){ 
        if ($.mobile.pageData && $.mobile.pageData.lan){
            console.log("Parameter long=" + $.mobile.pageData.lan);
        }
 });

//document.addEventListener("deviceready", onDeviceReady, false);

document.addEventListener("deviceready", function(){
  if(navigator.network.connection.type == Connection.NONE){
    alert('no internet access');
  }
});

function showSelected(val){
    if(val.value){
        $.mobile.loading( 'show', {
                text: 'Getting your position',
                textVisible: true,
                theme: 'a',
                html: ""
        });
        var splite = val.value.split('/');
        window.dlat = splite[0];
        window.dlon = splite[1];
		
		if(bGeoSuccess == true) {
			onSuccessShowDirection(g_userPosition);
		}else{
			navigator.geolocation.getCurrentPosition(onSuccessShowDirection, onError,{'enableHighAccuracy':true,'timeout':30000});
		}
    }
}

function takeNearbyMarkers(position){
	if(bGeoSuccess == false) {
		bGeoSuccess = true;
		g_userPosition = position;
	}
    var  num = 0;
    $.mobile.loading( 'hide', {});
    $.mobile.loading( 'show', {
            text: 'Loading data from server...',
            textVisible: true,
            theme: 'a',
            html: ""
    });
    var nearMarkers = $.ajax({
            url: ''+sitemaps+'index.php?r=ajax/nearlocations',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            contentType: 'application/json; charset=utf-8',
            timeout: 5000,
            data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            success: function(data){
                    $.each(data, function(i,item){
                     var text = '<p class="marker-list-div"><b style="font-size: 16px">'+item.name+'</b><br /><b style="font-size: 16px">'+item.telefon+'</b><br />';
                     nearMarkers[i] = {'id': item.id, 'latitude': item.latitude, 'longitude': item.longitude, 'text': text, 'zoom': parseInt(item.zoom)};
                          num = i;
                     });
                    onSuccessShowNearMarkers(position, nearMarkers, num, nearMarkers[0].zoom);
					//onSuccessShowNearMarkers(position, nearMarkers, num, 10);
                    $.mobile.loading( 'hide', {});
            },
            error: function(e){
                 alert('There was an error loading the data of nearby');
				 $.mobile.loading( 'hide', {});
            }
    });
}

function takeFirstDirection(position){
	if(bGeoSuccess == false) {
		g_userPosition = position;
		bGeoSuccess = true;
	}
	$("#all-dest").prop('selectedIndex', 0); 
	getRealAdress(position);
	$.mobile.loading( 'hide', {});
	var map = new google.maps.Map(document.getElementById('map_canvas_direction'), {
		zoom: 10,
		center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false
	});    
	
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	directionsDisplay.setMap(map);
	addMarker(position.coords, map, 'my_loc.png', 0);
	
    var  num = 0;
    $.mobile.loading( 'hide', {});
    $.mobile.loading( 'show', {
            text: 'Loading data from server...',
            textVisible: true,
            theme: 'a',
            html: ""
    });
    $.ajax({
            url: ''+sitemaps+'index.php?r=ajax/nearlocations',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            success: function(data){
				$.mobile.loading( 'hide', {});
                    var nearMarkers = new Object();
                    $.each(data, function(i,item){
                                    var text = '<p class="marker-list-div"><b style="font-size: 16px">'+item.name+'</b><br /><b style="font-size: 16px">'+item.telefon+'</b><br />';
                                    nearMarkers[i] = {'id': item.id, 'latitude': item.latitude, 'longitude': item.longitude, 'text': text, 'zoom': parseInt(item.zoom)};
                                    
                                    num = i;
                            });
                            console.log('in ajax fun: ' + nearMarkers[0].latitude+', '+nearMarkers[0].longitude+' num: '+num);
				/*window.dlat = nearMarkers[0].latitude;
                            window.dlon = nearMarkers[0].longitude;
							var st = window.dlat+"/"+window.dlon;
							$("#all-dest option").each(function()
							{
								if($(this).val() == st) {
									$(this).attr("selected","selected");
								}
				});*/
				
				//onSuccessShowDirection(position, nearMarkers[0].zoom);
            },
            error: function(){
                    alert('There was an error loading the data');
					$.mobile.loading( 'hide', {});
            }
    });
}

//$.mobile.defaultPageTransition = "none";

function max_height() {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();
    
    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    } 
    $.mobile.activePage.find('[data-role="content"]').height(content_height);
}

function justShowMap(position){
    var minZoomLevel = 10;//15
    
    
    var map = new google.maps.Map(document.getElementById('map_canvas_direction'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    });
    $.mobile.loading( 'hide', {});
}

function onSuccessShowNearMarkers(position, nearMarkers, num, zoom){
    var minZoomLevel = zoom;
	//var minZoomLevel = 10;
    
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    }); 
    
    addMarker(position.coords, map, 'my_loc.png', 0);
    
    
    for(i=0; i <= num; i++){
        addMarker(nearMarkers[i], map, 'marker.png', 1);
    }
}

function addMarker(marker, map, icon, showBox){
    
    var new_marker = new google.maps.Marker (
    { 
        map : map,
        icon: icon,
        position : new google.maps.LatLng(marker.latitude, marker.longitude)
    });
    if(showBox)
        addInfoBox(map, new_marker, marker.id, marker.text);
}

function markersSamples(){
    var coords = new Array();
    coords[0] = {latitude:"44.017324", longitude:"20.90508", text: "End of the Commons 1-800-755-TOUR"};
    coords[1] = {latitude:"44.016213", longitude:"20.925257", text: "Mesto na poziciji 1"};
    coords[2] = {latitude:"44.010349", longitude:"20.911013", text: "Gimnazija na poziciji 2"};
    
    return coords;
}

function addInfoWindow(map, marker, id, message) {
    
    var infoWindow = new google.maps.InfoWindow({
        content: message+'<a class="view-listing" href="#business?id='+id+'"></a>'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

function addInfoBox(map, marker, id, message) {
    message += '<a class="view-listing" href="#business?id='+id+'"></a></p>';
    google.maps.event.addListener(marker, "click", function(e) {
        var infoBox = new InfoBox({latlng: marker.getPosition(), map: map, msg: message});
      });

}

function onSuccessShowDirection(position, zoom) { 
    if(bGeoSuccess == false) {
		g_userPosition = position;
		bGeoSuccess = true;
	}
    if(!zoom) 
		zoom = 10;//org=15
    
    getRealAdress(position);
    var minZoomLevel = zoom;
    var lat_start = window.dlat;
    var lng_start = window.dlon;
    $.mobile.loading( 'hide', {});
    
    var map = new google.maps.Map(document.getElementById('map_canvas_direction'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    });    
    
    calcRoute(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), map);
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    
    directionsDisplay.setMap(map);
    
}

function onError(error) {
    if(!window.errorNum){
        $.mobile.loading( 'hide', {});
        switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
					break;
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
					break;
                case error.TIMEOUT: alert("retrieving position time out");
					break;
                default: alert("unknown error");
					break;
            }
            window.errorNum = 1;
    }
}

function calcRoute(coords, map) {
var directionsService = new google.maps.DirectionsService();
  var start = coords;
  var lat = window.dlat;
  var lng = window.dlon;
  var end = new google.maps.LatLng (lat, lng);
 var icons = {
    start: new google.maps.MarkerImage(
        'start.png',
        new google.maps.Size( 80, 40 ),
        new google.maps.Point( 0, 0 )
       ),
       end: new google.maps.MarkerImage(
        'marker.png',
        new google.maps.Size( 28, 45 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 3, 40 )
       )
    };
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var leg = response.routes[ 0 ].legs[ 0 ];
      makeMarker( leg.start_location, icons.start, 'title', map );
      makeMarker( leg.end_location, icons.end, 'title', map );
    }
  });
}

function makeMarker( position, icon, title, map ) {
    new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
}

function getRealAdress(position){
    
    var geocoder = new google.maps.Geocoder();
    var sLat = parseFloat(position.coords.latitude);
    var sLong = parseFloat(position.coords.longitude);
    var box = $('#cur_loc');

    var latlng = new google.maps.LatLng(sLat, sLong);
    geocoder.geocode({
        'latLng':latlng
    },function(data,status){
        if(status == google.maps.GeocoderStatus.OK){
            var add = data[0].formatted_address; //this is the full address
            box.val(add);
        }
    });
}



function clickSelect(){
	open($('#all-dest'));
}

function open(elem) {
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elem[0].dispatchEvent(e);
    } else if (element.fireEvent) {
        elem[0].fireEvent("onmousedown");
    }
}