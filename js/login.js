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

firebase.auth().onAuthStateChanged(function(user) {
        if(user == null){
            //console.log("dame");
            location.href="../regist/index.html";
        }
        else{
            //console.log("haitteru");
            firebase.database().ref("users/" + user.uid + "/name").on("value",function(snapshot){
                if(snapshot.val() == null){
                    location.href="../regist/user.html";
                }
                else{
                    location.href="../top.html";
                    console.log(snapshot.val());
                }
                //console.log(snapshot.val());
            });
        }
});
