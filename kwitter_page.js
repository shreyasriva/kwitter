//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCLG7DzYtP8wW77-4YwoShJhJfaQhNvelY",
      authDomain: "kwitter-9eb73.firebaseapp.com",
      databaseURL: "https://kwitter-9eb73-default-rtdb.firebaseio.com",
      projectId: "kwitter-9eb73",
      storageBucket: "kwitter-9eb73.appspot.com",
      messagingSenderId: "770840646265",
      appId: "1:770840646265:web:58cf7c56871a12355c7aa8",
      measurementId: "G-W3TVNXQ0XC"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message']
like = message_data['Like'];
name_with_tag ="<h4>"+ name +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag ="<h4 class='message_h4'>"+ message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";
row= name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML +=row;
//End code
      } });  }); }
getData();
function send()
{
      msg = document.getElementById("msg").ariaValueMax;
      firebase.database().ref(room_name).push({
            name:_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value=" ";
}
function updateLike(message_id){
      console.log("clicked on like button -"+ message_id);
      button_id = message_id;
      likes= document.getElementById(button_id).value;
      updated_likes= Number(likes)+1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}