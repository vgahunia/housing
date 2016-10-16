
var colorPick;
var housingPick;

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
// COLORED ICONS TO OPEN MODAL
    $('#yellow').click(function() {
      colorPick='yellow';
      $('#yellowModal').modal('show');
    })
    $('#red').click(function() {
      colorPick='red';
      $('#redModal').modal('show');
    })
    $('#green').click(function() {
      colorPick='green';
      $('#greenModal').modal('show');
    })  
    $('#blue').click(function() {
      colorPick='blue';
      $('#blueModal').modal('show');
    })
// BUTTON For HOUSING DATA
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

// BUTTON For WHAT WORKS FOR HEALTH
    $('.whatWorks').click(function() {
      $('.modal').modal('hide');
      getWhatWorks();
      $('#whatWorksModal').modal('show');
    })

    function getColorData() {
      var colorDataPull, colorData;
      if (colorPick=="red") {
        colorDataPull = JSON.stringify(redData);
        colorData = JSON.parse(colorDataPull);
        $('#whatWorksBody').addClass('wwRed');
        $('#whatWorksIcon').attr("src","img/iconRed.png");
      }
      else if (colorPick=="yellow") {
        colorDataPull = JSON.stringify(yellowData);
        colorData = JSON.parse(colorDataPull);
        $('#whatWorksIcon').attr("src","img/iconYellow.png");
      }
      else if (colorPick=="blue") {
        colorDataPull = JSON.stringify(blueData);
        colorData = JSON.parse(colorDataPull);
        $('#whatWorksIcon').attr("src","img/iconBlue.png");
      }
      else if (colorPick=="green") {
        colorDataPull = JSON.stringify(greenData);
        colorData = JSON.parse(colorDataPull);
        $('#whatWorksIcon').attr("src","img/iconGreen.png");
      }
      var colorArray= colorData;
      return colorArray;
    }
    function placeColorData(array) {
      $('.colorData').empty();
      $('.colorData').append(housingPick + "<br>");
      for (var i=0;i<array.length;i++) {
        if (housingPick==array[i].housingPick) {
          var hf, approach;
          hf = array[i].healthFactor;
          approach = array[i].approach;

          $('.colorData').append(hf + ", " + approach+"<br>");
        }
      }
    }
    function getWhatWorks() {
      var dataArray = getColorData();
      console.log(dataArray[0].approach);
      placeColorData(dataArray);
    }

  var yellowData = [
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural"
  }
];

var redData = [
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural"
  }
];

var greenData = [
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural"
  }
];

var blueData = [
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural"
  }
]; 
});

// $(window).load(function() {
//   $(".loader").fadeOut("slow");
// })

// window.onload = function() {
// // MATCHING DATA from data.js and SENDING DATA to VIEW
//   var dataJson1 = JSON.stringify(housingData);
//   var data = JSON.parse(dataJson1);

//   var dataJson2 = JSON.stringify(zipData);
//   var dataZip = JSON.parse(dataJson2);

//   String.prototype.capitalize = function() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   }

//   function getZip(zip) {
//     console.log(zip);
//     for (var i=0; i<dataZip.length;i++) {
//       if (dataZip[i].zip === zip) {
//         getData(dataZip[i].county)
//       }
//     }
//   }
//   function getData(county) {
//     var data2;
//     var newCounty = Number(county);
//     for (var i=0; i<data.length;i++) {
//       if (data[i].fips == newCounty) {
//         var data1 = data[i].airPollution;
//         if (data[i].waterViolation === "") {
//           data2 = "N/A";
//         } else {
//           data2 = data[i].waterViolation;
//         };
//         var data3 = data[i].housingProblems;
//         var data4 = data[i].driveAlone;
//         var data5 = data[i].driveAloneLongCommute;
//         writeData(data1, data2, data3, data4, data5);
//       }
//     }
//   }
//   function writeData(air, water, housing, drive, driveLong) {
//     $('#dataPoint1 .dataValue').html(air);
//     $('#dataPoint2 .dataValue').html(water);
//     $('#dataPoint3 .dataValue').html(housing + "%");
//     $('#dataPoint4 .dataValue').html(drive + "% / " + driveLong + "%");
//   }
// // END

