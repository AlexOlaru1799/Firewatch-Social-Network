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

var username_top = document.getElementById("username_span");

username_top.textContent = getCookie("username");

var searched = "";


function readData()
{

  var galery = document.getElementById("galeryDiv")
  var docRef = db.collection("liked").doc(getCookie("username"));

  docRef.get().then((doc) => {
    
    var posts = doc.data().posts

    if(posts)
    {
      for(i = 0;i<posts.length;i++)
      {
         var div = document.createElement("div")
         div.classList.add("col-xl-3")
         div.classList.add("col-lg-4")
         div.classList.add("col-md-4")
         div.classList.add("col-sm-6")
         div.classList.add("mt-2")

         galery.appendChild(div)

         var img = document.createElement("img")
         img.classList.add("img-thumbnail")
         img.src = posts[i]
         img.style.maxHeight = "250px"
         img.style.width = "100%"

         div.append(img)


      }
    }

  })
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