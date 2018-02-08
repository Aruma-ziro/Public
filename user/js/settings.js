var config = {
   apiKey: "AIzaSyB72JSMwvhh25ac-HDcpe9kK8xAZ8vTxVQ", 
   authDomain: "kiunchu-bf551.firebaseapp.com", 
   databaseURL: "https://kiunchu-bf551.firebaseio.com", 
   projectId: "kiunchu-bf551", 
   storageBucket: "kiunchu-bf551.appspot.com", 
   messagingSenderId: "272941572629" 
};
firebase.initializeApp(config);


var ref;
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

firebase.auth().onAuthStateChanged(function(user) {
	console.log(id);
    if (user){
    	ref = firebase.database().ref("users/" + id);

        document.getElementById('save').onclick = function(){
        	var reName = document.getElementById('setName').value;
        	var reProf = document.getElementById('setProfile').value;
        	console.log(reName);
        	console.log(reProf);

        	ref.update({name:reName});
        	ref.update({profile:reProf});
        };
    }
});