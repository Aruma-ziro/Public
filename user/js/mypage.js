var config = {
   apiKey: "AIzaSyB72JSMwvhh25ac-HDcpe9kK8xAZ8vTxVQ", 
   authDomain: "kiunchu-bf551.firebaseapp.com", 
   databaseURL: "https://kiunchu-bf551.firebaseio.com", 
   projectId: "kiunchu-bf551", 
   storageBucket: "kiunchu-bf551.appspot.com", 
   messagingSenderId: "272941572629" 
};
firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider();
console.log(provider);

var urlParam = location.search.substring(1);
if(urlParam){
  var param = urlParam.split('&');
  var paramArray = [];
  for (i = 0; i < param.length; i++) {
    var paramItem = param[i].split('=');
    paramArray[paramItem[0]] = paramItem[1];
  }
}
var id = paramArray.user_id;
var ref,ref2,ref3,key;


$("#kiunity").click(function(){
  var url = "../../top.html";
  location.href = url;
});


firebase.auth().onAuthStateChanged(function(user) {
  var uid = user.uid;
  console.log(id);
  if (user){

    ref = firebase.database().ref("users/" + id);
    ref2 = firebase.database().ref("users/" + id + "/events/");
    ref3 = firebase.database().ref("events/");

    ref.on("value",function(snapshot){

      var username = snapshot.child("name").val();
      document.getElementById("u_name").innerHTML = "ユーザー名：" + username;

      var profile = snapshot.child("profile").val();
      document.getElementById("u_profile").innerHTML = "自己紹介文：" + profile;

      
    });
    ref2.on("value",function(snapshot2){
      key = snapshot2.child("leader").val();
      if (key == null){
        key = snapshot2.child("members").val();
      }
      console.log(key);
    });
    ref3.on("value",function(snapshot3){
        var event = snapshot3.child(key + "/eventname").val();
        console.log(event);
        document.getElementById("eventList").innerHTML = event;

    });



    if (id !== uid){
      document.getElementById('settings').style.display="none";
    }
    else{
      $('#settings').click(function(){
        var url = "./settings.html?user_id=" + uid;
        location.href = url;
      });
    }
  }
  else{
    location.href = "../../index.html";
  }
});
    