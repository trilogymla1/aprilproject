var zipcodeInput = "60616";
var dayOfTheWeek = moment().format("dddd");
console.log(dayOfTheWeek);
console.log(moment().day(1).format("dddd"));
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
      $(".day-3-forecast").text((moment().day(1).format("dddd"))+ ": " + tempAfter + "°F" + " | " + weatherAfter)
      $(".day-4-forecast").text((moment().day(2).format("dddd"))+ ": " + tempAfterThat + "°F" + " | " + weatherAfterThat)
      $(".day-5-forecast").text((moment().day(3).format("dddd"))+ ": " + tempEvenAfterThat + "°F" + " | " + weatherEvenAfterThat)
    });

// ----------------------------------- park
    // original url without user input
    // var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=2019-06-29T00:00:00.000";
    var dateInput = "2019-06-29";
    
    var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=" + dateInput + "T00:00:00.000";

$.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
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