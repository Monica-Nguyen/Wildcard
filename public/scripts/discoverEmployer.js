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
    let matchDiv = createMatch(company)

    companyAndMatchDiv.setAttribute("id", "companyAndMatch")

    companyAndMatchDiv.appendChild(companyTitleDiv)
    companyAndMatchDiv.appendChild(createCompanyLogoDiv)
    companyAndMatchDiv.appendChild(matchDiv)

    return companyAndMatchDiv
}

function createMatch(company){
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
    hiddenAcceptField.setAttribute("value", company._id)

    hiddenDeclineField.setAttribute("type", "hidden")
    hiddenDeclineField.setAttribute("name", "id")
    hiddenDeclineField.setAttribute("value", company._id)

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

