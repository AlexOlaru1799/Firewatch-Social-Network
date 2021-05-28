var login_btn = document.getElementById("login_btn");
var register_btn = document.getElementById("register_btn");

var login_form = document.getElementById("login_form");
var register_form = document.getElementById("register_form");

var card_body_form = document.getElementById("card-body-form");

function put_login(){
    login_btn.classList.remove("off-btn");
    login_btn.classList.add("active-btn");


    register_btn.classList.remove("active-btn");
    register_btn.classList.add("off-btn");

    register_form.style.visibility="hidden";
    login_form.style.visibility="visible";

    
}



function put_register(){
    register_btn.classList.remove("off-btn");
    register_btn.classList.add("active-btn");


    login_btn.classList.remove("active-btn");
    login_btn.classList.add("off-btn");


    register_form.style.visibility="visible";
    login_form.style.visibility="hidden";

    
}

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    window.alert("You have entered an invalid email address!")
    return (false)
}

function verifyPassword(password)
{
    if(password == "")
    {
        window.alert("You must enter a password!");
        return false;
    }
    else if(password.length < 8)
    {
        window.alert("Your password must be longer than 8 characters!");
        return false;
    }
}

function verifyUsername(password)
{
    if(password == "")
    {
        window.alert("You must enter the username!");
        return false;
    }
    
}






function verify_register()
{


    var username_val = document.getElementById("username_field").value;
    var password_val = document.getElementById("password_field").value;
    var email_val = document.getElementById("email_field").value;

    var radioMale = document.getElementById("flexRadioDefault1").checked;
    var radioFemale = document.getElementById("flexRadioDefault2").checked;
    var radioOther = document.getElementById("flexRadioDefault3").checked;

    var gender_val;

    var found = 0;

    if(radioMale == true)
    {
        gender_val = "Male";
    }
    else if(radioFemale == true)
    {
        gender_val = "Female";
    }
    else if(radioOther == true)
    {
        gender_val = "Other";
    }

    if( verifyUsername(username_val) == false || ValidateEmail(email_val) == false || verifyPassword(password_val) == false)
    {
        return;
    }
    else
    {
        db.collection('users').get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
                if(doc.data().username == username_val)
                {
                    console.log("exista deja");
                    //verifyData(found);
                    found = 1 ;
                    window.alert("Username already exists!")
                }
            })
    
            if(found == 0)
            {
                var newDate = new Date();
                var dateX = newDate.getDate() + "-" + (newDate.getMonth()+1) + "-" + newDate.getFullYear();
                db.collection('users').doc(username_val).set({
                    username: username_val,
                    password: password_val,
                    gender: gender_val,
                    email: email_val,
                    admin: false,
                    age: 0,
                    city: "Not defined",
                    date: dateX,
                    description: "No description",
                    friends: 0,
                    name: "Not defined",
                    occupation: "Not defined",
                    friend_list:[],
                    descriptions:[],
                    imgs:[],
                    imgsDate:[],
                    profileImg:"none",
                    banned:false
            
                })
                .then(() => {
                    document.cookie = 'username=' + username_val + '; path=/';
                    document.cookie = 'gender=' + gender_val + '; path=/';
                    document.cookie = 'email=' + email_val + '; path=/';
                    document.cookie = 'age=' + 0 + '; path=/';
                    document.cookie = 'city=' + "Not defined" + '; path=/';
                    document.cookie = 'date=' + dateX + '; path=/';
                    document.cookie = 'description=' + "No description" + '; path=/';
                    document.cookie = 'name=' + "Not defined" + '; path=/';
                    document.cookie = 'friends=' + 0 + '; path=/';
                    document.cookie = 'occupation=' + "Not defined" + '; path=/';
                    document.cookie = 'admin=false'  + '; path=/';
                    document.cookie = 'profile_img_path=' + "null" + '; path=/'
                    document.cookie = 'friend_list=' + "null" + '; path=/'


                    const ref = firebase.storage().ref();
                    var file = ref.child('../imgs_profile/blank_profile.png');
                    const name = "profile_images/" + username_val;
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
                        
                        })
                        .catch(console.error);


                    

                    window.location.href = '/main.html';
                    console.log("pff");
                })

                db.collection('liked').doc(username_val).set({
                    username: username_val,
                    posts: []
            
                })

                
                

                
            }
            else
            {
                console.log("Nu a putut fi adaugat");
            }
            
        })
    }


    

    
    
   

   
}


function verify_login()
{


    var username_val = document.getElementById("username_field_login").value;
    var password_val = document.getElementById("password_field_login").value;
    
    

    var found = 0;

   
    
    
        db.collection('users').get().then((snapshot) => {

            var found = 0;

            snapshot.docs.forEach(doc => {


                if(doc.data().username == username_val && doc.data().password == password_val)
                {

                    if(doc.data().banned == true)
                    {
                        alert("Your account has been banned...");
                        
                    }
                    else
                    {
                        document.cookie = 'username=' + username_val + '; path=/';
                        document.cookie = 'gender=' + doc.data().gender + '; path=/';
                        document.cookie = 'email=' + doc.data().username + '; path=/';
                        document.cookie = 'age=' + doc.data().age + '; path=/';
                        document.cookie = 'city=' + doc.data().city + '; path=/';
                        document.cookie = 'date=' + doc.data().date + '; path=/';
                        document.cookie = 'description=' + doc.data().description + '; path=/';
                        document.cookie = 'name=' + doc.data().name + '; path=/';
                        document.cookie = 'friends=' + doc.data().friends + '; path=/';
                        document.cookie = 'occupation=' + doc.data().occupation + '; path=/';
                        document.cookie = 'admin=' + doc.data().admin + '; path=/';
                        document.cookie = 'profile_img_path=' + "null" + '; path=/'
                        document.cookie = 'friend_list=' + doc.data().friend_list + '; path=/'
    
                        window.location.href = '/main.html';
                    }
                    

                   
                    found = 1;
                    
                }
                
            })

            if(found == 0)
            {
                alert("Username and/or password are incorrect!")
            }
    

            
        })

        
    
        

   
  
}