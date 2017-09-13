//----------------------------------Google Maps API----------------------------------------------//



// Note: This requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you did not give permission for the browser to
// locate you.
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 33.6449812,
            lng: -117.83512870000001
        },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // -----------------CURRENT POSITION START----------------//
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // function newPost(){
            //   var newPost = {
            //     post: $("#newpost").val().trim(),
            //     longitude: pos.lng,
            //     latitude: pos.lat
            //   }
            //
            //   $.post("/api/post", newPost);
            //   getPost();
            //   $("#newpost").val("");
            // }
            console.log(pos);
            // -----------------CURRENT POSITION END-------------------//
            // ------------------TURTLE ICON START---------------------//
            var icon = {
                url: "images/turtle-icon.png",
                scaledSize: new google.maps.Size(60, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: icon
            });
            // ------------------TURTLE ICON END---------------------//
            infoWindow.setPosition(pos);
            infoWindow.setContent('<h4><u>Andrews Message</u></h4>' + '<p>Hello Everyone!</p>');

            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {

        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

//----------------functions for home and application page-----------------//

$(document).ready(function(){

  function signUp(){
    var newUser = {
      name: $("#newName").val().trim(),
      username: $("#newUsername").val().trim(),
      password: $("#newPassword").val().trim()
    }
    var userName = $("#newUsername").val().trim();

    $.get("/api/users/" + userName, function(data){
      console.log(data);

        if(data){
          $("#newUsername").val("username exists!");
          $("#newName").val("");
          $("#newPassword").val("");
        }
        else if(!data){
          $.post("/api/signup", newUser);
          $("#newName").val("");
          $("#newUsername").val("");
          $("#newPassword").val("");
        }

    });
  }

  function signIn(){
    var userName = $("#username").val().trim();
    var password = $("#password").val().trim();

    $.get("/api/signin/" + userName, function(data){
      console.log(data);
      console.log(userName);
      console.log(password);
      if(data.username === userName && data.password === password){

        window.location.href = "/app";
        // getPost();
      }
      else{

        $("#username").val("invalid information");
        $("#password").val("");
      }
    });
  }
  //
  //
  // function getPost(){
  //   var id = $(this).data("id");
  //
  //   $.get("/api/posts/" + id, function(data){
  //     console.log(data);
  //     for(i = 0, i < data.length; i++){
  //       var newDiv = $("<div>");
  //       newDiv.append(data[i].post);
  //
  //       $("#userspost").html(newDiv);
  //     }
  //   });
  // }

  $(document).on("click", ".signUp", signUp);
  $(document).on("click", ".signIn", signIn);
  // $(document).on("click", ".newPost", initMap);

});
