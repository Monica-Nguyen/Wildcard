

// 1. get values from form to this JS file 
// get element by id. value -> save to variable 

//SEND TO DATABASE 

async function postUser() { 

    //get all vars

    var userEmail = document.getElementById("email").value
    console.log(email)
    var userPassword = document.getElementById("password").value

    var userType = document.querySelector('input[name="user_type"]:checked').value;
    

    await fetch('http://localhost:3000/api/user/create', {
        method: "POST", 
        headers: {
            accept: "application/json",
        },
        body: {
            "email": userEmail,
            "password": userPassword,
            "user_type": userType
        }
    })
    .then(function(response) { 
        console.log(response);
    })
}


 


