
async function validateUser() { 

    //get all vars

    var userEmail = document.getElementById("email").value
    console.log(email)
    var userPassword = document.getElementById("password").value


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


 


