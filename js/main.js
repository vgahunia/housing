
var colorPick, housingPick, indexPick;
var fixed = document.getElementById('chrBody');

fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

}, false);

$(document).ready(function(){
    $('#openModal').modal('show');

  //BROWSER SPECIFIC ISSUES
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome)&&(is_safari)) {is_safari=false;}
    if ((is_chrome)&&(is_opera)) {is_chrome=false;}
    if (is_safari || is_explorer) {
      $('form input[type=submit]').css('display','inline-block');
    }
    if (is_firefox) {
      $('.bikeScene #yellow').css('animation-delay','initial');
      $('.bikeScene #red').css('animation-delay','initial');
      $('.bikeScene #green').css('animation-delay','initial');
      $('.bikeScene #blue').css('animation-delay','initial');
    }
// END BROWSER
// REFRESH WINDOW and BACK BUTTON
    $('#smallBanner').click(function() {
      window.location.reload();
    })

    $('#backButton').click(function() {
      var abc = $('.dataPoints').css('display');
      if (abc == 'block') {
        $('.show div').removeClass('selected');
        $('.dataPoints').hide();
        $('.bikeScene').show();
        $('#map').css('opacity', '1');
        $('.contentMain').show();
        $('.zipField').hide();
      } else window.location.reload();
    })

    $('.back_menuModal').click(function() {
      $('.modal').modal('hide');
    })
// COLORED ICONS TO OPEN SELECTED MODAL
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
      $('#yellowModal .contentMain').hide();
      $('#yellowModal .zipField').show();
    })
    $('#redModal .dataButton').click(function() {
      $('#redModal .contentMain').hide();
      $('#redModal .zipField').show();
    })
    $('#greenModal .dataButton').click(function() {
      $('#greenModal .contentMain').hide();
      $('#greenModal .zipField').show();
    })
    $('#blueModal .dataButton').click(function() {
      $('#blueModal .contentMain').hide();
      $('#blueModal .zipField').show();
    })

