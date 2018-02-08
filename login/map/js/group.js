var config = { 
  		apiKey: "AIzaSyB72JSMwvhh25ac-HDcpe9kK8xAZ8vTxVQ", 
    	authDomain: "kiunchu-bf551.firebaseapp.com", 
    	databaseURL: "https://kiunchu-bf551.firebaseio.com", 
    	projectId: "kiunchu-bf551", 
    	storageBucket: "kiunchu-bf551.appspot.com", 
   		messagingSenderId: "272941572629" 
   	}; 
firebase.initializeApp(config);
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

        var arg = new Object;
        var url = location.search.substring(1).split('&');
        for(i=0;url[i];i++){
            var k = url[i].split("=");
            arg[k[0]] = k[1];
        }
        var id = arg.event_id;
      function initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        setInterval(function(){
        // Try HTML5 geolocation.
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function(){
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        }, 500);
          /*
          var Member = firebase.database().ref("member/"+arg.event_id+"/");
              Member.on("value", function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                  console.log(childSnapshot.val());
                      var MemberPos = firebase.database().ref("users/"+childSnapshot.val()+"/");
                            MemberPos.on("value",function(memberPosSnap){
                            var marker = new google.maps.Marker({  
                            position: {lat:memberPosSnap.lat()}
                            });
                            marker.setMap(map);
                            console.log(memberPosSnap.val());
                      });
              });
              });
              */
          var events = firebase.database().ref("events/"+arg.event_id+"/");
          events.on("value",function(snapshot){
                
              var marker = new google.maps.Marker({  
                    position: {lat:snapshot.child("location").child("lat").val(),lng:snapshot.child("location").child("lng").val()}
                });
                marker.setMap(map);
                var html = childSnapshot.child('eventname').val();
                    MarkerArray.push(marker);
                  var infowindow = new google.maps.InfoWindow({
                      content: childSnapshot.child('eventname').val(),
                    });
                  marker.addListener('click', function() {
                    infowindow.open(map, marker);
                  });
              //console.log(snapshot.child("Location").child("Lat").val());
          });
      }
        
        
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.')};