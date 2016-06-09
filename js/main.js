
window.onload = function() {
	var x = document.getElementById("target");
	var lat,lng, zip;
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
            let postalCode = results[0].address_components.find(function (component) {
                return component.types[0] == "postal_code";
            });
            zip = postalCode.long_name;
            $('#target').html(zip);
            getData();
          })
        } else {
          error('Google did not return any results.');
        }
      } else {
        error("Reverse Geocoding failed due to: " + status);
      }
    });

  }

  var data1 = JSON.stringify(housingData);
  var data = JSON.parse(data1);
  function getData() {
    for (var i=0; i<data.length;i++) {
      if (data[i].zip == zip) {
        data1 = data[i].airPollution;
        data2 = data[i].waterViolation;
        data3 = data[i].housingProblems;
        data4 = data[i].driveAlone;
        data5 = data[i].driveAloneLongCommute;
        writeData(data1, data2, data3, data4, data5);
      }
    }
  }
  function writeData(air, water, housing, drive, driveLong) {
    $('#dataPoint1 p').html(air);
    $('#dataPoint2 p').html(water);
    $('#dataPoint3 p').html(housing);
    $('#dataPoint4 p').html(drive);
    $('#dataPoint5 p').html(driveLong);
  }
  
}


//Google Maps Key - AIzaSyCFQqre9L6qnIiGrpvkQMdMK-c6Z5D5HJU