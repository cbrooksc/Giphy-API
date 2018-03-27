
    $(document).ready(function(){

        //Array of cars
        var cars = ["lamborghini","Bently","NHRA Funny Car","Ferrari"];


        // Re-renders the HTML to display the appropiate content
        function displayCarInfo() {
            var cars = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +  "cars" + "&api_key=C93K78HQ2rcQ97dNx87OnVuAYjvvpJtb&limit=10&offset=0&rating=PG&lang=en";

         //Creating an AJax call for the specific car button being click
         
         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(cookie) {

          //Creating a div to hold the car  
          var carsDiv = $("<div class = 'cars'>");
          
          //Storing the rating data
          var rating = cookie.Rated;

          //Creating an element to have the rating displayed

          var p = $("<p>").text("Rating: " + rating);

          //Displaying the rating
          carsDiv.append(p);

          //Retrieving the URL for the image
          var imgURL = cookie.queryURL;
            
          //Creating element to hold the image
          var image = $("<img>").attr("src", imgURL);

          //Appending the image
          carsDiv.append(image);

          //Adding the entire car below the previous car
          $("#cars-view").append(carsDiv);

         });

        }
        
        // Fucntion for displaying the cars data
        function renderBtn() {  
        //Deleting the car prior to adding new cars    
        $("#buttons-view").empty();

        //Looping the array of cars
        for (var i = 0; i < cars.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)

        var a = $("<button>");
        //Adding a class of the car-btn to our button
        a.addClass("cars-btn");
        //Adding data attribute
        a.attr("data-name", cars[i]);
        //Adding the text button text
        a.text(cars[i]);

        //Adding the button to the button view div
        $("#buttons-view").append(a);

          }
    }


    //Function handles events where a car button is clicked
        $('add-cars').on("click", function(event){
            event.preventDefault();
     
    //Line grabs the input from the textbox and takes out spaces from the outside
    var cars = $("#cars-input").val().trim();  
    
    console.log("#cars-input");
    //Adds cars from the textbox to the array
    cars.push(cars);
    console.log(cars);

    //Calling the renderBtn which handles the processing of car array
    
    renderBtn();

    //Adding click listener to all elements with a class "car-btn"
    $(document).on("click", ".cars-btn", displayCarInfo);

    //Recalling the renderBtn function to display the inital buttons

            renderBtn();



        });    
    
    });

