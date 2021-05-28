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





var username_top = document.getElementById("username_span");

username_top.textContent = getCookie("username");

var searched = "";

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



var username_cookie = getCookie("username");

var recuser1 = document.getElementById("recuser1")
var recuser2 = document.getElementById("recuser2")
var recuser3 = document.getElementById("recuser3")

var recimg1 = document.getElementById("recimg1")
var recimg2 = document.getElementById("recimg2")
var recimg3 = document.getElementById("recimg3")

var sugg1 = document.getElementById("sugg1")
var sugg2 = document.getElementById("sugg2")
var sugg3 = document.getElementById("sugg3")


var feed = document.getElementById("feedDiv")

function readData()
{
    
    
  k = 0;
  var start = 0
  var friendList = getCookie("friend_list")
  friendList = friendList.split(",")

  
  
  
  db.collection("users").where("username", "!=", "admin")
  .get()
  .then((querySnapshot) => {
      size = querySnapshot.size
      nr1 = Math.floor(Math.random() * size);
      nr2 = Math.floor(Math.random() * size);
      
      querySnapshot.forEach((doc) => {
          
      
      
        

        

      if(k == nr1)
      {

        if(friendList.includes(doc.data().username) || username_cookie == doc.data().username)
        {
           nr1++
        }
        else
        {
          recuser1.textContent = "@" + doc.data().username
          const ref = firebase.storage().ref();
          var listRef = ref.child('profile_images');
  
          recimg1.src = "../imgs_profile/blank_profile.png";
  
          // Find all the prefixes and items.
          listRef.listAll()
            .then((res) => {
              res.items.forEach((itemRef) => {
                if(itemRef.name == doc.data().username)
                {
                  const profile_url = itemRef.getDownloadURL().then(url =>
                    {
                      temp = url
                      console.log("here")
                      if(url != "null")
                      {
                        recimg1.src = temp.replace("profile_images/",'profile_images%2F');
                      }
                      else
                      {
                        recimg1.src = "../imgs_profile/blank_profile.png";
                        console.log("asda");
                      }
                    }
                   
  
                    
                  );
                }
                
              });
            });


            
          
        }

        
      }

      if(recuser1.textContent == ".")
      {
        sugg1.style.display = "none"
      }
      else
      {
        sugg1.style.display = "flex"
      }

      

      k++;
           
      });
})



console.log(friendList)

db.collection('imgs').orderBy("timestamp","desc").get().then((snapshot) => {

  snapshot.docs.forEach(doc => {

      if(friendList.includes(doc.data().owner))
      {
         var row = document.createElement("div");
         row.classList.add("row");
         row.classList.add("align-content-center");

         feed.appendChild(row);

         var col12 = document.createElement("div");
         col12.classList.add("col-12");
         col12.classList.add("mt-5");

         row.appendChild(col12);

         var card = document.createElement("div");
         card.classList.add("card");
         card.classList.add("mt-5");
         card.style.maxWidth = "600px";
         card.style.left = "50%"
         card.style.transform = "translate(-50%)"

         col12.appendChild(card)

         var img = document.createElement("img")
         img.classList.add("card-img-top")
         var imgTemp = (doc.data().url).replace("posted_images/",'posted_images%2F')

         var title = document.createElement("div")
         title.classList.add("card-header")
         title.id = doc.data().timestamp
         title.style.color = "#f26729"
         title.textContent = "@" + doc.data().owner
         card.appendChild(title)

         

         var usernamePre = doc.data().owner + "/"
         var usernameAfter = doc.data().owner + "%2F"
         var urlFinal = imgTemp.replace(usernamePre,usernameAfter)
         img.src = urlFinal
         console.log(img.src)
         card.appendChild(img)


         var body = document.createElement("div")
         body.classList.add("card-body")

         card.appendChild(body)

         var p = document.createElement("p")
         p.classList.add("card-text")
         p.textContent = doc.data().description

         var footer = document.createElement("div")
         footer.classList.add("card-footer")
         footer.style.textAlign = "center"

         card.appendChild(footer)

         var btn = document.createElement("button")
         btn.classList.add("btn")
         btn.style.fontWeight = "900"

         var liked = (doc.data().liked)
         console.log(liked)

         

         footer.appendChild(btn)

         var i = document.createElement("i")
         i.classList.add("far")
         i.classList.add("fa-heart")
         i.style.fontSize = "35px"
         i.style.color = "#1d2a38"

         if(liked &&  liked.includes(getCookie("username")))
         {
           btn.disabled = true
           i.style.color = "red"
         }
         

         btn.appendChild(i)

         var likes = document.createElement("span")
         likes.textContent = doc.data().likes + " likes"
         btn.appendChild(likes)

         var newLike = doc.data().likes + 1

         btn.addEventListener("click", function() {
              likeImg(doc.data().timestamp,btn,i,likes,newLike,urlFinal)
         })

         
         body.appendChild(p)
      }
     
  })



var lastCard = document.getElementById("lastCard")

var row = document.createElement("div");
row.classList.add("row");
row.classList.add("align-content-center");

lastCard.appendChild(row);

var col12 = document.createElement("div");
col12.classList.add("col-12");
col12.classList.add("mt-5");

row.appendChild(col12);

var card = document.createElement("div");
card.classList.add("card");
card.classList.add("mt-5");
card.style.maxWidth = "600px";
card.style.left = "50%"
card.style.transform = "translate(-50%)"

col12.appendChild(card)

var img = document.createElement("img")
img.classList.add("card-img-top")





img.src = "/imgs_main/finish-line-animate.svg"
console.log(img.src)
card.appendChild(img)


var body = document.createElement("div")
body.classList.add("card-body")

card.appendChild(body)

var p = document.createElement("p")
p.classList.add("card-text")
p.textContent = "Great job! You finished all the posts so far!"

var footer = document.createElement("div")
footer.classList.add("card-footer")
footer.style.textAlign = "center"

card.appendChild(footer)

var btn = document.createElement("a")
btn.classList.add("btn")
btn.href = "#top_div"
btn.style.fontWeight = "900"

footer.appendChild(btn)

var i = document.createElement("i")
i.classList.add("fas")
i.classList.add("fa-arrow-circle-up")
i.style.fontSize = "40px"
i.style.color = "#f26729"


btn.appendChild(i)




body.appendChild(p)

  
  
})

var newsDiv = document.getElementById("newsDiv")

db.collection('news').orderBy("timestamp","desc").get().then((snapshot) => {

  snapshot.docs.forEach(doc => {

    var div1 = document.createElement("div")
    div1.classList.add("card")
    div1.classList.add("mt-2")

    newsDiv.appendChild(div1)

    var div2 = document.createElement("div")
    div2.classList.add("card-body")

    div1.appendChild(div2)

    var h5 = document.createElement("h5")
    h5.classList.add("card-title")

    div2.appendChild(h5)

    var i = document.createElement("i")
    i.classList.add("far")
    i.classList.add("fa-newspaper")
    i.style.fontSize = "18px"

    h5.appendChild(i)

    var span = document.createElement("span")
    span.classList.add("mx-lg-2")
    span.style.fontWeight = "900"
    span.style.fontSize = "20px"

    span.textContent = "News"

    h5.appendChild(span)

    var p1 = document.createElement("p")
    p1.style.fontSize = "12px"
    p1.textContent = doc.data().info

    div2.appendChild(p1)

    var p2 = document.createElement("p")
    p2.classList.add("card-footer")
    p2.textContent = doc.data().date

    div2.appendChild(p2)



  })


})



}

