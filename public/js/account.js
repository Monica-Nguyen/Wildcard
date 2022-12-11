let totalJobs;
let company;
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
    }
    else {
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
        saveStatus.innerHTML =
            `
            <span id="success-check-icon" class="material-symbols-outlined">check_circle</span>
            `;
        addJobCreateOptions();
    }
}

async function getJobsByCompany() {
    let response = await fetch(`http://localhost:3000/api/employer/63916a47b4dca73b9a7e913b`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    }).then(function (response) {
        if (response.ok) {
            data = response.json();
        }
        else {

        }
    })
}

async function addNewJobs() {
    let allSkills = await getSkillDetailSelect();
    let jobSpace = document.getElementById("job-container");
    let jobForm =
        `
        <div class="account-form">
           <div id="position_title" class="job-form-fields">
                <label class="form-label">Position Title</label>
                <input type="position-title" class="form-control" id="position-title-input">
            </div>
           <div id="position_level" class="job-form-fields">
                <label class="form-label">Position Level</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="position_level" value="Intern" id="intern" checked/>
                  <label class="form-check-label" for="intern"> Intern </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="position_level" value="Junior" id="junior"/>
                  <label class="form-check-label" for="junior"> Junior </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="position_level" value="Intermediate" id="intermediate"/>
                  <label class="form-check-label" for="intermediate"> Intermediate </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="position_level" value="Senior" id="senior"/>
                  <label class="form-check-label" for="senior"> Senior </label>
                </div>
           </div>
           <div id="position_title" class="job-form-fields">
                <input class="form-check-input" type="radio" name="can_coach" value="Yes" id="Yes" checked/>
                <label class="form-check-label" for="Yes"> Yes </label>
                <input class="form-check-input" type="radio" name="can_coach" value="No" id="No"/>
                <label class="form-check-label" for="No"> No </label>
           </div>
        `;

    let skillSelect =
        `
        <div id="skill-selection" class="job-form-fields"><label class="form-label">Skills</label>
        <div class="row-fluid"><select class="selectpicker" data-show-subtext="true" data-live-search="true">
        `;
    allSkills.skills.forEach((skill, i) =>
        skillSelect += `<option data-tokens="${skill}">${skill}</option>`
    );
    skillSelect += `</select></div></div></div>`;
    let detailSelect =
        `
        <div id="detail-selection" class="job-form-fields"><label class="form-label">Job Details</label>
        <div class="row-fluid"><select class="selectpicker" data-show-subtext="true" data-live-search="true">
        `;
    allSkills.details.forEach((detail, i) =>
        detailSelect += `<option data-tokens="${detail}">${detail}</option>`
    );
    detailSelect += `</select></div></div></div>`;
    jobForm += skillSelect;
    jobForm += detailSelect;
    jobSpace.innerHTML = jobForm;
}

$(function() {
    $('.selectpicker').selectpicker();
});

async function getSkillDetailSelect() {
    let response = await fetch(`http://localhost:3000/api/options/all`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });
    return await response.json();
}