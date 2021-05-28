

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




var username = document.getElementById("username_field");
var date = document.getElementById("date_field");
var nameX = document.getElementById("name_field");
var city = document.getElementById("city_field");
var description = document.getElementById("description_field");
var gender = document.getElementById("gender_field");
var age = document.getElementById("age_field");
var occupation = document.getElementById("occupation_field");
var friends = document.getElementById("friends_field");

var age_next = document.getElementById("age_field_next");
var friends_next = document.getElementById("friends_field_next");

var add_friend_btn = document.getElementById("add_friend_btn");

var new_name = document.getElementById("new_name");
var new_city = document.getElementById("new_city");
var new_description = document.getElementById("new_description");
var new_gender = document.getElementById("new_gender");
var new_age = document.getElementById("new_age");
var new_occupation = document.getElementById("new_occupation");
var submit_change_btn = document.getElementById("submit_change_btn");

var profile_img = document.getElementById("profile_img");
var input_p = document.getElementById("input_p");
var output = document.getElementById("output");


var username_temp = getCookie("other_profile");


function removeUser()
{
  db.collection('users').doc(username_temp).update({
    
    banned: true
  })


  alert("You have just banned user: " + username_temp + " !")

}

function read_data()
{
  
  if(getCookie("admin") == "true")
  {
      var admin_btn = document.getElementById("admin_remove_btn");
      admin_btn.style.visibility = "visible";
      console.log(getCookie("admin"));
      
  }

 

  db.collection("users").where("username", "==", getCookie("username"))
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
                 
        for(i=0;i<doc.data().friend_list.length ; i++)
        {
           if(doc.data().friend_list[i] == username_temp)
           {
              add_friend_btn.style.display = "none"
              break
           }
        }  
        
                     
      });
   })

  
  
  db.collection("users").where("username", "==", username_temp)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            username.textContent = "@" + doc.data().username;
            date.textContent = " " + doc.data().date;
            nameX.textContent = doc.data().name;
            city.textContent =  doc.data().city;
            description.textContent =  doc.data().description;
            gender.textContent = doc.data().gender;
            gender.classList.add("ms-2");

            


            

            var gender_icon = document.getElementById("gender_icon");

            if(doc.data().gender == "Female")
            {
                gender_icon.removeAttribute('class');
                gender_icon.classList.add("fas");
                gender_icon.classList.add("fa-venus");
            }
            else if(doc.data().gender == "Male")
            {
                gender_icon.removeAttribute('class');
                gender_icon.classList.add("fas");
                gender_icon.classList.add("fa-mars");
            }
            else if(doc.data().gender == "Other")
            {
                gender_icon.removeAttribute('class');
                gender_icon.classList.add("fas");
                gender_icon.classList.add("fa-transgender-alt");
            }

            age.textContent =  doc.data().age;
            occupation.textContent = doc.data().occupation;
            friends.textContent =  doc.data().friends;
            console.log(doc.data().friends);

           

            var imgs = doc.data().imgs
            console.log(imgs)
            var galery_body = document.getElementById("galery_body")

            for( i =0; i<imgs.length ;i++)
            {
              

              if(i%3 == 0)
              {
                var row_div = document.createElement("div");
                row_div.classList.add("row");   
                row_div.classList.add("mt-2");
              }

              var div1 = document.createElement("div");
              div1.classList.add("col-lg-4");   
              //div1.classList.add("col-md-6");
              div1.classList.add("mt-md-0");
              div1.classList.add("mb-md-0");
              div1.classList.add("mt-lg-0");
              row_div.appendChild(div1)

              var temp_name = username_temp + "/"
              var temp_name2 = username_temp + "%2F"

              var span1_img = document.createElement("img");
              span1_img.classList.add("img-thumbnail")
              var aux=imgs[i].replace("posted_images/",'posted_images%2F')
              span1_img.src=aux.replace(temp_name,temp_name2)

              console.log(span1_img.src)
              //span1_img.style.maxHeight="200px";
              span1_img.style.width="100%";
              div1.appendChild(span1_img)

              galery_body.appendChild(row_div)
               
            }

             
        });
  })
    


  const ref = firebase.storage().ref();
  var listRef = ref.child('profile_images');
    
        // Find all the prefixes and items.
        listRef.listAll()
          .then((res) => {
            res.items.forEach((itemRef) => {
              
              if(itemRef.name == username_temp)
              {
                  
                  const profile_url = itemRef.getDownloadURL().then(url =>
                  document.cookie = 'temp_profile_path=' + url + '; path=/',
                  
                 
                ).then((x) => {
                  var profile_url = getCookie("temp_profile_path")
  

                  console.log(profile_url);
                  console.log(username_temp)
                  
                  if(profile_url != "null")
                  {
                    profile_img.src = profile_url.replace("profile_images/",'profile_images%2F');
                  }
                  else
                  {
                    profile_img.src = "../imgs_profile/blank_profile.png";
                    console.log("asda");
                  }
                });
              }
              
            });
          });
    
  
  
  
 
  
  


  
}



function add_friend()
{
  var ref = db.collection("users").doc(getCookie("username"));
  
  var oldFriends = parseInt(getCookie("friends")) + 1
  
  // Atomically add a new region to the "regions" array field.
  ref.update({
      friend_list: firebase.firestore.FieldValue.arrayUnion(username_temp),
      friends:oldFriends

  });

  add_friend_btn.style.display = "none"
  document.cookie = 'friends=' + oldFriends + '; path=/'
  document.cookie = 'friends=' + doc.data().friend_list + '; path=/'

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