// //RECEIVING DATA from HOME PAGE FORM
//   function newZip() {
//     var newZipValue = document.getElementById('zipValue').value;
//     getZip(newZipValue);
//   }
//   function newZipRed() {
//     var newZipValue = document.getElementById('zipValueRed').value;
//     getZip(newZipValue);
//   }
//   function newZipGreen() {
//     var newZipValue = document.getElementById('zipValueGreen').value;
//     getZip(newZipValue);
//   }
//   function newZipBlue() {
//     var newZipValue = document.getElementById('zipValueBlue').value;
//     getZip(newZipValue);
//   }

//   $('#yellowModal #zipClick').click(function(e) {
//     e.preventDefault ? event.preventDefault() : (event.returnValue = false);
//     newZip();
//     setTimeout(function() {
//       $('#yellowModal').modal('hide');
//       $('.bikeScene').hide();
//       $('.show #dataPoint1').addClass('selected');
//       $('.dataPoints').show();
//       $('#map').css('opacity', '.3');
//     },500);
//   });
//   $('#redModal #zipClick').click(function(event) {
//     event.preventDefault ? event.preventDefault() : (event.returnValue = false);
//     newZipRed();
//     setTimeout(function() {
//       $('#redModal').modal('hide');
//       $('.bikeScene').hide();
//       $('.show #dataPoint3').addClass('selected');
//       $('.dataPoints').show();
//       $('#map').css('opacity', '.3');
//     },500);
//   });
//   $('#greenModal #zipClick').click(function(event) {
//     event.preventDefault ? event.preventDefault() : (event.returnValue = false);
//     newZipGreen();
//     setTimeout(function() {
//       $('#greenModal').modal('hide');
//       $('.bikeScene').hide();
//       $('.show #dataPoint4').addClass('selected');
//       $('.dataPoints').show();
//       $('#map').css('opacity', '.3');
//     },500);
//   });
//   $('#blueModal #zipClick').click(function(event) {
//     event.preventDefault ? event.preventDefault() : (event.returnValue = false);
//     newZipBlue();
//     setTimeout(function() {
//       $('#blueModal').modal('hide');
//       $('.bikeScene').hide();
//       $('.show #dataPoint2').addClass('selected');
//       $('.dataPoints').show();
//       $('#map').css('opacity', '.3');
//     },500);
//   });

//   $('#next').on('click', getNext);
//   $('#prev').on('click', getPrev);

//   function getNext() {
//     var $curr = $('.show .selected'),
//         $next = ($curr.next().length) ? $curr.next() : $('.show div').first();
//     $curr.removeClass('selected');
//     $next.addClass('selected');
//     // transition($curr, $next);
//   }

//   function getPrev() {
//     var $curr = $('.show .selected'),
//         $next = ($curr.prev().length) ? $curr.prev() : $('.show div').last();
//     $curr.removeClass('selected');
//     $next.addClass('selected');
//     // transition($curr, $next);
//   }

//   function transition($curr, $next) {
//     $next.css('z-index', 2).fadeIn('slow', function () {
//         $curr.hide().css('z-index', 0);
//         $next.css('z-index', 1);
//     });
//   }

//   // links to different parts of map

//   $('#city img').click(function() {
//     housingPick = 'city';
//     $('#map').removeClass().addClass('city');
//     $('#openModal').modal('hide');
//     bikeScene();
//   });
//   $('#suburb img').click(function() {
//     housingPick = 'suburb';
//     $('#map').removeClass().addClass('suburb');
//     $('#openModal').modal('hide');
//     bikeScene();
//   });
//   $('#rural img').click(function() {
//     housingPick = 'rural';
//     $('#map').removeClass().addClass('rural');
//     $('#openModal').modal('hide');
//     bikeScene();
//   });

//   function bikeScene() {
//     $('.bikeScene').show();
//     setTimeout(function() {
//       $('#bike').addClass('ride');
//     }, 300);
//     setTimeout(function() {
//       $('#yellow').css('opacity','1').addClass('bounce');
//     }, 1200);
//     setTimeout(function() {
//       $('#blue').css('opacity','1').addClass('bounce');
//     }, 1600);
//     setTimeout(function() {
//       $('#green').css('opacity','1').addClass('bounce');
//     }, 2000);
//     setTimeout(function() {
//       $('#red').css('opacity','1').addClass('bounce');
//     }, 2400);
//   }
// }


