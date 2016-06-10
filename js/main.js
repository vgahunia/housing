
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
            getData(zip);
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
  function getData(zipCode) {
    for (var i=0; i<data.length;i++) {
      if (data[i].zip == zipCode) {
        var data1 = data[i].airPollution;
        var data2 = data[i].waterViolation;
        var data3 = data[i].housingProblems;
        var data4 = data[i].driveAlone;
        var data5 = data[i].driveAloneLongCommute;
        writeData(data1, data2, data3, data4, data5);
      }
    }
    console.log(zipCode);
  }
  function writeData(air, water, housing, drive, driveLong) {
    $('#target').html(zip);
    $('#zipInput').show();
    $('#dataPoint1 p').html(air);
    $('#dataPoint2 p').html(water);
    $('#dataPoint3 p').html(housing);
    $('#dataPoint4 p').html(drive);
    $('#dataPoint5 p').html(driveLong);
  }

  function newZip() {
    var newZipValue = document.getElementById('zipValue').value;
    getData(newZipValue);
  }

  $('#zipClick').click(function() {
    newZip();
  })
  
}


//Google Maps Key - AIzaSyCFQqre9L6qnIiGrpvkQMdMK-c6Z5D5HJU