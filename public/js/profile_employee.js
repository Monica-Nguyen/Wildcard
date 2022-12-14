var userid = "6391663e5510bd5a4bb4f187"

var employeeName = '';
var current_position;
var current_level;
var desired_position;
var desired_level;
var skills;
var preferred_job_details;


async function getEmployeeInfo() {
    await fetch ('http://localhost:3000/api/employee/6391663e5510bd5a4bb4f187' , {
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
            employeeName = obj[0].name;
            current_position = obj[0].current_position;
            current_level = obj[0].current_level;
            desired_level = obj[0].desired_level;
            desired_position = obj[0].desired_position;
            skills = obj[0].skills;
            preferred_job_details = obj[0].preferred_job_details
        })
    displayAttributes()

}

function displayAttributes () {
    var nameSpan = document.getElementById("name")
    console.log(nameSpan)
    nameSpan.textContent = employeeName;

    var currentPositionSpan = document.getElementById("c-position")
    currentPositionSpan.textContent = current_position;

    var currentLevelSpan = document.getElementById("c-level")
    currentLevelSpan.textContent = current_level;


    var desiredLevelSpan = document.getElementById("d-level")
    desiredLevelSpan.textContent = "Desired Level:     " + desired_level;

    var desiredPositionSpan = document.getElementById("d-position")
    desiredPositionSpan.textContent = "Desired Position:     " + desired_position;

    var skillDiv = document.getElementById("skill-div")
    for (let i = 0; i < skills.length; i++) {
        var box = document.createElement("div");
        var s = skills[i];
        box.id = "box"
        box.innerHTML = s
        box = styleDiv(box)
        skillDiv.appendChild(box)

    }
    var pjdDiv = document.getElementById("pjd-div")
    for (let i = 0; i < preferred_job_details.length; i++) {
        var box = document.createElement("div");
        var s = preferred_job_details[i];
        box.id = "box"
        box.innerHTML = s
        box = styleDiv(box)
        pjdDiv.appendChild(box)
    }
    console.log(skills)


}

function styleDiv(divEl) {
    divEl.style.backgroundColor = "#22577A"
    divEl.style.color = "white";
    divEl.style.padding = "10px";
    divEl.style.borderRadius = "25px";
    divEl.style.width = "50px"
    divEl.style.marginTop = "5px"
    divEl.style.marginLeft = "10px"


    return divEl
}

getEmployeeInfo()