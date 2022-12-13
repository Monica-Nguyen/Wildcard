

// 1. get values from form to this JS file 
// get element by id. value -> save to variable
//SEND TO DATABASE 

async function postUser() { 

    let username = document.getElementById("username").value;
    let userPassword = document.getElementById("password").value;




    let response = await fetch('http://localhost:3000/api/user/create', {
        method: "POST", 
        headers: {
            accept: "application/json",
        },
        body: {
            "username": username,
            "password": userPassword,
        }
    })

    let data = response.json();
    console.log(data);
}


 


