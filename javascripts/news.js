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




var newsInput = document.getElementById("newsInput")


var username_temp = getCookie("username");


function addNews()
{
    
    var time = Date.now()

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    var news = newsInput.value;

    newsInput.value = ""

    db.collection("news").doc(time.toString()).set({
        info: news,
        date: today,
        timestamp: time
    })

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