function likeImg(stamp,btn,i,likes,newLike,urlFinal)
{
 
  console.log(stamp)
  i.style.color= "red"
  btn.disabled = true

  likes.textContent = newLike + " likes"

  var imgRef = db.collection("imgs").doc(stamp.toString())

  imgRef.get().then((doc) => {
    var newlikes = doc.data().likes
    var user = getCookie("username")
    newlikes = newlikes + 1

    db.collection('imgs').doc(stamp.toString()).update({
      likes: newlikes,
      liked:firebase.firestore.FieldValue.arrayUnion(user)
  })

  db.collection('liked').doc(getCookie("username")).update({
    
    posts:firebase.firestore.FieldValue.arrayUnion(urlFinal)
})

})

}

function addRec1()
{
   user1 = (recuser1.textContent).substring(1)
   var ref = db.collection("users").doc(getCookie("username"));
  
    var oldFriends = parseInt(getCookie("friends")) + 1
    // Atomically add a new region to the "regions" array field.
    ref.update({
        friend_list: firebase.firestore.FieldValue.arrayUnion(user1),
        friends:oldFriends

    });


    var friendsCookie = getCookie("friend_list")

    friendsCookie = friendsCookie + "," + user1

    
    document.cookie = 'friends=' + oldFriends + '; path=/'
    document.cookie = 'friend_list=' + friendsCookie + '; path=/'

    

    sugg1.style.display = "none"
}


const ref = firebase.storage().ref();
  var listRef = ref.child('profile_images');

        // Find all the prefixes and items.
        listRef.listAll()
          .then((res) => {
            res.items.forEach((itemRef) => {
              if(itemRef.name == username_cookie)
              {
                const profile_url = itemRef.getDownloadURL().then(url =>
                  document.cookie = 'profile_img_path=' + url + '; path=/'
                );
              }
              
            });
          });