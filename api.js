// Weather Ajax Call
var zipcodeInput = "60612"
var dateInput = "04/27/2019"

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcodeInput + ",us&units=imperial&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response)

  var tempToday = Math.floor(response.list[0].main.temp)
  var tempTomorrow = Math.floor(response.list[8].main.temp)
  var tempAfter = Math.floor(response.list[16].main.temp)
  var tempAfterThat = Math.floor(response.list[24].main.temp)
  var tempEvenAfterThat = Math.floor(response.list[39].main.temp)

  var weatherToday = (response.list[0].weather[0].description)
  var weatherTomorrow = response.list[8].weather[0].description
  var weatherAfter = response.list[16].weather[0].description
  var weatherAfterThat = response.list[24].weather[0].description
  var weatherEvenAfterThat = response.list[39].weather[0].description

  $(".day-1-forecast").html("<h4>" + "Today: " + "<h4>");
  $(".day-1-forecast").append(tempToday + "°F");
  $(".day-1-forecast").append("<br>" + weatherToday);
  $(".day-2-forecast").html("<h4>" + "Tomorrow: " + "<h4>")
  $(".day-2-forecast").append(tempTomorrow + "°F");
  $(".day-2-forecast").append("<br>" + weatherTomorrow);
  $(".day-3-forecast").html(("<h4>" + moment().day(1).format("dddd")) + "<h4>");
  $(".day-3-forecast").append(tempAfter + "°F");
  $(".day-3-forecast").append("<br>" + weatherAfter);
  $(".day-4-forecast").html(("<h4>" + moment().day(2).format("dddd")) + "<h4>")
  $(".day-4-forecast").append(tempAfterThat + "°F");
  $(".day-4-forecast").append("<br>" + weatherAfterThat);
  $(".day-5-forecast").html(("<h4>" + moment().day(3).format("dddd")) + "<h4>");
  $(".day-5-forecast").append(tempEvenAfterThat + "°F");
  $(".day-5-forecast").append("<br>" + weatherEvenAfterThat);
});

// ----------------------------------- park
$("#date-time-btn").on("click", function (event) {
  event.preventDefault();
  var zipcodeInput = $("zip-input").val().trim();
  var dateInput = $("date-input").val().trim();

  var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=" + dateInput + "T00:00:00.000";

  $.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    console.log(URL);
    console.log(response);

    var i;
    for (i = 0; i < response.length; i++) {
      // div names for locations
      $(".eventName").html("<h1>" + response[i].event_description + "</h1>");
      $(".locationName").html("<h1>" + response[i].park_facility_name + "</h1>");
      $(".eventBegin").html("<h1>" + response[i].reservation_start_date + "</h1>");
      $(".eventBegin").html("<h1>" + response[i].reservation_end_date + "</h1>");
      // $(".wind").text("Wind Speed: " + response.wind.speed);

      // Log the data in the console as well
      console.log("Event: " + response[i].event_description);
      console.log("Location: " + response[i].park_facility_name);
      console.log("Begins: " + response[i].reservation_start_date);
      console.log("Ends: " + response[i].reservation_end_date);

    }
  });


  var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=" + zipcodeInput;

  $.ajax({
    url: restaurantURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  })
});

  $.ajax({
      url: restaurantURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      console.log(response.restaurants[0].name);
      var i;
      for (i = 0; i < response.restaurants.length; i++) { 
        $(".restaurantName").html("<h1>" + response.restaurants[i].name + "</h1>");
        $(".restaurantAddress").html("<h1>" + response.restaurants[i].address + "</h1>");
        $(".restaurantPrice").html("<h1>" + response.restaurants[i].price + "</h1>");
        $(".restaurantReserve").html("<h1>" + response.restaurants[i].reserve_url + "</h1>");
        $(".restaurantImage").html("<h1>" + response.restaurants[i].image_url + "</h1>");

        console.log("Name: " + response.restaurants[i].name);
        console.log("Address: " + response.restaurants[i].address);
        console.log("Price on a scale of 1-4: " + response.restaurants[i].price);
        console.log("Reserve on Open Table: " + response.restaurants[i].reserve_url);
        console.log(response.restaurants[i].image_url);

      }
      
    
    });
