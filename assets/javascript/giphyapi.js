 $(document).ready(function(){

              var topics = ["goat", "puppy", "deer", "sheep", "lion"];

              function renderButtons() {

                $(".buttons").empty();
              
                for (var i = 0; i < topics.length; i++){
                  var button = $("<button>");
                  button.addClass("buttonanimals");
                  button.text(topics[i]);
                  button.attr("data-animal", topics[i]);
                  $(".buttons").append(button);
                }
              };
              renderButtons();

      $("#add-animal").on("click", function(event) {
       
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        topics.push(animal);
        renderButtons();
      });


     function ajaxCallFunction() {
    
      	var animal = $(this).attr("data-animal");
		    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=6";

      	$.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
          
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

			      var animalImage = $("<img>");
            	animalImage.attr("src", results[i].images.fixed_height_still.url);
            	animalImage.attr("data-animate", results[i].images.fixed_height.url);
            	animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            	animalImage.attr("data-state", "still");
      				animalDiv.append(p);
      				animalImage.addClass("gif");
            	animalDiv.append(animalImage);

 			      $("#gifs-area").prepend(animalDiv);
          };	

  		    $(".gif").on("click", function() {
  			
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
	      });
      };
   $(document).on("click", ".buttonanimals", ajaxCallFunction);
		});
    