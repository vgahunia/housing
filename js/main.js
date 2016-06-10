
window.onload = function() {
	var x = document.getElementById("target");
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}
	function showPosition(position) {
			var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    getAddress(lat,lng);
	}
	getLocation();

  // use Google Maps API to reverse geocode users' location
  function getAddress(latitude, longitude) {
      // set up the Geocoder object
      var geocoder = new google.maps.Geocoder();
   
      // turn coordinates into an object
      var yourLocation = new google.maps.LatLng(latitude, longitude);
   
      // GET USER'S COUNTY and STATE info from API
      geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        if(results[0]) {
          $('#target').fadeIn(function() {
            let countyName = results[0].address_components.find(function (component) {
                return component.types[0] == "administrative_area_level_2";
              });
            let stateName = results[0].address_components.find(function (component) {
                return component.types[0] == "administrative_area_level_1";
              });
            countyFull = countyName.long_name.toLowerCase();
            var c = countyFull.split(" ");
            var county = c[0];
            var state = stateName.long_name.toLowerCase();
            getData(county, state);
          })
        } else {
          error('Google did not return any results.');
        }
      } else {
        error("Reverse Geocoding failed due to: " + status);
      }
    });
  }

// MATCHING DATA from data.js and SENDING DATA to VIEW
  var data1 = JSON.stringify(housingData);
  var data = JSON.parse(data1);

  function getData(county, state) {
    for (var i=0; i<data.length;i++) {
      if (data[i].county.toLowerCase() == county && data[i].state.toLowerCase() == state) {
        var data1 = data[i].airPollution;
        var data2 = data[i].waterViolation;
        var data3 = data[i].housingProblems;
        var data4 = data[i].driveAlone;
        var data5 = data[i].driveAloneLongCommute;
        var data6 = data[i].state
        writeData(county, state, data1, data2, data3, data4, data5);
      }
    }
    console.log(county, data6, data1, data2, data3, data4, data5);
  }
  function writeData(writeCounty, writeState, air, water, housing, drive, driveLong) {
    $('#target').html(writeCounty + ' County, ' + writeState);
    $('#countyInput').show();
    $('#dataPoint1 p').html(air);
    $('#dataPoint2 p').html(water);
    $('#dataPoint3 p').html(housing);
    $('#dataPoint4 p').html(drive);
    $('#dataPoint5 p').html(driveLong);
  }
// END

//RECEIVING DATA from HOME PAGE FORM
  function newCounty() {
    var newCountyValue = document.getElementById('countyValue').value.toLowerCase();
    var newStateValue = document.getElementById('stateValue').value.toLowerCase();
    getData(newCountyValue, newStateValue);
  }

  $('#countyClick').click(function() {
    newCounty();
  })
// END
}


//Google Maps Key - AIzaSyCFQqre9L6qnIiGrpvkQMdMK-c6Z5D5HJU