$(document).ready(function () {
  $(".not-future-date").hide()
  $(".not-valid-date").hide();
  $(".not-valid-zip").hide();
  $(".not-valid-format").hide();

  // Weather Ajax Call
  // var zipcodeInput = "60616"
  // ----remove static value and uncomment below
  $(".start-button").on("click", function (event) {
    event.preventDefault();
    $(".banner-container").hide();
    $(".container").show();
  });

  // error handling
  function isValidDate(dateInput) {
    var target = moment(dateInput, "YYYY-MM-DD");
    if (!moment(dateInput, "YYYY-MM-DD", true).isValid()) {
      $(".not-future-date").show();
      return false;
    } else if (target.diff(moment(), 'days') < 0) {
      $(".not-future-date").show();
      return false;
    } else if (target.diff(moment(), 'years') > 25) {
      $(".not-valid-date").show()
      return false;
    } else {
      $(".not-valid-date").hide()
      $(".not-future-date").hide();
      $(".not-valid-format").hide();
      return true
    }
  };

  function isValidZipCode(zipcodeInput) {
    if (zipcodeInput > 60700 || zipcodeInput.length != 5) {
      $(".not-valid-zip").show();
      return false
    } else {
      $(".not-valid-zip").hide();
      return true
    }
  }

  $("#date-zip-btn").on("click", function (event) {
    event.preventDefault();

    var zipcodeInput = $("#zip-input").val().trim();
    var dateInput = $("#date-input").val().trim();
    console.log(zipcodeInput);
    console.log(dateInput);

    if (isValidDate(dateInput) && isValidZipCode(zipcodeInput)) {
      $("#event-output").empty();
      $("#restaurant-output").empty();
      ajaxCalls(dateInput, zipcodeInput);
    }
  });

  function ajaxCalls(dateInput, zipcodeInput) {
    weatherAjax(zipcodeInput);
    eventAjax(dateInput);
    restaurantAjax(zipcodeInput);
  }
  // error handling

  function weatherAjax(zipcodeInput) {
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

      $(".day-1-forecast").html("<b>" + "Today: " + "</b>" + tempToday + "°F" + " | " + weatherToday)
      $(".day-2-forecast").html("<b>" + "Tomorrow: " + "</b>" + tempTomorrow + "°F" + " | " + weatherTomorrow)
      $(".day-3-forecast").html("<b>" + (moment().add(2, 'days').format("dddd")) + "</b>" + ": " + tempAfter + "°F" + " | " + weatherAfter)
      $(".day-4-forecast").html("<b>" + (moment().add(3, 'days').format("dddd")) + "</b>" + ": " + tempAfterThat + "°F" + " | " + weatherAfterThat)
      $(".day-5-forecast").html("<b>" + (moment().add(4, 'days').format("dddd")) + "</b>" + ": " + tempEvenAfterThat + "°F" + " | " + weatherEvenAfterThat)
    });
  }
  // ----------------------------------- park


  function eventAjax(dateInput) {
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
          var eventName = $("<p>").html("<b>"+ "Event: " + response[i].event_description + "</b>");
          var parkName = $("<p>").text("Location: " + response[i].park_facility_name);
          var startDate = $("<p>").text("Start: " + response[i].reservation_start_date.substring(0, 10));
          var endDate = $("<p>").text("End: " + response[i].reservation_end_date.substring(0, 10));

          // --------------------button
          var eventFavorite = $('<button>Save to Favorites</button>')
            .addClass("favorite-event")
            .attr("data-index", i)
            .click(function () {
              event.preventDefault();
              console.log($(this).data("index"))
              var index = $(this).data("index");
              var selectedEvent = response[index];
              console.log('*******', selectedEvent);
              // console.log(JSON.stringify(selectedRestaurant));
              // var stringRest = JSON.stringify(selectedRestaurant);
              // objRest = JSON.parse(stringRest);
              // console.log(objRest);
              console.log(selectedEvent.event_description);

              // -------send event fave to faves div
              function favDiv() {
              var newRow = $("<tr>").append(
                $("<td>").text(selectedEvent.event_description),
                $("<td>").text(selectedEvent.park_facility_name),
                $("<td>").text(selectedEvent.reservation_start_date.substring(0, 10)),
                $("<td>").text(selectedEvent.reservation_end_date.substring(0, 10)),

              );
              $("#fave-event-table > tbody").append(newRow);
            }
            favDiv();

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
          var eventName = $("<p>").html("<b>" + "Event: " + response[i].event_description + "</b>");
          var parkName = $("<p>").text("Location: " + response[i].park_facility_name);
          var startDate = $("<p>").text("Start: " + response[i].reservation_start_date);
          var endDate = $("<p>").text("End: " + response[i].reservation_end_date);
          var eventFavorite = $('<button>Save to Favorites</button>')
            .addClass("favorite-event")
            .attr("data-index", i)
            .click(function () {
              event.preventDefault();
              console.log($(this).data("index"))
              var index = $(this).data("index");
              var selectedEvent = response[index];
              console.log('*******', selectedEvent);
              // console.log(JSON.stringify(selectedRestaurant));
              // var stringRest = JSON.stringify(selectedRestaurant);
              // objRest = JSON.parse(stringRest);
              // console.log(objRest);
              console.log(selectedEvent.event_description);

              // -------send event fave to faves div
              favDiv();
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
  }

  function restaurantAjax(zipcodeInput) {
    var restaurantURL = "https://opentable.herokuapp.com/api/restaurants?zip=" + zipcodeInput;

    $.ajax({
      url: restaurantURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // console.log(response.restaurants[0].name);
      var i;
      for (i = 0; i < response.restaurants.length; i++) {
        var restaurantDiv = $("<div>");
        restaurantDiv.addClass("restaurant");
        var restaurantName = $("<p>").text(response.restaurants[i].name);
        var restaurantReserve = $("<a>").attr("href", response.restaurants[i].reserve_url).attr("target", "_blank").text(response.restaurants[i].name);
        var restaurantAddress = $("<p>").text(response.restaurants[i].address);
        var restaurantPrice = $("<p>").text("Price (out of 4): " + response.restaurants[i].price);

        var restImgHldr = $("<p>")
        var restaurantImage = $("<img>");
        restaurantImage.attr("src", response.restaurants[i].image_url);
        // ---------
        // var restaurantCity = $("<p>").text(response.restaurants[i].city); 
        // var restaurantZip = $("<p>").text(response.restaurants[i].postal_code);
        // var restaurantPhone = $("<p>").text(response.restaurants[i].phone);
        // -----------------------------------------------------------restaraunt fave button EVENT
        var restaurantFavorite = $('<button>Save to Favorites</button>')
          .addClass("favorite-rest")
          .attr("data-index", i)
          .click(function () {
            event.preventDefault();
            console.log($(this).data("index"))
            var index = $(this).data("index");
            var selectedRestaurant = response.restaurants[index];
            console.log('*******', selectedRestaurant);
            // console.log(JSON.stringify(selectedRestaurant));
            // var stringRest = JSON.stringify(selectedRestaurant);
            // objRest = JSON.parse(stringRest);
            // console.log(objRest);
            console.log(selectedRestaurant.name);

            // -------send restaraunt fave to faves div
            var restURL = $("<a>").attr("href", selectedRestaurant.reserve_url).attr("target", "_blank").text("Make Reservations")
            var newRow = $("<tr>").append(
              $("<td>").text(selectedRestaurant.name),
              $("<td>").text(selectedRestaurant.address),
              $("<td>").text(selectedRestaurant.city),
              $("<td>").text(selectedRestaurant.postal_code),
              $("<td>").text(selectedRestaurant.price),
              $("<td>").append(restURL),
              $("<td>").text(selectedRestaurant.phone),
            );
            $("#fave-rest-table > tbody").append(newRow);

          });

        // restaurantDiv.append(restaurantName);
        restaurantDiv.append(restaurantReserve);
        restaurantDiv.append(restaurantAddress);
        restaurantDiv.append(restaurantPrice);
        restImgHldr.append(restaurantImage);
        restaurantDiv.append(restImgHldr);
        restaurantDiv.append(restaurantFavorite);
        $("#restaurant-output").prepend(restaurantDiv);
      }


    });
  }
});

