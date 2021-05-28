
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var textDescription = document.getElementById("floatingTextarea2")

var username_top = document.getElementById("username_span");

username_top.textContent = getCookie("username");

var username_top = document.getElementById("username_span");

username_top.textContent = getCookie("username");

var searched = "";

username_cookie = getCookie("username")


function addImage()
{
  var time = Date.now()
  

  
  const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = "posted_images/" + username_cookie +"/" + time;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url);
          document.cookie = 'temp_url=' + url + '; path=/';

          
          
          after_image()

          //window.location.href = '/add.html';  
          
        })
        .catch(console.error);
  
        
        
      
}

function after_image()
{
  var _url = getCookie("temp_url")
  var text = textDescription.value
  var time = Date.now()


  var ref1 = db.collection("imgs").doc(time.toString());

  ref1.set({
    
    owner: username_cookie,
    description: textDescription.value,
    likes: 0,
    url: getCookie("temp_url"),
    timestamp:time,
    liked: []

  
  })

  var ref2 = db.collection("users").doc(username_cookie);
        
         

          

        
          // Atomically add a new region to the "regions" array field.
          ref2.update({
            descriptions: firebase.firestore.FieldValue.arrayUnion(text),
            imgs:firebase.firestore.FieldValue.arrayUnion(_url),
            imgsDate:firebase.firestore.FieldValue.arrayUnion(Date.now())
      
        })

        textDescription.value = ""
        var image = document.getElementById('output')
        image.src = "";



  
    
}

document.getElementById('search_btn_label').addEventListener('keypress', e => {

   if(e.key === "Enter")
   {
    document.cookie = 'searched=' + searched + '; path=/';
    console.log(searched); 
    window.location.href = '/search.html';  
   }
   else
   {
     searched += e.key;
   }

}
);