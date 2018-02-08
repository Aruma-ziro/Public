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

    //facebook プロバイダオブジェクトのインスタンス作成
var provider = new firebase.auth.FacebookAuthProvider();

  var clickBtnLogin = function(){
        firebase.auth().signInWithRedirect(provider);
    };

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // ...
      location.href= "user.html";
  }
    else{
        document.getElementById("visible").style.visibility="visible";
    }
  // The signed-in user info.
  var user = result.user;
  console.log(user);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(error);
});
    window.onload = function() {
        document.getElementById("btnLogin").onclick = clickBtnLogin;
};