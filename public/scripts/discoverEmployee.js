async function onLoad(){
    let employees = await getEmployeesArray()

    createCarouselFrontEnd(employees)
}

function createCarouselFrontEnd(employees){
    let carouselDoc = document.getElementsByClassName('carousel-inner')[0]
    let carouselArr = []

    for(let i = 0; i < employees.length; i++){
        let carouselItemDiv = document.createElement("div");
        let mainDiscContentDiv = document.createElement("div");
        mainDiscContentDiv.setAttribute("id", "mainDiscContentDiv")

        // console.log(employees[i])

        if(i == 0){
            console.log("first element")
            carouselItemDiv.setAttribute("class", "carousel-item active")
        } else{
            carouselItemDiv.setAttribute("class", "carousel-item")
        }

        let employeeAndMatchDiv = createEmployeeAndMatch(employees[i])
        let infoDiv = createInfo(employees[i])

        mainDiscContentDiv.appendChild(employeeAndMatchDiv)
        mainDiscContentDiv.appendChild(infoDiv)

        carouselItemDiv.appendChild(mainDiscContentDiv)
        carouselArr.push(carouselItemDiv)
    }

    for(let carouselEl of carouselArr){
        carouselDoc.appendChild(carouselEl)
    }
}

function createEmployeeAndMatch(employee){
    let employeeAndMatchDiv = document.createElement("div");

    let employeeTitleDiv = createemployeeTitle(employee)
    let createemployeeLogoDiv = createemployeeLogo(employee)
    let matchDiv = createMatch(employee)

    employeeAndMatchDiv.setAttribute("id", "employeeAndMatch")

    employeeAndMatchDiv.appendChild(employeeTitleDiv)
    employeeAndMatchDiv.appendChild(createemployeeLogoDiv)
    employeeAndMatchDiv.appendChild(matchDiv)

    return employeeAndMatchDiv
}

function createMatch(employee){
    let matchDiv = document.createElement("div");

    let hiddenAcceptField = document.createElement("input")
    let hiddenDeclineField = document.createElement("input")

    let acceptButton = document.createElement("button")
    let declineButton = document.createElement("button")

    let acceptLogo = document.createElement("span");
    let declineLogo = document.createElement("span");
    let acceptLogoText = document.createTextNode("check_circle")
    let declineLogoText = document.createTextNode("cancel")

    hiddenAcceptField.setAttribute("type", "hidden")
    hiddenAcceptField.setAttribute("name", "id")
    hiddenAcceptField.setAttribute("value", employee._id)

    hiddenDeclineField.setAttribute("type", "hidden")
    hiddenDeclineField.setAttribute("name", "id")
    hiddenDeclineField.setAttribute("value", employee._id)

    acceptLogo.setAttribute("class", "material-symbols-outlined")
    declineLogo.setAttribute("class", "material-symbols-outlined")

    acceptLogo.appendChild(acceptLogoText)
    declineLogo.appendChild(declineLogoText)

    acceptButton.appendChild(acceptLogo)
    declineButton.appendChild(declineLogo)

    let acceptFormEl = document.createElement("form");
    let declineFormEl = document.createElement("form");

    //add hidden field for employee/employeer id
    acceptFormEl.setAttribute("action", "/api/discover/yes")
    acceptFormEl.setAttribute("method", "post")

    declineFormEl.setAttribute("action", "/api/discover/no")
    declineFormEl.setAttribute("method", "post")

    acceptFormEl.appendChild(hiddenAcceptField)
    acceptFormEl.appendChild(acceptButton)

    declineFormEl.appendChild(declineButton)
    declineFormEl.appendChild(hiddenDeclineField)
    matchDiv.setAttribute("id", "match")

    matchDiv.appendChild(acceptFormEl)
    matchDiv.appendChild(declineFormEl)

    return matchDiv
}

function createemployeeTitle(employee){
    let employeeTitleDiv = document.createElement("div");
    employeeTitleDiv.setAttribute("id", "employeeTitle")

    let employeeTitleElement = document.createElement("h1");
    let employeeTitleElementText = document.createTextNode(employee.name)
    employeeTitleElement.appendChild(employeeTitleElementText)
    employeeTitleDiv.appendChild(employeeTitleElement)

    return employeeTitleDiv
}

