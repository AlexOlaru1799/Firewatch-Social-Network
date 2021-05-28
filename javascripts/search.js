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

var searched = getCookie("searched");

var search_field = document.getElementById("search_field");



function search_after_load()
{
  db.collection('users').get().then((snapshot) => {

    snapshot.docs.forEach(doc => {
        if(doc.data().username.includes(searched) && doc.data().username != "admin" && doc.data().username != getCookie("username"))
        {
            
            var card_div = document.createElement("div");
            card_div.classList.add("card");   
            card_div.classList.add("search_card");
            card_div.classList.add("mt-3");
            card_div.classList.add("mb-3");
           
            var card_body = document.createElement("div");
            card_div.classList.add("card-body");
            card_div.appendChild(card_body);   

            var card_title = document.createElement("h5");
            card_div.classList.add("card-title");
            card_body.appendChild(card_title);

            var card_title_i = document.createElement("i");
            card_title_i.classList.add("fas");
            card_title_i.classList.add("fa-user-friends");
            card_title.appendChild(card_title_i);

            var card_title_span = document.createElement("span");
            card_title_span.classList.add("ms-2");
            card_title_span.style.fontWeight=900;
            card_title_span.style.fontSize="15px";
            card_title_span.textContent="Perhaps you know!";
            card_title.appendChild(card_title_span);

            var card_row = document.createElement("div");
            card_row.classList.add("row");
            card_body.appendChild(card_row);

            var card_col12 = document.createElement("div");
            card_col12.classList.add("col-lg-12");
            card_row.appendChild(card_col12);

            var col_span1 = document.createElement("span");
            
            
            
            card_col12.appendChild(col_span1);
            var span1_img = document.createElement("img");
           
            console.log(tempImg)
            
            if(doc.data().profileImg)
            {
              
              var tempImg = doc.data().profileImg
              tempImg = tempImg.replace("profile_images/",'profile_images%2F');
              span1_img.src = tempImg
             
            }
            if(doc.data().profileImg == "none")
            {
              console.log(tempImg)
              span1_img.src = "../imgs/face1.png"
            }
            
            span1_img.style.maxWidth="150px";
            col_span1.appendChild(span1_img);

            var span1_username = document.createElement("span");
            span1_username.style.color="#f26729";
            span1_username.style.fontWeight=900;
            span1_username.style.fontSize="25px";
            span1_username.textContent = "@" + doc.data().username;
            col_span1.appendChild(span1_username);

            var col_span2 = document.createElement("span");
            col_span1.style.color="#1d2a38";
            col_span1.style.fontWeight=700;
            col_span1.style.fontSize="20px";
            card_col12.appendChild(col_span2);

            var span2_i = document.createElement("i");
            span2_i.classList.add("fas");     
            span2_i.classList.add("fa-circle");
            span2_i.classList.add("ms-2");
            span2_i.classList.add("me-2");
            span2_i.style.fontSize="10px";
            col_span2.appendChild(span2_i);

            var span2_city = document.createElement("span");
            span2_city.textContent = doc.data().city;
            span2_city.style.fontSize="20px";
            span2_city.classList.add("ms-lg-2");
            span2_i.appendChild(span2_city);

            var span3_i = document.createElement("i");
            span3_i.classList.add("fas");     
            span3_i.classList.add("fa-circle");
            span3_i.classList.add("ms-2");
            span3_i.classList.add("me-2");
            span3_i.style.fontSize="10px";
            col_span2.appendChild(span3_i);

            var span3_occupation = document.createElement("span");
            span3_occupation.textContent = doc.data().occupation;
            span3_occupation.style.fontSize="20px";
            span3_occupation.classList.add("ms-2");
            span3_i.appendChild(span3_occupation);


            var btn_div = document.createElement("div");
            btn_div.classList.add("col-lg-12");
            btn_div.classList.add("mt-2");
            card_row.appendChild(btn_div);

            var add_btn = document.createElement("button");
            add_btn.classList.add("btn");
            add_btn.classList.add("btn_hover");
            add_btn.classList.add("btn-outline-secondary");
            add_btn.style.width="100%";
            add_btn.style.fontWeight=900;
            add_btn.style.fontSize="15px";
              
            //add_btn.style.color="#f26729";
            //add_btn.style.background="#f26729";


            btn_div.appendChild(add_btn);

            var btn_span = document.createElement("span");
            btn_span.textContent="See profile";
            add_btn.appendChild(btn_span);

            add_btn.addEventListener('click', function() {
              document.cookie = 'other_profile=' + doc.data().username + '; path=/'
              document.cookie = 'other_profile=' + doc.data().username + '; path=/'

              const ref = firebase.storage().ref();
              var listRef = ref.child('profile_images');
                found = 0
                    // Find all the prefixes and items.
                    listRef.listAll()
                      .then((res) => {
                        res.items.forEach((itemRef) => {
                          
                          if(itemRef.name == username_temp)
                          {
                
                  const profile_url = itemRef.getDownloadURL().then(url =>
                  document.cookie = 'profile_img_path=' + url + '; path=/',
                  found = 90
                );
              }
              
            });
          });
    
              window.location.href = '/other_profile.html';
            }, false);

            search_field.appendChild(card_div);
        }
        
    })

  })
}


var username_top = document.getElementById("username_span");

username_top.textContent = getCookie("username");

var searched2 = "";

document.getElementById('search_btn_label').addEventListener('keypress', e => {

   if(e.key === "Enter")
   {
    document.cookie = 'searched=' + searched2 + '; path=/';
    console.log(searched2); 
    window.location.href = '/search.html';  
   }
   else
   {
    searched2 += e.key;
   }

}
);