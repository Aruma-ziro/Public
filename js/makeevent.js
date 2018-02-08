

// Initialize Firebase 
var config = { 
    apiKey: "AIzaSyB72JSMwvhh25ac-HDcpe9kK8xAZ8vTxVQ", 
    authDomain: "kiunchu-bf551.firebaseapp.com", 
    databaseURL: "https://kiunchu-bf551.firebaseio.com", 
    projectId: "kiunchu-bf551", 
    storageBucket: "kiunchu-bf551.appspot.com", 
    messagingSenderId: "272941572629" 
}; 
firebase.initializeApp(config);
  

var namex, contentsx, limitx, genrex;
function inputting() {
        var name = document.getElementById('eventName').value;
        namex = String(name);
        var contents = document.getElementById('eventContent').value;
        contentsx = String(contents);
        limitx = document.getElementById('eventLimit').value;
        genrex  =  document.getElementById('genre').value;
}


var eventID, userID;
function makeEvent(_eventname, _content, _limit, _genre) {

        
       //ログイン情報
       firebase.auth().onAuthStateChanged(function(user) {
          if (user){
            userID = user.uid;
            console.log(userID);
          }
       });

       var eventData = {
               eventname: _eventname,
               content: _content,
               limit: _limit,
               genre: _genre,
               members: 0,
               leader: userID
       };


      //一意なIDをeventIDに格納しつつ、eventDataをeventsに格納
       eventID = firebase.database().ref("events/").push(eventData).key;

       //ジャンルにIDとイベント名を作成
       firebase.database().ref("genre/" + eventData.genre).update(
          {[eventID]: eventData.eventname}
        );

       console.log(eventData.leader);
       console.log(eventData.members);
       console.log(eventID);
 }


var puttingLatLng = null;
var map;
var markers2 = [];
var myLatlng;

function initMap() {


    myLatlng = new google.maps.LatLng(-34.397, 150.644);
    map = new google.maps.Map(document.getElementById("map"), {
          zoom: 18,
          center: myLatlng
    });

    //現在地を表示
    setTimeout(
      function(){
        // Try HTML5 geolocation.
            if(navigator.geolocation){

                  //コールバック関数を二つつ取っている、
                  navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };

                   map.setCenter(pos);
                    }, function(){
                    handleLocationError(true, infoWindow, map.getCenter());
                  });

            } else {
                  // Browser doesn't support Geolocation
                  handleLocationError(false, infoWindow, map.getCenter());
            }
      }
      , 250);
   
    puttingLatLng = {
        lat: 0,
        lng: 0
    }
    //Listen for clicks and add the location of the click to firebase.
    map.addListener('click', function(e) {
            //sendInfo用のオブジェクト
            puttingLatLng = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }

            console.log(puttingLatLng);

            deleteMarkers();
            addMarker(puttingLatLng);
              // To add the marker to the map, call setMap();
            //marker2.setMap(map);
    });
}

 //マーカ追加のメソッド群
function addMarker(location) {

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.BOUNCE
    });
    markers2.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers2.length; i++) {
        markers2[i].setMap(map);
    }
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
   setMapOnAll(null);
}
// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers2 = [];
}
function errorMessage(){
  document.getElementById('error').innerHTML = "未入力の欄があります。入力してから送信してください";
}
var putLanLng = function(){
   firebase.database().ref("events/" + eventID + "/location").update(puttingLatLng);
}

var pageJump = function(){
  if((namex.length >= 1)&&(contentsx.length >= 1)&&(limitx.length >= 1)&&(puttingLatLng.lat!='')){
    setTimeout(function(){window.location.href = 'top.html'},800);
  }
   else errorMessage();

}



function onClickProccess(){
        //プロミス　成功処理のみ
        var promise = Promise.resolve();
        promise.then(inputting()).then(makeEvent(namex,contentsx,limitx, genrex))
        .then(putLanLng()).then(pageJump());
}




