var topics = ["Donald Trump", "Jeff Sessions", "Mitch McConnell", "Paul Ryan", "Angela Merkel", "Nigel Farage"]
var animated;
var still;

function renderButtons() {

    // Looping through the array of giphys 
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each giphy in the array. 
        var politicoBtn = $("<button>");
        // Adding a class
        politicoBtn.addClass("callName");
        // Adding a data-attribute with a value of the giphy at index i
        politicoBtn.attr("data-name", topics[i]);
        // Providing the button's text with a value of the giphy at index i
        politicoBtn.text(topics[i]);
        // Adding the button to the HTML
        $("#gif-buttons").append(politicoBtn);

    };
};

    $("#add-name").on("click", function(event) {
        
        event.preventDefault();

        $("#gif-buttons").empty();

        // This line will grab the text from the input box
        var name = $("#name-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(name);

        renderButtons();
        
      });

renderButtons();

$(".callName").on("click", function() {

            $("#magicGifs").empty();

            var politician = $(this).data("name")
            console.log(politician);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + politician + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                // Storing an array of results in the results variable
                var results = response.data;

                console.log(results);

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div>");

                        gifDiv.addClass("item");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating a place for the new gif
                        var politicoGif = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item

                        politicoGif.addClass("imageItself")
                        politicoGif.attr("data-state", "still")
                        politicoGif.attr("data-still", results[i].images.fixed_height_still.url)
                        
                        politicoGif.attr("data-animate", results[i].images.fixed_height.url)
                        politicoGif.attr("src", results[i].images.fixed_height_still.url);
                        
                        console.log(results[i].images.fixed_height_still.url);
                       

                        // Appending the paragraph and personImageto the "gifDiv" div 
                        gifDiv.append(p);
                        gifDiv.append(politicoGif);

                        $("#magicGifs").prepend(gifDiv);



                      }


                };

               $(".imageItself").on("click", function() {

                            var state = $(this).attr("data-state");
                            
                            if (state === "still") {
                                $(this).attr("src",$(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } 

                            else {
                                 $(this).attr("src", $(this).attr("data-still"));
                                 $(this).attr("data-state", "still");

                            }


                        });
                         

      });


 });






 


         
