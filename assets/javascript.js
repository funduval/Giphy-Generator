var topics = ["Donald Trump", "Jeff Sessions", "Mitch McConnell", "Paul Ryan", "Angela Merkel", "Nigel Farage"]


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

renderButtons();


$(".callName").on("click", function() {


            var politician = $(this).data("name")
            console.log(politician);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + politician + "&api_key=dc6zaTOxFJmzC&limit=10";

            // Performing an AJAX GET request 

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {


                console.log(response);




                //             // Looping over every result item
                for (var i = 0; i < response.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (response[i].rating !== "r" && response[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = response[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating a place for the new gif
                        var politicoGif = $("<div>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        politicoGif.attr("src", response[i].images.fixed_height.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(politicoGif);


                        $("#magicGifs").prepend(politicoGif);

                    });


            });