function createemployeeLogo(employee){
    let employeeLogoDiv = document.createElement("div");
    employeeLogoDiv.setAttribute("id", "employeeLogo")

    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", "/images/" + employee.name + ".png")
    employeeLogoDiv.appendChild(logoImg)

    return employeeLogoDiv
}

function createInfo(employee){
    let infoDiv = document.createElement("div");

    let currentJobInfoDiv = createCurrentJobInfo(employee)
    let desiredJobInfoDiv = createDesiredJobInfo(employee)
    let skillsDiv = createSkills(employee)
    let prefJobDetailsDiv = createPreferredJobDetails(employee)

    infoDiv.setAttribute("id", "info")

    infoDiv.appendChild(currentJobInfoDiv)
    infoDiv.appendChild(desiredJobInfoDiv)
    infoDiv.appendChild(skillsDiv)
    infoDiv.appendChild(prefJobDetailsDiv)

    return infoDiv
}

function createCurrentJobInfo(employee){
    let currentjobInfoDiv = document.createElement("div");

    currentjobInfoDiv.setAttribute("id", "currentjobInfo")

    let currentPosElement = document.createElement("h1");
    let currentPosElementText = document.createTextNode(employee.current_position)
    currentPosElement.appendChild(currentPosElementText)

    let currentLevel = document.createElement("h2");
    let currentLevelText = document.createTextNode("Current Level: " + employee.current_level)
    currentLevel.appendChild(currentLevelText)

    currentjobInfoDiv.appendChild(currentPosElement)
    currentjobInfoDiv.appendChild(currentLevel)

    return currentjobInfoDiv
}

function createDesiredJobInfo(employee){
    let desiredjobInfoDiv = document.createElement("div");

    desiredjobInfoDiv.setAttribute("id", "desiredjobInfo")

    let desiredPosElement = document.createElement("h1");
    let desiredPosElementText = document.createTextNode(employee.desired_position)
    desiredPosElement.appendChild(desiredPosElementText)

    let desiredLevel = document.createElement("h2");
    let desiredLevelText = document.createTextNode("Desired Level: " + employee.desired_level)
    desiredLevel.appendChild(desiredLevelText)

    desiredjobInfoDiv.appendChild(desiredPosElement)
    desiredjobInfoDiv.appendChild(desiredLevel)

    return desiredjobInfoDiv
}

function createSkills(employee){
    let skillsDiv = document.createElement("div");

    let skillsTitleElement = document.createElement("h1");
    let skillsTitleElementText = document.createTextNode("Skills")
    skillsTitleElement.appendChild(skillsTitleElementText)

    skillsDiv.setAttribute("id", "skillsDivs")

    let skillsList = document.createElement("ul");

    let tempSkillsArr = employee.skills.flatMap(function(skill){
        return skill
    })

    let uniqueSkills = [...new Set(tempSkillsArr)];

    for(let skill of uniqueSkills){
        let skillElement = document.createElement("li");
        let skillElementText = document.createTextNode(skill)
        skillElement.appendChild(skillElementText)
        skillsList.appendChild(skillElement)
    }

    skillsDiv.appendChild(skillsTitleElement)
    skillsDiv.appendChild(skillsList)

    return skillsDiv
}

function createPreferredJobDetails(employee){
    let prefJobDetailsDiv = document.createElement("div");

    let prefJobDetailsTitleElement = document.createElement("h1");
    let prefJobDetailsTitleElementText = document.createTextNode("Preferred Job Details")
    prefJobDetailsTitleElement.appendChild(prefJobDetailsTitleElementText)

    prefJobDetailsDiv.setAttribute("id", "prefJobDetailsDivs")

    let prefJobDetailsList = document.createElement("ul");

    let tempPrefJobDetailsArr = employee.preferred_job_details.flatMap(function(prefJobDetail){
        return prefJobDetail
    })

    let uniquePrefJobDetails = [...new Set(tempPrefJobDetailsArr)];

    for(let jobDetail of uniquePrefJobDetails){
        let prefJobElement = document.createElement("li");
        let prefJobElementText = document.createTextNode(jobDetail)
        prefJobElement.appendChild(prefJobElementText)
        prefJobDetailsList.appendChild(prefJobElement)
    }

    prefJobDetailsDiv.appendChild(prefJobDetailsTitleElement)
    prefJobDetailsDiv.appendChild(prefJobDetailsList)

    return prefJobDetailsDiv
}

async function getEmployeesArray(){
    const getRequest = await axios.get('http://localhost:3000/api/employee/all')

    return getRequest.data
}