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


var username_temp = getCookie("username");

function read_data()
{
  
  if(getCookie("admin") == "true")
  {
      var admin_btn = document.getElementById("admin_remove_btn");
      admin_btn.style.visibility = "visible";
      console.log(getCookie("admin"));

      var admin_btn2 = document.getElementById("admin_remove_btn2");
      admin_btn2.style.visibility = "visible";
      console.log(getCookie("admin"));


      admin_btn2.addEventListener("click", function() {
        window.location.href = '/news.html';  
      })
      
  }
  
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

           

            if(doc.data().name == "Not defined" ||  doc.data().city == "Not defined" || doc.data().description=="No description" || doc.data().age =="0" || doc.data().occupation=="Not defined")
            {
              var warning = document.getElementById("warning_col");

              warning.style.display = "flex";

              
            }

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

              var temp_name = username_cookie + "/"
              var temp_name2 = username_cookie + "%2F"

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
              if(itemRef.name == username_cookie)
              {
                const profile_url = itemRef.getDownloadURL().then(url =>
                  document.cookie = 'profile_img_path=' + url + '; path=/'
                );
              }
              
            });
          });
  
  var profile_url = getCookie("profile_img_path");

  console.log(profile_url);

  
  if(profile_url != "null")
  {
    profile_img.src = profile_url.replace("profile_images/",'profile_images%2F');
  }
  else
  {
    profile_img.src = "../imgs_profile/blank_profile.png";
    console.log("asda");
  }




  
 
  
  


  
}


function removeWarning()
{
   var warning = document.getElementById("warning_col");

   warning.style.display = "none";
}





function get_inputs()
{
  new_name.style.display="flex";
  new_city.style.display="flex";
  new_description.style.display="flex";
  new_age.style.display="flex";
  new_gender.style.display="flex";
  new_occupation.style.display="flex";

  submit_change_btn.style.display="flex";

  profile_img.style.display="none";
  input_p.style.display="flex";


}




function change_info()
{
  
  changed_name = new_name.value;
  changed_city = new_city.value;
  changed_description = new_description.value;
  changed_age = new_age.value;
  changed_gender = new_gender.value;
  changed_occupation = new_occupation.value;

  if(changed_name != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      name: changed_name
    })

    nameX.textContent = changed_name;

    console.log(username.textContent);

    
  }

  if(changed_city != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      city: changed_city
    })

    city.textContent =  changed_city;
  }

  if(changed_description != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      description: changed_description
    })

    description.textContent =  changed_description;
  }

  if(changed_age != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      age: changed_age
    })
    age.textContent = changed_age;
  }

  if(changed_gender != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      gender: changed_gender
    })


    gender.textContent = changed_gender;
    gender.classList.add("ms-2");

    var gender_icon = document.getElementById("gender_icon");

    if(changed_gender == "Female")
    {
      gender_icon.removeAttribute('class');
      gender_icon.classList.add("fas");
      gender_icon.classList.add("fa-venus");
    }
    else if(changed_gender == "Male")
    {
    gender_icon.removeAttribute('class');
    gender_icon.classList.add("fas");
    gender_icon.classList.add("fa-mars");
    }
    else if(changed_gender == "Other")
    {
        gender_icon.removeAttribute('class');
        gender_icon.classList.add("fas");
        gender_icon.classList.add("fa-transgender-alt");
    }
    
  }

  if(changed_occupation != "")
  {
    db.collection('users').doc(getCookie("username")).update({
      occupation: changed_occupation
    })

    occupation.textContent = changed_occupation;
  }



  new_name.style.display="none";
  new_city.style.display="none";
  new_description.style.display="none";
  new_age.style.display="none";
  new_gender.style.display="none";
  new_occupation.style.display="none";

  submit_change_btn.style.display="none";
  profile_img.style.display="flex";
  input_p.style.display="none";
  output.style.display="none";

  var profile_url = getCookie("profile_img_path");
  profile_img.src = profile_url.replace("profile_images/",'profile_images%2F');
  
  //setTimeout(() => {  location.reload();return false;}, 2000);
  
  

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


var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
  output.style.display="flex";

  const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = "profile_images/" + username_cookie;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          //console.log(url);
          //document.querySelector("#file").src = url;
          document.cookie = 'profile_img_path=' + url + '; path=/',
          console.log("Load")
          db.collection('users').doc(username_cookie).update({
            profileImg:url
          })
          
        })
        .catch(console.error);
  
  
        
       submit_change_btn.disabled=true;

       setTimeout(() => {  submit_change_btn.disabled=false;}, 2500);
          

};