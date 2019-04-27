var zipcodeInput = "60616"
var dateInput = ""
// original url without user input
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcodeInput + ",us&units=imperial&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      console.log(response)

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

      $(".day-1-forecast").text("Today: " + tempToday + "°F" + " | " + weatherToday)
      $(".day-2-forecast").text("Tomorrow: " + tempTomorrow + "°F" + " | " + weatherTomorrow)
      $(".day-3-forecast").text("Temperature after: " + tempAfter + "°F" + " | " + weatherAfter)
      $(".day-4-forecast").text("Temperature after that: " + tempAfterThat + "°F" + " | " + weatherAfterThat)
      $(".day-5-forecast").text("Temperature even after that: " + tempEvenAfterThat + "°F" + " | " + weatherEvenAfterThat)
    });

// ----------------------------------- park
    // original url without user input
    // var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=2019-06-29T00:00:00.000";
    var dateInput = "2019-06-29";
    
    var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=" + dateInput + "T00:00:00.000";

    $.ajax({
      url: URL,
      method: "GET"
    }).then(function(response) {
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

  // .then(function(response) {
  
  // });

// -------------------------------------- restaraunt
  // original url without user input
  // var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=60616";

  
  var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=" + zipcodeInput;

$.ajax({
    url: restaurantURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  })