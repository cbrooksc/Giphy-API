
    $(document).ready(function() {
    
    // Adding event listen to all buttons
    $("button").on("click",function(){

    //Grabbing and storing the data-fish from the button
    var fish = $(this).attr("data-fish");

    //Constructing a queryurl using fish name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fish + "&api_key=C93K78HQ2rcQ97dNx87OnVuAYjvvpJtb&limit=10&offset=0&rating=PG&lang=en";

    //Perform an ajax request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    //Data comes back from the request
    .then(function(cookie) {
    console.log(queryURL);
    console.log(cookie);

    //Storing data from ajax request in the results variable
    var results = cookie.data;

    //looping through each result item
    for (var i = 0; i < results.lenght; i++) {


    //Creating and storing a div tag
    var fishDiv = $("<div>");

    //Creating a paragraph tag with the result item's rating
    var p = ("<p>").text("Rating: " + results[i].rating);

    //Creating and storing an image tag
    var fishImage = $("<img>");

    //Setting the src attribute of the image to property pull from the result item
    fishImage.attr("src", results[i].images.fixed_height.url);

    //Appending the paragraph and the image tag to the carDiv
    fishDiv.append(p);
    fishDiv.append(fishImage);

    //Prepending the animalDiv to the HTML page in the "#gifs-appear-here" div
    $("gifs-appear-here").prepend(fishDiv);

   } 


      });

        });
});