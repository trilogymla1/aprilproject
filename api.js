var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=ef9d93c0bbd0f2345d418982ddbebbb7";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });