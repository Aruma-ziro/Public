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
    
    const storage = firebase.storage();
    const inputFile = document.getElementById('file-upload');
        
    var provider = new firebase.auth.FacebookAuthProvider();
        console.log(provider);
        firebase.auth().onAuthStateChanged(function(user) {
            inputFile.addEventListener('change', (e) => {
  const files = e.target.files;
        
      var uid = user.uid;
      var name;
      console.log(user);
            $("#send").click(function(){
                if($('#username').val().length != 0){//ここ追加
                    document.getElementById("warning").innerHTML = "";//ここ追加
                    console.log("ikeru");
                    name = $('#username').val();
                    profile = $('#profile').val();//ここ追加
                    firebase.database().ref("users/" + uid).set({
                        name:name,
                        profile:profile//ここ更新
                    });
                    firebase.database().ref("users/" + uid + "/events/leader").set({
                        test:"null"
                    });
                    firebase.database().ref("users/" + uid + "/events/members").set({
                        test:"null"
                    });
                        const ref = storage.ref("users/"+ uid + "/icon");
                        const uploadTask = ref.put(files[0]);
                        uploadTask.on('state_changed', function(snap){
                      var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                       firebase.database().ref("users/" + uid +"/name").on("value",function(snapshot){
                        if(snapshot.val() == name && name !== null && progress == 100)location.href="complete.html";
                        }); 
                    });
                }
                else{
                    document.getElementById("warning").innerHTML = "名前が入力されてません";
                }
            });
        }, false);
            $("#send").click(function(){
                if($('#file-upload')[0].files[0] == null){
                    document.getElementById("warning").innerHTML = "画像が選択されてません";
                }
                console.log($('#file-upload')[0].files[0]);
            });
    });
    //var key =  firebase.database().ref("users").push("user").key;
