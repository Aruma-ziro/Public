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

//地図に関する処理 start
function initMap() {
       //-Try HTML5 geolocation. start
       if (navigator.geolocation) {
        var syncerWatchPosition = {
            count: 0 ,
            lastTime: 0 ,
            map: null ,
            marker: null
        };

        // 成功した時の関数
        function successFunc( position ){
            // データの更新
            ++syncerWatchPosition.count ;                   // 処理回数
            console.log("count:"+syncerWatchPosition.count);  //処理回数をログ表示
            var nowTime = ~~( new Date() / 1000 ) ; // UNIX Timestamp

            // 前回の書き出しから3秒以上経過していたら描写
            // 毎回HTMLに書き出していると、ブラウザがフリーズするため
            if( (syncerWatchPosition.lastTime + 3) > nowTime )
            {
                return false ;
            }

            // 前回の時間を更新
            syncerWatchPosition.lastTime = nowTime ;

            //取得データの整理
            var data = position.coords;

            //データの整理
            var lat = data.latitude;
            var lng = data.longitude;

            // 位置情報
            var latlng = new google.maps.LatLng( lat , lng ) ;

            // Google Mapsに書き出し
            if( syncerWatchPosition.map == null )
            {
                // 地図の新規出力
                syncerWatchPosition.map = new google.maps.Map( document.getElementById( 'map' ) , {
                    zoom: 15 ,              // ズーム値
                    center: latlng,     // 中心座標 [latlng]
                    streetViewControl:false, //ストリートビュー消す
                    zoomControl: false
                });

                // 自分のマーカーの新規出力
                syncerWatchPosition.marker = new google.maps.Marker( {
                    map: syncerWatchPosition.map ,
                    position: latlng ,
                    animation: google.maps.Animation.BOUNCE

                } ) ;



                //--磯の追加部 マーカーを全てマップに表示する　start

                //--磯の追加部 マーカーを全てマップに表示する　start
                var searchEvent = firebase.database().ref("events"); 
                searchEvent.once("value", function(snapshot) { 
                    snapshot.forEach(function(childSnapshot) { 

                        this.eventID = childSnapshot.key;
                        this.eventname = childSnapshot.child("eventname").val();
                        this.genre = childSnapshot.child("genre").val();
                        console.log(this.genre);

                        //イベント名表示とボタン作成（チャットに入る）
                        var contentString = '<h4>'+eventname+'</h4>'+
                        '<input type="button" value="参加" onClick="promiseFunc(\''+eventID+'\')">';
                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        //アイコンオブジェクト
                        var iconBase = 'images/';
                        var icons = {
                          gameCenter: {
                            icon: iconBase + 'game.png'
                        },
                        music: {
                            icon: iconBase + 'music.png'
                        },
                        talking: {
                            icon: iconBase + 'talk.png'
                        }
                    };

                    var eventpos = new google.maps.LatLng(childSnapshot.child("location").val());
                    var marker = new google.maps.Marker({ 
                        map: syncerWatchPosition.map ,
                        position: eventpos,
                            //マーカー表示
                            icon: {
                                //url: icons[this.genre]['icon'],
                                url: 'images/music.png',
                                scaledSize: new google.maps.Size( 30, 30)
                            },
                            animation: google.maps.Animation.DROP

                        }); 
                       // console.log(icons['talking']['icon']);


                        //マーカーをクリックした時にinfowindowが表示
                        marker.addListener('click', function() {
                            //infowindow.setContent(contentString);
                            infowindow.open(map, marker);
                        });
                        marker.setMap(syncerWatchPosition.map);
                    });

                }); 
                //--磯の追加部分 end

                // To add the marker to the map, call setMap();  
            }

            else
            {
                // 地図の中心を変更
                syncerWatchPosition.map.setCenter( latlng ) ;
                // マーカーの場所を変更
                syncerWatchPosition.marker.setPosition( latlng ) ;
            }
        }

        // 失敗した時の関数
        function errorFunc( error )
        {
            // エラーコードのメッセージを定義
            var errorMessage = {
                0: "原因不明のエラーが発生しました…。" ,
                1: "位置情報の取得が許可されませんでした…。" ,
                2: "電波状況などで位置情報が取得できませんでした…。" ,
                3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
            };

            // エラーコードに合わせたエラー内容を表示
            alert( errorMessage[error.code] ) ;
        }


        // オプション・オブジェクト
        var optionObj = {
            "enableHighAccuracy": true ,
            "timeout": 1000000 ,
            "maximumAge": 0 ,
        } ;

        // 現在位置を取得する
        navigator.geolocation.watchPosition( successFunc , errorFunc);
    }
    else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    } //ーTry HTML5 geolocation. end
} //地図に関する処理 end


//イベントに参加した時にmembersとして登録する
function saveMember(event_id){
    firebase.auth().onAuthStateChanged(function(user){
        var uid = user.uid;
        var userName = user.displayName;
        if(uid != null){
            firebase.database().ref("events/"+event_id+"/members").update({
                [uid]: userName
            });
            firebase.database().ref("users/"+uid+"/events").set({ 
                members:event_id  
            })
            //console.log("メンバー登録完了");
        }

        else{console.log("ログイン");}
    });
}

var pageLocation = function(event_id){
    location.href = "chat.html?event_id="+event_id;
    
};

var promise = Promise.resolve();

var promiseFunc = function(event_id){
    promise.then(saveMember(event_id)).then(pageLocation(event_id))
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
}

//マイページへのリンク
$("#jumpMypage").click(function(){
    firebase.auth().onAuthStateChanged(function(user){
        var url = "../user/mypage.html?user_id=" + user.uid;
        location.href = url;
    });
});