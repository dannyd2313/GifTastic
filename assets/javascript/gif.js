$(document).ready(function() {

    var cars = [
      "ford", "chevrolet", "fiat", "mercedez benz", "ferrari", "BMW",
      "lotus", "tesla", "isuzu", "subaru", "jeep",
      "Range Rover", "cats"
    ];
    console.log("cars: ", cars);
  
  // function to make buttons and add to page
  
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
        for (var i = 0; i < arrayToUse.length; i++) {
         var a = $("<button>");
         a.addClass(classToAdd);
         a.attr("data-type", arrayToUse[i]);
         a.text(arrayToUse[i]);
         $(areaToAddTo).append(a);
        }
  
    }
  
    $(document).on("click", ".cars-button", function() {
      $("#cars").empty();
      $(".cars-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=WcnC9dZfegOpW4UQ9yEgRjMiLS9GZ3RF&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          console.log("results: ", results);
  
          for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div class=\"car-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var carImage = $("<img>");
            carImage.attr("src", still);
            carImage.attr("data-still", still);
            carImage.attr("data-animate", animated);
            carImage.attr("data-state", "still");
            carImage.addClass("car-image");
  
            carDiv.append(p);
            carDiv.append(carImage);
  
            $("#cars").append(carDiv);
          }
        });
    });
  
    $(document).on("click", ".car-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-car").on("click", function(event) {
      event.preventDefault();
      var newcar = $("input").eq(0).val();
  
      if (newcar.length > 2) {
        cars.push(newcar);
      }
  
      populateButtons(cars, "cars-button", "#cars-button");
  
    });
  
    populateButtons(cars, "cars-button", "#cars-button");
});
  