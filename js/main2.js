
$(window).load(function() {
  $(".loader").fadeOut("slow");
})
var tester=false;
window.onload = function() {
// MATCHING DATA from data.js and SENDING DATA to VIEW
  var dataJson1 = JSON.stringify(housingData);
  var data = JSON.parse(dataJson1);

  var dataJson2 = JSON.stringify(zipData);
  var dataZip = JSON.parse(dataJson2);

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function getZip(zip) {
    for (var i=0; i<dataZip.length;i++) {
      if (dataZip[i].zip === zip) {
        getData(dataZip[i].county)
        tester=true;
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
        var county = data[i].county;
        var state = data[i].state;
        writeData(data1, data2, data3, data4, data5, county, state);
        console.log(county + " County" + ", " + state);
      }
    }
  }
  function writeData(air, water, housing, drive, driveLong, county, state) {
    state1=state.toLowerCase();
    county1=county.replace(/\s+/g, '-').toLowerCase();
    $('#dataPoint1 .dataValue').html(air);
    $('#dataPoint2 .dataValue').html(water);
    $('#dataPoint3 .dataValue').html(housing + "%");
    $('#dataPoint4 .dataValue').html(drive + "%");
    $('#dataPoint5 .dataValue').html(driveLong + "%");
    if (county1=="district-of-columbia"){
      $('.dataPoints a').attr("href", "http://www.countyhealthrankings.org/app/district-of-columbia/2016/overview");
    } else
    $('.dataPoints a').attr("href", " http://www.countyhealthrankings.org/app/"+state1+"/2016/rankings/"+county1+"/county/outcomes/overall/snapshot");
  }
// END

//RECEIVING DATA from HOME PAGE FORM
  function newZip() {
    var newZipValue = document.getElementById('zipValue').value;
    getZip(newZipValue);
    return newZipValue;
  }
  function newZipRed() {
    var newZipValue = document.getElementById('zipValueRed').value;
    getZip(newZipValue);
    return newZipValue;
  }
  function newZipGreen() {
    var newZipValue = document.getElementById('zipValueGreen').value;
    getZip(newZipValue);
    return newZipValue;
  }
  function newZipBlue() {
    var newZipValue = document.getElementById('zipValueBlue').value;
    getZip(newZipValue);
    return newZipValue;
  }

  $('#yellowModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var x = newZip();
    console.log(x +"first")
    if (x == '' || tester==false) {
      $('.warning').html('Please enter a valid zip code');
    } else {
      setTimeout(function() {
        $('#yellowModal').modal('hide');
        $('.bikeScene').hide();
        $('.show #dataPoint1').addClass('selected');
        $('.dataPoints').show();
        $('#map').css('opacity', '.2');
        $('.warning').html('');
        tester=false;
      },500);
    }
  });
  $('#redModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var x1 = newZipRed();
    console.log(x1 +"first")
    if (x1 == '' || tester==false) {
      $('.warning').html('Please enter a valid zip code');
    } else {
      setTimeout(function() {
        $('#redModal').modal('hide');
        $('.bikeScene').hide();
        $('.show #dataPoint3').addClass('selected');
        $('.dataPoints').show();
        $('#map').css('opacity', '.2');
        $('.warning').html('');
        tester=false;
      },500);
    }
  });
  $('#greenModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var x2 = newZipGreen();
    console.log(x2 +"first")
    if (x2 == '' || tester==false) {
      $('.warning').html('Please enter a valid zip code');
    } else {
      setTimeout(function() {
        $('#greenModal').modal('hide');
        $('.bikeScene').hide();
        $('.show #dataPoint4').addClass('selected');
        $('.dataPoints').show();
        $('#map').css('opacity', '.2');
        $('.warning').html('');
        tester=false;
      },500);
    }
  });
  $('#blueModal #zipClick').click(function(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var x3 = newZipBlue();
    console.log(x3 +"first")
    if (x3 == '' || tester==false) {
      $('.warning').html('Please enter a valid zip code');
    } else {
      setTimeout(function() {
        $('#blueModal').modal('hide');
        $('.bikeScene').hide();
        $('.show #dataPoint2').addClass('selected');
        $('.dataPoints').show();
        $('#map').css('opacity', '.2');
        $('.warning').html('');
        tester=false;
      },500);
    }
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
        $next = ($curr.prev().length) ? $curr.prev() : $('.show .yellowValue');
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

  $('#city').click(function() {
    housingPick = 'city';
    $('#map').removeClass().addClass('city');
    $('#openModal').modal('hide');
    bikeScene();
  });
  $('#suburb').click(function() {
    housingPick = 'suburb';
    $('#map').removeClass().addClass('suburb');
    $('#openModal').modal('hide');
    bikeScene();
  });
  $('#rural').click(function() {
    housingPick = 'rural';
    $('#map').removeClass().addClass('rural');
    $('#openModal').modal('hide');
    bikeScene();
  });

  function bikeScene() {
    $('.bikeScene').show();
    $('.nav').show();
    setTimeout(function() {
      $('#bike').addClass('ride');
    }, 300);
    setTimeout(function() {
      $('#yellow').css('opacity','1').addClass('bounce');
    }, 1200);
    setTimeout(function() {
      $('#blue').css('opacity','1').addClass('bounce');
    }, 2400);
    setTimeout(function() {
      $('#green').css('opacity','1').addClass('bounce');
    }, 2000);
    setTimeout(function() {
      $('#red').css('opacity','1').addClass('bounce');
    }, 1600);
    setTimeout(function(){
        $('.bikeScene #yellow').css('animation-delay','initial');
        $('.bikeScene #red').css('animation-delay','initial');
        $('.bikeScene #green').css('animation-delay','initial');
        $('.bikeScene #blue').css('animation-delay','initial');
        $('.scene').removeClass('bounce').addClass('hvr-wobble-vertical');
    }, 5500)
  }
}
document.addEventListener('touchmove', function (e) {
  console.log('helloooo');
  if(!$(e.target).closest('#wrapper .colorData').length){
    e.preventDefault();
    console.log('scroll area seen');
  } else {
    console.log('scroll area kinda seen');
  }
}, false);