// BUTTON For WHAT WORKS FOR HEALTH

    $('.ww_next').click(function() {
      var colorArray = ["yellow","green","red","blue"];
      for (var i=0; i<colorArray.length;i++) {
        if (colorArray[i]===colorPick && i<3) {
          colorPick=colorArray[i+1];
          break;
        } else if (i==3) {
          colorPick="yellow";
        }
      }
      getWhatWorks();
    });

    $('.ww_prev').click(function() {
      var colorArray = ["yellow","green","red","blue"];
      for (var i=3; i<colorArray.length;i--) {
        if (colorArray[i]===colorPick && i>0) {
          colorPick=colorArray[i-1];
          break;
        } else if (i==0) {
          colorPick="blue";
          break;
        }
      }
      getWhatWorks();
    });

    $('#ww_city').click(function() {
      housingPick="city";
      getWhatWorks();
    })
    $('#ww_suburb').click(function() {
      housingPick="suburb";
      getWhatWorks();
    })
    $('#ww_rural').click(function() {
      housingPick="rural";
      getWhatWorks();
    })

    $('.whatWorks').click(function() {
      $('.modal').modal('hide');
      getWhatWorks();
      $('#whatWorksModal').modal('show');
    });

    $('.back2').click(function() {
      $('#whatWorksModal').modal('hide');
      switch (colorPick) {
        case 'red':
          $('#redModal').modal('show');
          break;
        case 'blue':
          $('#blueModal').modal('show');
          break;
        case 'green':
          $('#greenModal').modal('show');
          break;
        case 'yellow':
          $('#yellowModal').modal('show');
          break;
      }
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
        setUp(allData);
        $('#whatWorksBody').addClass('wwRed');  
        $('#whatWorksIcon').attr("src","img/iconRed.png");
      }
      else if (colorPick=="yellow") {
        setUp(allData);
        $('#whatWorksBody').addClass('wwYellow'); 
        $('#whatWorksIcon').attr("src","img/iconYellow.png");
      }
      else if (colorPick=="blue") {
        setUp(allData);
        $('#whatWorksBody').addClass('wwBlue'); 
        $('#whatWorksIcon').attr("src","img/iconBlue.png");
      }
      else if (colorPick=="green") {
        setUp(allData);
        $('#whatWorksBody').addClass('wwGreen'); 
        $('#whatWorksIcon').attr("src","img/iconGreen.png");
      }
      return colorData;
    }
    function placeColorData(array) {
      $('.colorData').empty();
      // $('.colorData').append(housingPick + "<br>");
      for (var i=0;i<array.length;i++) {
        if ((housingPick==array[i].housingPick || housingPick==array[i].housingPick2) && (colorPick==array[i].colorPick || colorPick==array[i].colorPick2)) {
          var hf = array[i].healthFactor;
          var approach = array[i].approach;
          var title=array[i].title;
          var description=array[i].description;
          var rating=array[i].rating;
          var url=array[i].url;
          var titleLink= '<a href="' + url + '">' + title + '</a>';
          var img2, img;
          if (array[i].image) {
            var imgSource = array[i].image;
            img = '<img src="' + imgSource + '">';
          } else img="";
          if (array[i].image2) {
            var img2Source = array[i].image2;
            img2 = '<img src="' + img2Source + '">';
          } else img2="";
          $('.colorData').append(
            "<h3>" + titleLink + 
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

//--------------------------------------
//----- DATA ARRAY OF OBJECTS ----------
//--------------------------------------
  var allData = [
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Increase water conservation & preservation",
    "title": "Proper drug disposal programs",
    "description": "Establish programs that accept expired, unwanted, or unused medicines from designated users and dispose of them responsibly",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/proper-drug-disposal-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "",
    "image": "img/alcoholDrugUse.png",
    "image2": "img/communitySafety.png"
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Increase water conservation & preservation",
    "title": "Rain barrels",
    "description": "Use ready-made or home constructed barrel systems to collect and store rainwater from rooftops that would otherwise flow to storm drains and streams",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/rain-barrels",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce emissions from mobile sources",
    "title": "Clean diesel technology fleet transition programs",
    "description": "Replace or retrofit diesel buses to operate with clean diesel technology",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/clean-diesel-technology-fleet-transition-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "yellow",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce emissions from mobile sources",
    "title": "Scrap programs for old vehicles",
    "description": "Provide incentives to trade in old cars or light duty trucks with low fuel efficiency and high emissions and buy new vehicles with higher efficiency and lower emissions; also called scrappage or early retirement programs",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/scrap-programs-old-vehicles",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "yellow",
    "colorPick2": "green",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce agriculture's environmental impacts",
    "title": "Integrated pest management (IPM) for agriculture & outdoor use",
    "description": "Support a four-tiered approach to outdoor pest control that minimizes potential hazards to people, property, and the environment",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/integrated-pest-management-ipm-agriculture-outdoor-use",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "yellow",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce agriculture's environmental impacts",
    "title": "Multi-component groundwater management programs",
    "description": "Address soil and water quality concerns via regular groundwater monitoring, education about risks to groundwater, water quotas and taxes, and other efforts",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/multi-component-groundwater-management-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Healthy home environment assessments",
    "description": "Train volunteers, professionals, or paraprofessionals to help residents assess and remediate environmental home health risks and recommend low cost changes (e.g., improved ventilation, integrated pest management, etc.)",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/healthy-home-environment-assessments",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Household interim lead control measures",
    "description": "Inform parents about lead exposure pathways and cleaning and hygiene techniques and undertake minor repairs, specialized cleaning, or efforts to paint over lead paint",
    "rating": "Evidence of Ineffectiveness",
    "url": "http://www.countyhealthrankings.org/policies/household-interim-lead-control-measures",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Housing rehabilitation loan & grant programs",
    "description": "Provide funding, primarily to low or median income families, to repair, improve, or modernize dwellings and remove health or safety hazards",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/housing-rehabilitation-loan-grant-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Integrated pest management for indoor use",
    "description": "Support a four-tiered approach to indoor pest control that minimizes potential hazards to people, property, and the environment",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/integrated-pest-management-indoor-use",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Lead abatement programs",
    "description": "Eliminate lead-based paint and contaminated dust via encapsulating or permanently containing lead paint, replacing lead pipes, lead painted fixtures and surfaces, and decontaminating soil that contains lead",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/lead-abatement-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Radon mitigation programs",
    "description": "Prevent radon from entering occupied buildings and reduce existing indoor air radon levels via soil depressurization, home or room pressurization, heat recovery ventilation, etc.",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/radon-mitigation-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Improve housing quality",
    "title": "Weatherization Assistance Program (WAP)",
    "description": "Provide assistance to low income families to make their homes more energy efficient and to permanently reduce their energy bills",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/weatherization-assistance-program-wap",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Mixed-use development",
    "description": "Support a combination of land uses (e.g., residential, commercial, recreational) in development initiatives, often through zoning regulations",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/mixed-use-development",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "red",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Safe Routes to Schools",
    "description": "Promote walking and biking to school through education, incentives, and environmental changes; often called SRTS",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/safe-routes-schools",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Speed enforcement detection devices",
    "description": "Use devices such as speed cameras, radar, etc. to enforce speed limits; devices can be permanent fixtures or be used manually by law enforcement officers",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/speed-enforcement-detection-devices",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Walking school buses",
    "description": "Arrange active transportation with a fixed route, designated stops, and pick up times when children can walk to school with adult chaperones",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/walking-school-buses",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Community Development Block Grants (CDBGs)",
    "description": "Provide funding for local community development activities such as affordable housing, anti-poverty programs, and infrastructure development",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/community-development-block-grants-cdbgs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Community land trusts",
    "description": "Purchase land to lease to low and middle income home owners and require them to sell the home back to the CLT or to another low income resident at an affordable price",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/community-land-trusts",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "HOME Investment Partnership Program",
    "description": "Provide grants to states and localities to fund activities that build, buy, or rehabilitate affordable housing for rent or homeownership or provide direct rental assistance to low income households",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/home-investment-partnership-program",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Housing trust funds",
    "description": "Support funds that help create or maintain low income housing, subsidize rental housing, and assist low income homebuyers and non-profit housing developers",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/housing-trust-funds",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Land banking",
    "description": "Acquire, hold, manage, and develop properties such as vacant lots, abandoned buildings, or foreclosures, and transition them to productive uses, often affordable housing developments",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/land-banking",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Low Income Home Energy Assistance Program (LIHEAP)",
    "description": "Provide funds to help low income households meet home energy needs, especially households with members who are young, disabled, or elderly",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/low-income-home-energy-assistance-program-liheap",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Low Income Housing Tax Credits (LIHTCs)",
    "description": "Provide funding via tax credits at the state and local level to support development and rehabilitation costs of low income rental housing",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/low-income-housing-tax-credits-lihtcs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Ensure access to housing",
    "title": "Housing mediation services",
    "description": "Facilitate mediation between tenants and landlords to resolve conflict and prevent eviction",
    "rating": "Insufficient Evidence",
    "url": "http://www.countyhealthrankings.org/policies/housing-mediation-services",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Ensure access to housing",
    "title": "Rapid re-housing programs",
    "description": "Transition families and individuals experiencing homelessness into permanent housing quickly, often with supports such as short-term financial assistance, case management, landlord negotiations, etc.",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/rapid-re-housing-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Increase water conservation & preservation",
    "title": "Permeable pavement projects",
    "description": "Use pervious concrete, porous asphalt, permeable interlocking pavers, open-jointed blocks or cells, or other permeable pavement in individual or commercial development efforts",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/permeable-pavement-projects",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Increase water conservation & preservation",
    "title": "Rain gardens & other bioretention systems",
    "description": "Establish green infrastructure (e.g., rain gardens, bioretention cells, green roofs, planter boxes, bioswales, etc.) to allow rain water to soak into the ground",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/rain-gardens-other-bioretention-systems",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "blue",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce emissions from mobile sources",
    "title": "Alternative fuels initiatives",
    "description": "Support alternative fuel and vehicle use via financial incentives (e.g., tax benefits, rebates, etc.), mandates (e.g., consumption targets or renewable fuel standards), research and development investments, etc.",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/alternative-fuels-initiatives",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "yellow",
    "colorPick2": "green",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce emissions from mobile sources",
    "title": "Carpool & rideshare programs",
    "description": "Help commuters share transportation through informal arrangements between individuals, formally arranged dynamic ridesharing programs, or other ride-matching services",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/carpool-rideshare-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Air & Water Quality",
    "approach": "Reduce emissions from mobile sources",
    "title": "Vehicle inspection & maintenance (I/M) programs",
    "description": "Require scheduled testing of vehicles’ tailpipe and evaporative emissions; federally mandated in areas with particularly poor air quality",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/vehicle-inspection-maintenance-im-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "yellow",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Bike & pedestrian master plans",
    "description": "Establish a framework to increase walking and biking trails and improve connectivity of non-auto paths and trails in a particular area",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/bike-pedestrian-master-plans",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Multi-component workplace supports for active commuting",
    "description": "Provide physical infrastructure (e.g., bike parking or showers), educational or social support (e.g., walking groups), and financial incentives that support active commuting",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/multi-component-workplace-supports-active-commuting",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Out of town bypasses",
    "description": "Establish roads that avoid built-up areas such as towns, cities, or commercial/business districts",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/out-town-bypasses",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Streetscape design",
    "description": "Enhance streetscapes with greater sidewalk coverage and walkway connectivity, street crossing safety features, traffic calming measures, and other design elements; often via Complete Streets",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/streetscape-design",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "red",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Traffic calming",
    "description": "Modify the built environment to affect traffic speed and patterns via speed bumps, pedestrian refuge islands, etc.",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/traffic-calming",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support active travel",
    "title": "Zoning regulations for land use policy",
    "description": "Use zoning regulations to address aesthetics and safety of the physical environment, street continuity and connectivity, residential density and proximity to businesses, schools, and recreation",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/zoning-regulations-land-use-policy",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Affordable housing tax increment financing (TIF)",
    "description": "Create designated tax districts that generate revenue to invest in affordable housing initiatives, blight remediation, and, economic development efforts",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/affordable-housing-tax-increment-financing-tif",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support affordable housing options",
    "title": "Inclusionary zoning",
    "description": "Require developers to reserve a proportion of housing units for low income residents via mandatory requirements or incentives such as density bonuses",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/inclusionary-zoning",
    "housingPick": "city",
    "housingPick2": "",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Ensure access to housing",
    "title": "Housing Choice Voucher Program (Section 8)",
    "description": "Provide eligible low and very low income families with vouchers to help cover the costs of rental housing; also called Section 8",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/housing-choice-voucher-program-section-8",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Ensure access to housing",
    "title": "Housing First",
    "description": "Provide rapid access to permanent housing and support (e.g., crisis intervention, needs assessment, case management), usually for chronically homeless individuals with persistent mental illness or substance abuse issues",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/housing-first",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Ensure access to housing",
    "title": "Service-enriched housing",
    "description": "Provide permanent, basic rental housing with social services available onsite or by referral, usually for low income families, seniors, and people with disabilities",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/service-enriched-housing",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "red",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support shared transportation",
    "title": "Carpool & rideshare programs",
    "description": "Help commuters share transportation through informal arrangements between individuals, formally arranged dynamic ridesharing programs, or other ride-matching services",
    "rating": "Expert Opinion",
    "url": "http://www.countyhealthrankings.org/policies/carpool-rideshare-programs",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support shared transportation",
    "title": "Individual incentives for public transportation",
    "description": "Offer incentives such as free or discounted bus, rail, or transit passes, reimbursements, partial payments, or pre-tax payroll deductions to encourage individuals' use of existing public transit",
    "rating": "Some Evidence",
    "url": "http://www.countyhealthrankings.org/policies/individual-incentives-public-transportation",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "green",
    "colorPick2": "",
    "image": "",
    "image2": ""
  },
  {
    "healthFactor": "Housing & Transit",
    "approach": "Support shared transportation",
    "title": "Public transportation systems",
    "description": "Introduce or expand transportation options that are available to the public and run on a scheduled timetable (e.g., buses, trains, ferries, rapid transit, etc.)",
    "rating": "Scientifically Supported",
    "url": "http://www.countyhealthrankings.org/policies/public-transportation-systems",
    "housingPick": "city",
    "housingPick2": "suburb",
    "colorPick": "",
    "colorPick2": "",
    "image": "",
    "image2": ""
  }
]; 
});




