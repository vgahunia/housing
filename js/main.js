$(document).ready(function(){

    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome)&&(is_safari)) {is_safari=false;}
    if ((is_chrome)&&(is_opera)) {is_chrome=false;}
    if (is_safari) {
      $('form input[type=submit]').css('display','inline-block');
    }


    $('#openModal').modal('show');

    $('#yellow').click(function() {
      $('#yellowModal').modal('show');
    })
    $('#red').click(function() {
      $('#redModal').modal('show');
    })
    $('#green').click(function() {
      $('#greenModal').modal('show');
    })  
    $('#blue').click(function() {
      $('#blueModal').modal('show');
    })

    $('#yellowModal .dataButton').click(function() {
      $('.contentYellow').hide();
      $('#yellowModal .zipField').show();
    })
    $('#redModal .dataButton').click(function() {
      $('.contentRed').hide();
      $('#redModal .zipField').show();
    })
    $('#greenModal .dataButton').click(function() {
      $('.contentGreen').hide();
      $('#greenModal .zipField').show();
    })
    $('#blueModal .dataButton').click(function() {
      $('.contentBlue').hide();
      $('#blueModal .zipField').show();
    })
});

$(window).load(function() {
  $(".loader").fadeOut("slow");
})

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
    console.log(zip);
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
        var data5 = data[i].driveAloneLongCommute;
        writeData(data1, data2, data3, data4, data5);
      }
    }
  }
  function writeData(air, water, housing, drive, driveLong) {
    $('#dataPoint1 .dataValue').html(air);
    $('#dataPoint2 .dataValue').html(water);
    $('#dataPoint3 .dataValue').html(housing + "%");
    $('#dataPoint4 .dataValue').html(drive + "% / " + driveLong + "%");
  }
// END

//RECEIVING DATA from HOME PAGE FORM
  function newZip() {
    var newZipValue = document.getElementById('zipValue').value;
    getZip(newZipValue);
  }
  function newZipRed() {
    var newZipValue = document.getElementById('zipValueRed').value;
    getZip(newZipValue);
  }
  function newZipGreen() {
    var newZipValue = document.getElementById('zipValueGreen').value;
    getZip(newZipValue);
  }
  function newZipBlue() {
    var newZipValue = document.getElementById('zipValueBlue').value;
    getZip(newZipValue);
  }

  $('#yellowModal #zipClick').click(function(e) {
    e.preventDefault ? event.preventDefault() : (event.returnValue = false);
    newZip();
    setTimeout(function() {
      $('#yellowModal').modal('hide');
      $('.bikeScene').hide();
      $('.show #dataPoint1').addClass('selected');
      $('.dataPoints').show();
      $('#map').css('opacity', '.3');
    },500);
  });
  $('#redModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    newZipRed();
    setTimeout(function() {
      $('#redModal').modal('hide');
      $('.bikeScene').hide();
      $('.show #dataPoint3').addClass('selected');
      $('.dataPoints').show();
      $('#map').css('opacity', '.3');
    },500);
  });
  $('#greenModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    newZipGreen();
    setTimeout(function() {
      $('#greenModal').modal('hide');
      $('.bikeScene').hide();
      $('.show #dataPoint4').addClass('selected');
      $('.dataPoints').show();
      $('#map').css('opacity', '.3');
    },500);
  });
  $('#blueModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    newZipBlue();
    setTimeout(function() {
      $('#blueModal').modal('hide');
      $('.bikeScene').hide();
      $('.show #dataPoint2').addClass('selected');
      $('.dataPoints').show();
      $('#map').css('opacity', '.3');
    },500);
  });

  $('#next').on('click', getNext);
  $('#prev').on('click', getPrev);

  function getNext() {
    var $curr = $('.show .selected'),
        $next = ($curr.next().length) ? $curr.next() : $('.show div').first();
    $curr.removeClass('selected');
    $next.addClass('selected');
    // transition($curr, $next);
  }

  function getPrev() {
    var $curr = $('.show .selected'),
        $next = ($curr.prev().length) ? $curr.prev() : $('.show div').last();
    $curr.removeClass('selected');
    $next.addClass('selected');
    // transition($curr, $next);
  }

  function transition($curr, $next) {
    $next.css('z-index', 2).fadeIn('slow', function () {
        $curr.hide().css('z-index', 0);
        $next.css('z-index', 1);
    });
  }

  // links to different parts of map

  $('#city img').click(function() {
    $('#map').removeClass().addClass('city');
    $('#openModal').modal('hide');
    bikeScene();
  });
  $('#suburb img').click(function() {
    $('#map').removeClass().addClass('suburb');
    $('#openModal').modal('hide');
    bikeScene();
  });
  $('#rural img').click(function() {
    $('#map').removeClass().addClass('rural');
    $('#openModal').modal('hide');
    bikeScene();
  });

  function bikeScene() {
    $('.bikeScene').show();
    setTimeout(function() {
      $('#bike').addClass('ride');
    }, 300);
    setTimeout(function() {
      $('#yellow').css('opacity','1').addClass('bounce');
    }, 1200);
    setTimeout(function() {
      $('#blue').css('opacity','1').addClass('bounce');
    }, 1600);
    setTimeout(function() {
      $('#green').css('opacity','1').addClass('bounce');
    }, 2000);
    setTimeout(function() {
      $('#red').css('opacity','1').addClass('bounce');
    }, 2400);
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