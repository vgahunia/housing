
window.onload = function() {
	var x = document.getElementById("target");
	var lat,lng;
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}
	function showPosition(position) {
			lat = position.coords.latitude;
	    lng = position.coords.longitude;
	    getAddress(lat,lng);
	}
	getLocation();
}
// use Google Maps API to reverse geocode users' location
function getAddress(latitude, longitude) {
    // set up the Geocoder object
    var geocoder = new google.maps.Geocoder();
 
    // turn coordinates into an object
    var yourLocation = new google.maps.LatLng(latitude, longitude);
 
    // find out info about our location
    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[0]) {
        $('#target').fadeIn(function() {
          $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address + '</em></p>').fadeIn();
        })
      } else {
        error('Google did not return any results.');
      }
    } else {
      error("Reverse Geocoding failed due to: " + status);
    }
  });

}
//Google Maps Key - AIzaSyCFQqre9L6qnIiGrpvkQMdMK-c6Z5D5HJU