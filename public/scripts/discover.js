async function onLoad(){
    const companies = await getEmployerTitlesArray(await getEmployerJobsArray());

    createCarouselFrontEnd(companies)
}

function createCarouselFrontEnd(companies){
    let carouselDoc = document.getElementsByClassName('carousel-inner')[0]
    let carouselArr = []

    for(let i = 0; i < companies.length; i++){
        let carouselItemDiv = document.createElement("div");
        let mainDiscContentDiv = document.createElement("div");
        mainDiscContentDiv.setAttribute("id", "mainDiscContentDiv")

        console.log(companies[i])

        if(i == 0){
            console.log("first element")
            carouselItemDiv.setAttribute("class", "carousel-item active")
        } else{
            carouselItemDiv.setAttribute("class", "carousel-item")
        }

        let companyAndMatchDiv = createCompanyAndMatch(companies[i])
        let infoDiv = createInfo(companies[i])

        mainDiscContentDiv.appendChild(companyAndMatchDiv)
        mainDiscContentDiv.appendChild(infoDiv)

        carouselItemDiv.appendChild(mainDiscContentDiv)
        carouselArr.push(carouselItemDiv)
    }

    for(let carouselEl of carouselArr){
        carouselDoc.appendChild(carouselEl)
    }
}

function createCompanyAndMatch(company){
    let companyAndMatchDiv = document.createElement("div");

    let companyTitleDiv = createCompanyTitle(company)
    let createCompanyLogoDiv = createCompanyLogo(company)
    let matchDiv = createMatch()

    companyAndMatchDiv.setAttribute("id", "companyAndMatch")

    companyAndMatchDiv.appendChild(companyTitleDiv)
    companyAndMatchDiv.appendChild(createCompanyLogoDiv)
    companyAndMatchDiv.appendChild(matchDiv)

    return companyAndMatchDiv
}

function createMatch(){
    let matchDiv = document.createElement("div");

    let acceptLogo = document.createElement("span");
    let declineLogo = document.createElement("span");
    let acceptLogoText = document.createTextNode("check_circle")
    let declineLogoText = document.createTextNode("cancel")

    acceptLogo.setAttribute("class", "material-symbols-outlined")
    declineLogo.setAttribute("class", "material-symbols-outlined")

    acceptLogo.appendChild(acceptLogoText)
    declineLogo.appendChild(declineLogoText)

    let acceptAEl = document.createElement("a");
    let declineAEl = document.createElement("a");

    acceptAEl.setAttribute("href", "/api/discover/yes")
    declineAEl.setAttribute("href", "/api/discover/no")

    acceptAEl.appendChild(acceptLogo)
    declineAEl.appendChild(declineLogo)

    matchDiv.setAttribute("id", "match")

    matchDiv.appendChild(acceptAEl)
    matchDiv.appendChild(declineAEl)

    return matchDiv
}

function createCompanyTitle(company){
    let companyTitleDiv = document.createElement("div");
    companyTitleDiv.setAttribute("id", "companyTitle")

    let companyTitleElement = document.createElement("h1");
    let companyTitleElementText = document.createTextNode(company.company_name)
    companyTitleElement.appendChild(companyTitleElementText)
    companyTitleDiv.appendChild(companyTitleElement)

    return companyTitleDiv
}

function createCompanyLogo(company){
    let companyLogoDiv = document.createElement("div");
    companyLogoDiv.setAttribute("id", "companyLogo")

    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", "/images/" + company.company_name + ".png")
    companyLogoDiv.appendChild(logoImg)

    return companyLogoDiv
}

function createInfo(company){
    let infoDiv = document.createElement("div");

    let lookingDiv = createLooking(company)
    let skillsDiv = createSkills(company)

    infoDiv.setAttribute("id", "info")

    infoDiv.appendChild(lookingDiv)
    infoDiv.appendChild(skillsDiv)

    return infoDiv
}

function createLooking(company){
    let lookingDiv = document.createElement("div");
    
    let lookingTitleElement = document.createElement("h1");
    let lookingTitleElementText = document.createTextNode("Looking for")
    lookingTitleElement.appendChild(lookingTitleElementText)

    lookingDiv.setAttribute("id", "looking")

    let lookingList = document.createElement("ul");

    for(let job of company.jobs){
        let jobElement = document.createElement("li");
        let jobElementText = document.createTextNode(job.position_title)
        jobElement.appendChild(jobElementText)
        lookingList.appendChild(jobElement)
    }

    lookingDiv.appendChild(lookingTitleElement)
    lookingDiv.appendChild(lookingList)

    return lookingDiv
}

function createSkills(company){
    let skillsDiv = document.createElement("div");

    let skillsTitleElement = document.createElement("h1");
    let skillsTitleElementText = document.createTextNode("Skills")
    skillsTitleElement.appendChild(skillsTitleElementText)

    skillsDiv.setAttribute("id", "skillsDivs")

    let skillsList = document.createElement("ul");

    let tempSkillsArr = company.jobs.flatMap(function(job){
        return job.skills
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

async function getEmployerTitlesArray(companies){
    return Promise.all(companies.map(async function(company){

        for(let i = 0; i < company.jobs.length; i++) {
            const getRequest = await axios.get('http://localhost:3000/api/job/' + company.jobs[i])
            company.jobs[i] = {'position_title' : getRequest.data[0].position_title, 'skills' : getRequest.data[0].skills}
        }
        return company
    })
    )
}

async function getEmployerJobsArray(){
    const getRequest = await axios.get('http://localhost:3000/api/employer/all')

    let newArray = getRequest.data.map(function(employer){
        return {"company_name": employer.company_name, "_id": employer._id, "jobs": employer.jobs}
    })

    return newArray
}

async function getEmployeeTitlesArray(){
    const getRequest = await axios.get('http://localhost:3000/api/employee/all')

    let newArray = getRequest.data.map(function(employee){
        return {"company_name": employee.company_name, "_id": employee._id, "jobs": employee.jobs}
    })

    return newArray
}

async function getEmployeeJobsArray(){
    const getRequest = await axios.get('http://localhost:3000/api/employee/all')

    let newArray = getRequest.data.map(function(employee){
        return {"company_name": employee.company_name, "_id": employee._id, "jobs": employee.jobs}
    })

    return newArray
}