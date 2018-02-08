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

      function initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var MarkerArray = new google.maps.MVCArray();
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
          var searchEvent = firebase.database().ref("events/");
          var tbox = function(){
              var str = document.js.txtb.value;
              MarkerArray.forEach(function(marker,idx){marker.setMap(null);});
              //searchEvent.orderByChild('eventname').startAt(str).once('value').then(function(snapshot) {
              searchEvent.on("value",function(snapshot){
              snapshot.forEach(function(childSnapshot){
                  //console.log(String(childSnapshot.child("eventname").val()));
                  
                  if(String(str) != ""){
                      if(String(childSnapshot.child("eventname").val()).indexOf(str) != -1){
                      var marker = new google.maps.Marker({  
                        position: {lat:childSnapshot.child("location").child("lat").val(),lng:childSnapshot.child("location").child("lng").val()},
                        title:childSnapshot.child('eventname').val(),
                          map:map
                        });
                      var html = childSnapshot.child('eventname').val();
                        MarkerArray.push(marker);
                      var infowindow = new google.maps.InfoWindow({
                          content: childSnapshot.child('eventname').val(),
                        });
                      marker.addListener('click', function() {
                        infowindow.open(map, marker);
                      });
                          document.getElementById("warning").innerHTML = "";
                      }
                      else{
                          document.getElementById("warning").innerHTML = "検索結果はありませんでした";
                      }
                  }
                  else{
                      document.getElementById("warning").innerHTML = "入力されてません";
                  }
                  
              });
           });
          };


          var object = document.getElementById("search");

        //既存の関数をイベントリスナに登録する
        object.addEventListener("click",tbox,false);
      }
        
        
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.')};