let totalJobs;
let company;
let companyID;

async function checkJobDetails() {
    let companyData;
    let response = await fetch(`http://localhost:3000/api/employer/639536d30c255e80dadd4fe1`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    }).then(async function (response) {
        if (response.status == 200) {
            companyData = await response.json();
            document.getElementById("create-save-button").style.display = "none";
            let jobSpace = document.getElementById("current-jobs");
            //Check if returned company exists
            company = companyData[0]["company_name"];
            companyID = companyData[0]["_id"];
            let jobs = companyData[0]["jobs"];
            if (jobs) {
                totalJobs = jobs;
                //TODO MAKE JOB SECTION AND PREFILL NAME
            }
            addJobCreateOptions();
        }
    })
}

function addJobCreateOptions() {
    let companyOption = document.getElementById('company-option');
    let newOptions =
        `
        <div class="mb-3">
            <p>Add Jobs to your Employee Profile</p>
        </div>
        <div id="current-jobs"></div>
        <div class="mb-3">
            <button class="btn" onclick="addNewJobs()"><span class="material-symbols-outlined">add_circle</span></button> Add Job
        </div>
        `
    companyOption.innerHTML += newOptions;
    document.getElementById("company-name-input").placeholder = company;
}

async function createCompany() {
    let companyName = document.getElementById("company-name-input").value;
    if (companyName == "") {
        document.getElementById("name-error").innerHTML = "Name cannot be blank";
    } else {
        let saveStatus = document.getElementById("save-status");
        saveStatus.innerHTML =
            `
        <button id="create-save-button">
          <i class="fa fa-spinner fa-spin"></i>Saving
        </button>
        `;
        let response = await fetch(`http://localhost:3000/api/employer/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"company_name": companyName})
        });
        let data = await response.json();
        company = data["company_name"];
        companyID = data["_id"];
        saveStatus.innerHTML =
            `
            <span id="success-check-icon" class="material-symbols-outlined">check_circle</span>
            `;
        addJobCreateOptions();
    }
}

async function addNewJobs() {
    let allSkills = await getSkillDetailSelect();
    let skillSelect = document.getElementById("select-tags-skills");
    for (let i = 0; i < allSkills.skills.length; i++) {
        let opt = document.createElement('option');
        opt.value = allSkills.skills[i];
        opt.innerHTML = allSkills.skills[i];
        skillSelect.appendChild(opt);
    };
}

async function createJob() {
    let positionTitle = $('#position-title-input').val();
    let positionLevel = document.querySelector('input[name="position_level"]:checked').value;
    let canCoach = document.querySelector('input[name="can_coach"]:checked').value;
    let skillItems = $('#select-tags-skills').val();
    let detailItems = $('#select-tags-details').val();
    if (canCoach == 'Yes'){
        canCoach = true;
    }
    else {
        canCoach = false;
    }
    let jobURL = 'http://localhost:3000/api/job/company'
    let response = await fetch(jobURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "company_name": company,
            "position_title": positionTitle,
            "position_level": positionLevel,
            "can_coach": canCoach,
            "is_active": true,
            "skills": skillItems,
            "preferred_job_details": detailItems
        })
    });
    let data = await response.json();
    console.log(data);
}