$(document).ready(function(){
    $('#myModal').modal('show');
});

window.onload = function() {

// MATCHING DATA from data.js and SENDING DATA to VIEW
  var data1 = JSON.stringify(housingData);
  var data = JSON.parse(data1);

  var data2 = JSON.stringify(zipData);
  var dataZip = JSON.parse(data2);

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function getZip(zip) {
    console.log(zip)
    for (var i=0; i<dataZip.length;i++) {
      if (dataZip[i].zip === zip) {
        getData(dataZip[i].county)
      }
    }
  }
  function getData(county) {
    var data2;
    var newCounty = Number(county);
    for (var i=0; i<data.length;i++) {
      if (data[i].fips == newCounty) {
        var data1 = data[i].airPollution;
        if (data[i].waterViolation === "") {
          data2 = "N/A";
        } else {
          data2 = data[i].waterViolation;
        };
        var data3 = data[i].housingProblems;
        var data4 = data[i].driveAlone;
        writeData(data1, data2, data3, data4);
      }
    }
  }
  function writeData(air, water, housing, drive) {
    $('#dataPoint1 p').html(air);
    $('#dataPoint2 p').html(water);
    $('#dataPoint3 p').html(housing);
    $('#dataPoint4 p').html(drive);
  }
// END

//RECEIVING DATA from HOME PAGE FORM
  function newZip() {
    var newZipValue = document.getElementById('zipValue').value;
    getZip(newZipValue);
  }

  $('#zipClick').click(function() {
    newZip();
  })

  $('#next').on('click', getNext);
  $('#prev').on('click', getPrev);

  function getNext() {
    var $curr = $('.show div:visible'),
        $next = ($curr.next().length) ? $curr.next() : $('.show div').first();
    transition($curr, $next);
  }

  function getPrev() {
    var $curr = $('.show div:visible'),
        $next = ($curr.prev().length) ? $curr.prev() : $('.show div').last();
    transition($curr, $next);
  }

  function transition($curr, $next) {
    $next.css('z-index', 2).fadeIn('slow', function () {
        $curr.hide().css('z-index', 0);
        $next.css('z-index', 1);
    });
  }
}
// END
//  var x = document.getElementById("target");
//  function getLocation() {
//      if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(showPosition, showError);
//      } else {
//          x.innerHTML = "Geolocation is not supported by this browser.";
//      }
//  }
//  function showPosition(position) {
//      var lat = position.coords.latitude;
//      var lng = position.coords.longitude;
//      getAddress(lat,lng);
//  }
//   function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             x.innerHTML = "User denied the request for Geolocation. Please enter information in the fields below."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML = "Location information is unavailable. Please enter information in the fields below."
//             break;
//         case error.TIMEOUT:
//             x.innerHTML = "The request to get user location timed out. Please enter information in the fields below."
//             break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML = "An unknown error occurred. Please enter information in the fields below."
//             break;
//     }
// }
//  getLocation();

//   // use Google Maps API to reverse geocode users' location
//   function getAddress(latitude, longitude) {
//       // set up the Geocoder object
//       var geocoder = new google.maps.Geocoder();
  
//       // turn coordinates into an object
//       var yourLocation = new google.maps.LatLng(latitude, longitude);
   
//       // GET USER'S COUNTY and STATE info from API
//       geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
//       if(status == google.maps.GeocoderStatus.OK) {
//         if(results[0]) {
//           $('#target').fadeIn(function() {
//             let countyName = results[0].address_components.find(function (component) {
//                 return component.types[0] == "administrative_area_level_2";
//               });
//             let stateName = results[0].address_components.find(function (component) {
//                 return component.types[0] == "administrative_area_level_1";
//               });
//             let zipName = results[0].address_components.find(function (component) {
//                 return component.types[0] == "postal_code";
//               });
//             countyFull = countyName.long_name.toLowerCase();
//             var c = countyFull.split(" ");
//             var county = c[0];
//             var state = stateName.long_name.toLowerCase();
//             var geoZip = zipName.long_name;
//             console.log(geoZip);
//             getZip(geoZip);
//           })
//         } else {
//           error('Google did not return any results.');
//         }
//       } else {
//         error("Reverse Geocoding failed due to: " + status);
//       }
//     });
//   }


//Google Maps Key - AIzaSyCFQqre9L6qnIiGrpvkQMdMK-c6Z5D5HJU