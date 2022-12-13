

// 1. get values from form to this JS file 
// get element by id. value -> save to variable
//SEND TO DATABASE 

async function postUser() { 

    let username = document.getElementById("email").value
    let userPassword = document.getElementById("password").value

    await fetch('http://localhost:3000/api/user/create', {
        method: "POST", 
        headers: {
            accept: "application/json",
        },
        body: {
            "username": username,
            "password": userPassword,
        }
    })
    .then(function(response) { 
        console.log(response);
    })
}


 


