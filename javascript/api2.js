$(document).ready(function() {

    //Array of cars
    var carsArray = ["lamborghini", "Bentley", "NHRA Funny Car", "Ferrari"];

    // Fucntion for displaying the cars data
    function renderBtn() {
        //Deleting the car prior to adding new cars    
        $("#buttons-view").empty();
        //Looping the array of cars
        for (var i = 0; i < carsArray.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            //Adding a class of the car-btn to our button
            a.addClass("cars-btn");
            //Adding data attribute
            a.attr("data-name", carsArray[i]);
            //Adding the text button text
            a.text(carsArray[i]);
            //Adding the button to the button view div
            $("#buttons-view").append(a);
        }
    }
    //Function handles events where a car button is clicked
    $('#add-cars').on("click", function(event) {
        event.preventDefault();
        //Line grabs the input from the textbox and takes out spaces from the outside
        var gif = $("#cars-input").val().trim();
        if (gif == "") {
            alert("You must enter a value fool!");
        } else {
            //Adds cars from the textbox to the array
            carsArray.push(gif);
            // clear input box
            $("#cars-input").val("");
            console.log(carsArray);
        }
        //Recalling the renderBtn function to display the inital buttons
        renderBtn();
    });
    // grabs the class of gif and returns the user input with the correct gif //
    $(document).on("click", ".cars-btn", function() {
        // remove prior gifs //
        $('#cars-view').empty();
        var cars = $(this).attr("data-name");
        // var cars = $('#cars-input').val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cars + "&api_key=C93K78HQ2rcQ97dNx87OnVuAYjvvpJtb&limit=10&offset=0&rating=PG&lang=en";
        //Creating an AJax call for the specific car button being click
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(cookie) {
            var results = cookie.data;
            //Displaying the rating
            var p = $("<p>").text("Rating: " + rating);
            // loop through our results //
            for (var i = 0; i < results.length; i++) {
                // assign variable to gif url //
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                //Storing the rating data
                var rating = results[i].rating;
                console.log("Rating: " + rating);
                // create image //
                var gifImage = $("<img>");
                gifImage.addClass("giphys");
                gifImage.attr('src', still);
                gifImage.attr('data-still', still);
                gifImage.attr('data-animated', animated);
                gifImage.attr('data-state', "still");
                //Retrieving the URL for the image
                var imgURL = results[i].images.fixed_height.url;
                console.log("URL: " + imgURL);
                //Displaying the rating
                var p = $("<p>").text("Rating: " + rating);
                //Creating element to hold the image
                var image = $("<img>").attr("src", imgURL);
                //Appending the image
                $('#cars-view').append(gifImage);
                $('#cars-view').append(p);

            }
        });

    });
    //Adding click listener to all elements with a class "car-btn"
    $(document).on("click", ".giphys", function() {
        var state = $(this).attr('data-state');
        console.log(this);
        if (state == "still") {
            $(this).attr('src', $(this).attr('data-animated'));
            $(this).attr('data-state', "animated");
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
        }
    });
    // Calling the renderButtons function to display the intial buttons
    renderBtn();

}); //end of document ready