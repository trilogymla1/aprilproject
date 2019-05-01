// Weather Ajax Call
// var zipcodeInput = "60616"
// ----remove static value and uncomment below
$(".start-button").on ("click", function (event)
 { 
   event.preventDefault();
  $(".banner-container").hide();
  $(".container").show();
});


$("#date-zip-btn").on("click", function (event) {
  event.preventDefault();
  console.log(zipcodeInput);
  console.log(dateInput);

  var zipcodeInput = $("#zip-input").val().trim();
  var dateInput = $("#date-input").val().trim();
  // var dateInput = "2019-06-29"
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcodeInput + ",us&units=imperial&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    console.log((moment().day(1).format("dddd")));

    var tempToday = Math.floor(response.list[0].main.temp)
    var tempTomorrow = Math.floor(response.list[8].main.temp)
    var tempAfter = Math.floor(response.list[16].main.temp)
    var tempAfterThat = Math.floor(response.list[24].main.temp)
    var tempEvenAfterThat = Math.floor(response.list[39].main.temp)

    var weatherToday = response.list[0].weather[0].description
    var weatherTomorrow = response.list[8].weather[0].description
    var weatherAfter = response.list[16].weather[0].description
    var weatherAfterThat = response.list[24].weather[0].description
    var weatherEvenAfterThat = response.list[39].weather[0].description

    $(".day-1-forecast").html("Today: " + tempToday + "°F" + " | " + weatherToday)
    $(".day-2-forecast").text("Tomorrow: " + tempTomorrow + "°F" + " | " + weatherTomorrow)
    $(".day-3-forecast").text((moment().add(2, 'days').format("dddd")) + ": " + tempAfter + "°F" + " | " + weatherAfter)
    $(".day-4-forecast").text((moment().add(3, 'days').format("dddd")) + ": " + tempAfterThat + "°F" + " | " + weatherAfterThat)
    $(".day-5-forecast").text((moment().add(4, 'days').format("dddd")) + ": " + tempEvenAfterThat + "°F" + " | " + weatherEvenAfterThat)
  });

  // ----------------------------------- park



  var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=" + dateInput + "T00:00:00.000";
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    console.log(URL);
    console.log(response);
    var i;
    if (response.length > 10) {
      console.log("many");
      // copy out new work before pull
      for (i = 10 - 1; i >= 0; i--) {
        var eventDiv = $("<div>");
        eventDiv.addClass("event");
        var eventName = $("<p>").text("Event: " + response[i].event_description);
        var parkName = $("<p>").text("Location: " + response[i].park_facility_name);
        var startDate = $("<p>").text("Start: " + response[i].reservation_start_date);
        var endDate = $("<p>").text("End: " + response[i].reservation_end_date);
        var eventFavorite = $('<button>Save to Favorites</button>').click(function () {
          event.preventDefault();
          alert('I love it.');
      });

        eventDiv.append(eventName);
        eventDiv.append(parkName);
        eventDiv.append(startDate);
        eventDiv.append(endDate);
        eventDiv.append(eventFavorite);
        $("#event-output").prepend(eventDiv);
      }
    } else {
      for (i = response.length - 1; i >= 0; i--) {
        var eventDiv = $("<div>");
        eventDiv.addClass("event");
        var eventName = $("<p>").text("Event: " + response[i].event_description);
        var parkName = $("<p>").text("Location: " + response[i].park_facility_name);
        var startDate = $("<p>").text("Start: " + response[i].reservation_start_date);
        var endDate = $("<p>").text("End: " + response[i].reservation_end_date);
        var eventFavorite = $('<button>Save to Favorites</button>').click(function () {
          event.preventDefault();
          alert('I love it.');
      });


        eventDiv.append(eventName);
        eventDiv.append(parkName);
        eventDiv.append(startDate);
        eventDiv.append(endDate);
        eventDiv.append(eventFavorite);
        $("#event-output").prepend(eventDiv);
      }
    }
  });


  var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=" + zipcodeInput;

  $.ajax({
    url: restaurantURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.restaurants[0].name);
    var i;
    for (i = 0; i < response.restaurants.length; i++) {
      var restaurantDiv = $("<div>");
      restaurantDiv.addClass("restaurant");
      var restaurantName = $("<p>").text(response.restaurants[i].name);
      var restaurantAddress = $("<p>").text(response.restaurants[i].address);
      var restaurantPrice = $("<p>").text(response.restaurants[i].price);
      var restaurantReserve = $("<p>").text(response.restaurants[i].reserve_url);
      var restImgHldr = $("<p>")
        var restaurantImage = $("<img>");
        restaurantImage.attr("src", response.restaurants[i].image_url);
        var restaurantFavorite = $('<button>Save to Favorites</button>')
        .addClass("favorite")
        .attr("data-index", i)
        .click(function () {
          event.preventDefault();
          console.log($(this).data("index"))
          var index = $(this).data("index");
          var selectedResturant = response.restaurants[index];
          console.log('*******',selectedResturant);
          
      });


      restaurantDiv.append(restaurantName);
      restaurantDiv.append(restaurantAddress);
      restaurantDiv.append(restaurantPrice);
      restaurantDiv.append(restaurantReserve);
      restImgHldr.append(restaurantImage);
        restaurantDiv.append(restImgHldr);
        restaurantDiv.append(restaurantFavorite);
        $("#restaurant-output").prepend(restaurantDiv);

      // $(".restaurantName").html("<h1>" + response.restaurants[i].name + "</h1>");
      // $(".restaurantAddress").html("<h1>" + response.restaurants[i].address + "</h1>");
      // $(".restaurantPrice").html("<h1>" + response.restaurants[i].price + "</h1>");
      // $(".restaurantReserve").html("<h1>" + response.restaurants[i].reserve_url + "</h1>");
      // $(".restaurantImage").html("<h1>" + response.restaurants[i].image_url + "</h1>");

      // console.log("Name: " + response.restaurants[i].name);
      // console.log("Address: " + response.restaurants[i].address);
      // console.log("Price on a scale of 1-4: " + response.restaurants[i].price);
      // console.log("Reserve on Open Table: " + response.restaurants[i].reserve_url);
      // console.log(response.restaurants[i].image_url);

    }


  });
});
