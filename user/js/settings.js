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
const storage = firebase.storage();
const inputFile = document.getElementById('setFile');

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
  if (user){
    var uid = user.id;

    ref = firebase.database().ref("users/" + id);

    document.getElementById('save').onclick = function(){
      var reName = document.getElementById('setName').value;
      var reProf = document.getElementById('setProfile').value;


      inputFile.addEventListener('change', (e) => {
        const files = e.target.files;
        const ref = storage.ref("users/"+ id + "/icon");
        const uploadTask = ref.put(files[0]);
        uploadTask.on('state_changed', function(snap){
          var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
          if(progress == 100){
            if(reName !== null)ref.update({name:reName});
            if(reProf !== null)ref.update({profile:reProf});
            location.href="../user/mypage.html?user_id=" + id;
          }
        }); 
      },false);
      if(reName !== null)ref.update({name:reName});
      if(reProf !== null)ref.update({profile:reProf});
      location.href="../user/mypage.html?user_id=" + id;
    }
  }
  else{
    location.href = "../../index.html";
  }
});