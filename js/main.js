
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
      function setUp(data) {
        colorDataPull = JSON.stringify(data);
        colorData = JSON.parse(colorDataPull);
        var lastClass = $('#whatWorksBody').attr('class').split(' ').pop();
        $('#whatWorksBody').removeClass(lastClass);
      }
      if (colorPick=="red") {
        setUp(redData);
        $('#whatWorksBody').addClass('wwRed');  
        $('#whatWorksIcon').attr("src","img/iconRed.png");
      }
      else if (colorPick=="yellow") {
        setUp(yellowData);
        $('#whatWorksBody').addClass('wwYellow'); 
        $('#whatWorksIcon').attr("src","img/iconYellow.png");
      }
      else if (colorPick=="blue") {
        setUp(blueData);
        $('#whatWorksBody').addClass('wwBlue'); 
        $('#whatWorksIcon').attr("src","img/iconBlue.png");
      }
      else if (colorPick=="green") {
        setUp(greenData);
        $('#whatWorksBody').addClass('wwGreen'); 
        $('#whatWorksIcon').attr("src","img/iconGreen.png");
      }
      return colorData;
    }
    function placeColorData(array) {
      $('.colorData').empty();
      $('.colorData').append(housingPick + "<br>");
      for (var i=0;i<array.length;i++) {
        if (housingPick==array[i].housingPick) {
          var hf = array[i].healthFactor;
          var approach = array[i].approach;
          var title=array[i].title;
          var description=array[i].description;
          var rating=array[i].rating;
          var url=array[i].url;
          var imgSource=array[i].image;
          var img = '<img src="' + imgSource + '">';
          var img2;
          if (array[i].image2) {
            var img2Source = array[i].image2;
            img2 = '<img src="' + img2Source + '">';
          } else img2="";
          $('.colorData').append(
            "<h3>" + title + 
            "<span> (" + rating +")</span></h3>" +
            "<h5>" + description + "</h5>" +
            "<p>" + hf + "</p>" + img + img2 +
            "<hr>"
            );
        }
      }
    }
    function getWhatWorks() {
      var dataArray = getColorData();
      placeColorData(dataArray);
    }

  var yellowData = [
  {
    "healthFactor":"Air & Water Quality • Employment",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
  },
  {
    "healthFactor":"Air & Water Quality • Employment",
    "approach":"Increase water conservation & preservation",
    "title":"Proper drug disposal programs",
    "description":"Establish programs that accept expired, unwanted, or unused medicines from designated users and dispose of them responsibly",
    "rating":"Expert Opinion",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
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
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
    {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
    {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
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
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
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
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"city",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"suburb",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  },
  {
    "healthFactor":"Air & Water Quality",
    "approach":"Increase water conservation & preservation",
    "title":"Permeable pavement projects",
    "description":"Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating":"Scientifically Supported",
    "url":"none",
    "housingPick":"rural",
    "image":"img/employment.png",
    "image2":"img/communitySafety.png"
  }
]; 
});




