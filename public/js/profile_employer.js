
var company_name; 
var position_title;
var position_level;
var can_coach;
var skills = [];
var job_details;
var jobId; 


async function getEmployer() {
    let response = await fetch ('http://localhost:3000/message/employer/current' , {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': "application/json",
        },
        credentials: "include"
    });
    let data = await response.json();
    console.log(data);
    const obj = data;
    company_name = obj.company_name;
    jobId = obj.jobs;
    displayAllJobs();

}

async function displayAllJobs() { 
    
    for (let i = 0; i< jobId.length; i++) {
        console.log(jobId[i])
        var url = 'http://localhost:3000/api/job/' + jobId[i]
        let response = await fetch (url , {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': "application/json",
            }
        });
        let data = await response.json();
        let obj = data[0];
        position_title = obj.position_title;
        position_level = obj.position_level;
        can_coach = obj.can_coach;
        skills = obj.skills;
        job_details = obj.job_details;
        display(i)
        // createJobDiv(i)

    }


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

    var jobDiv = document.createElement("div")
    jobDiv.id = 'profile-div'

    var topBarDiv = document.createElement("div")
    topBarDiv.id = "top-bar"

    var nameSpan = document.createElement("span"); 
    nameSpan.id = "name"
    nameSpan.textContent = company_name 
    nameSpan.innerHTML += "<br/>"


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

