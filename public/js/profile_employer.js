// var coll = document.getElementsByClassName("collapsible");
// var i;

// console.log(coll.length)
// for (i = 0; i < coll.length; i++) {
//     console.log("hi")
//  } 

var company_name; 
var position_title;
var position_level;
var can_coach;
var skills;
var job_details;

var jobId; 

// const lineBreak = document.createElement('br');


async function getEmployer() {
    await fetch ('http://localhost:3000/api/employer/63916a47b4dca73b9a7e913b' , {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': "application/json",
        }
    })
    .then(function(response) {
        return response.text();
    }).then(function(data) { 
        console.log(data)
        const obj = JSON.parse(data)
        console.log(obj[0].name)
        company_name = obj[0].company_name; 
        jobId = obj[0].jobs; 
        // console.log(jobId)
        // current_position = obj[0].current_position;
        // current_level = obj[0].current_level;
        // desired_level = obj[0].desired_level;
        // desired_position = obj[0].desired_position;
        // skills = obj[0].skills; 
        // preferred_job_details = obj[0].preferred_job_details 
   })
//    displayAttributes()

    displayAllJobs ()

}

async function displayAllJobs() { 
    
    for (let i = 0; i< jobId.length; i++) {
        console.log(jobId[i])
        var url = 'http://localhost:3000/api/job/' + jobId[i]
        await fetch (url , {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': "application/json",
            }
        })
        .then(function(response) {
            return response.text();
        }).then(function(data) { 
            console.log(data)
            const obj = JSON.parse(data)

            position_title = obj[0].position_title;
            position_level = obj[0].position_level;
            can_coach = obj[0].can_coach;
            skills = obj[0].skills;
            job_details = obj[0].job_details;
        })

        display(i)
        // createJobDiv(i)

    }

    // display()

}

function display(i) { 
    var jobSet = document.getElementById("jobSet")
    var lineBreak = document.createElement('br');


    var jobInfo = document.createElement("div")
    //create buttons
    // var buttonDivs = document.createElement("div")
    var jobButton = document.createElement("button");

    jobButton.textContent = position_title
    jobButton.id = "job-button"
    jobButton.addEventListener("click", opentext);
   
    jobInfo.appendChild(jobButton) 



    // content

    var jobDiv = document.createElement("div")
    jobDiv.id = 'profile-div'

    var topBarDiv = document.createElement("div")
    topBarDiv.id = "top-bar"

    var nameSpan = document.createElement("span"); 
    nameSpan.id = "name"
    nameSpan.textContent = company_name 
    nameSpan.innerHTML += "<br/>"

    // var editButton = document.createElement("button"); 
    // editButton.id = "edit-button"

    // var childDiv1 = document.createElement("div")
    // childDiv1.classList.add("child-div")
    // // var editDiv = document.createElement("div")
    // // editDiv.id = "edit-div"

    // childDiv1.append(nameSpan)
    
    
    // topBarDiv.append(childDiv1)
    // var childDiv2 = document.createElement("div")
    // childDiv2.classList.add("child-div")

    // childDiv2.append(editButton)
    // topBarDiv.append(childDiv2)
    // topBarDiv.append(childDiv)

    jobDiv.appendChild(nameSpan)
    jobDiv.appendChild(lineBreak)

    var positionSpan = document.createElement("span"); 
    positionSpan.classList.add("desc")
    positionSpan.textContent = position_title + " " + position_level + " Open "
    positionSpan.innerHTML += "<br/> <br/> <br/>"

    jobDiv.appendChild(positionSpan)
    // jobDiv.appendChild(lineBreak)

    if (can_coach) {
        s = "Yes"
    }
    else {
        s = "No"
    }
    var coachSpan = document.createElement("span"); 
    coachSpan.classList.add("desc")
    coachSpan.textContent = "Open to coach: " + s
    coachSpan.innerHTML +=  "<br/> <br/> <br/>"

    jobDiv.appendChild(coachSpan)

    var skillSpan = document.createElement("span"); 
    skillSpan.classList.add("desc")
    skillSpan.textContent = "Skills:"
    jobDiv.appendChild(skillSpan)
    var skillDiv = document.createElement("div")
    skillDiv.id = "skill-div"

    for (let i = 0; i < skills.length; i++) {
        var box = document.createElement("div");
        var s = skills[i];
        box.id = "box"
        box.innerHTML = s 
        box = styleDiv(box)
        skillDiv.appendChild(box)
        
    }

    
    jobDiv.appendChild(skillDiv)

    var detailsSpan = document.createElement("span"); 
    detailsSpan.classList.add("desc")
    // detailsSpan.innerHTML +=  "<br/> <br/>"
    detailsSpan.innerHTML = "<br/> <br/>" + "Job Details:"
    jobDiv.appendChild(detailsSpan)
    var detailDiv = document.createElement("div")
    detailDiv.id = "pjd-div"

    for (let i = 0; i < job_details.length; i++) {
        var box = document.createElement("div");
        var s = job_details[i];
        box.id = "box"
        box.innerHTML = s 
        box = styleDiv(box)
    
        detailDiv.appendChild(box)
        
    }

    detailDiv.innerHTML += "<br/> <br/> <br/>"
    
    jobDiv.appendChild(detailDiv)


    jobDiv.innerHTML += "<br/> <br/>"




    jobInfo.appendChild(jobDiv) 

    jobSet.appendChild(jobInfo)
    jobSet.appendChild(lineBreak)
    jobSet.appendChild(lineBreak)


    // buttonDivs.appendChild(jobButton)
    // jobs.appendChild(buttonDivs)
    // jobs.appendChild(lineBreak)

    // var profileDiv = document.createElement("div");
    // profileDiv.id = "profile-div"
    // var nameSpan = document.createElement("span"); 
    // nameSpan.id = "name"
    // nameSpan.textContent = company_name
    // profileDiv.appendChild(nameSpan)

    // jobs.appendChild(profileDiv)
}


function opentext() { 
    console.log("clicked")
    // var content = document.getElementById(parseInt(i+1)) 

    // if (content.style.display == "block") { 
    //     content.style.display = "none"
    // }
    // else 
    // {
    //     content.style.display = "block"
    // }
}

function styleDiv(divEl) { 
    divEl.style.backgroundColor = "#22577A" 
    divEl.style.color = "white";
    divEl.style.padding = "10px";
    divEl.style.borderRadius = "25px";
    divEl.style.width = "60px"
    divEl.style.marginTop = "5px"
    // divEl.style.marginLeft = "10px"
    divEl.style.textAlign = "center"


    return divEl
}

getEmployer()
