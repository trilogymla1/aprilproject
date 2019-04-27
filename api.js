var zipcodeInput = "60616"
// original url without user input
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcodeInput + ",us&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
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