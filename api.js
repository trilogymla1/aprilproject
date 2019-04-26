var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

    var URL = "https://data.cityofchicago.org/resource/pk66-w54g.json?reservation_start_date=2019-06-29T00:00:00.000";

$.ajax({
    url: URL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });


  var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=60616";

$.ajax({
    url: restaurantURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  })
  