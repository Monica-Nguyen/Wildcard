let totalJobs;
let company;
let companyID;
let companyJobs = [];
let jobID;
const opts = {
    plugins: ['remove_button'],
    create: true,
    onItemAdd:function(){
        this.setTextboxValue('');
        this.refreshOptions();
    },
    render:{
        option:function(data,escape){
            return '<div class="d-flex"><span>' + escape(data.value) + '</span><span class="ms-auto text-muted"></span></div>';
        },
        item:function(data,escape){
            return '<div>' + escape(data.value) + '</div>';
        }
    }
}

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
            totalJobs = jobs;
            await getJobTitles();
            addJobCreateOptions();
        }
    })
}

async function getJobTitles() {
    let title;
    let level;
    if (totalJobs.length > 0) {
        let jobsInfo = `<div class="mb-3"><h5 class="form-headers">Current Jobs</h5></div>`;
        for (let i = 0; i<totalJobs.length; i++) {
            let job = await getJobTitle(totalJobs[i]);
            companyJobs.push(job);
            title = job[0]['position_title'];
            level = job[0]['position_level'];
            jobsInfo += `<span class="input-group-btn"><div>${title} : ${level}<button class="btn" id="${i}" onclick="editJob(this.id)"><span class="material-symbols-outlined">edit</span></button></div></span>`;
        }
        document.getElementById('job-list').innerHTML = jobsInfo;
    }
}

async function getJobTitle(job) {
    let jobURL = 'http://localhost:3000/api/job/' + job
    let response = await fetch(jobURL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });
    return await response.json();
}

function addJobCreateOptions() {
    let companyOption = document.getElementById('company-option');
    let newOptions =
        `
        <div class="card-space"></div>
        <div class="mb-3">
            <h5 class="form-headers">Add Jobs to your Employee Profile</h5>
        </div>
        <div id="current-jobs"></div>
        <div class="mb-3">
            <button class="btn" onclick="addNewJobs(true)"><span class="material-symbols-outlined">add_circle</span></button> Add Job </div>
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

async function addNewJobs(is_new, skills=null, details=null) {
    let jobSpaceForm =
        `
        <div class="card-space"></div>
        <div class="flex-container">
            <div id="position_title" class="job-form-fields">
                <label class="form-label">Position Title</label>
                <input style="width: 600px" type="position-title" class="form-control" id="position-title-input">
                <div class="error-validation" id="position-error"></div>
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
            <div id="can_coach" class="job-form-fields">
                <label class="form-label">Can coach candidate</label>
                <input class="form-check-input" type="radio" name="can_coach" value="Yes" id="Yes" checked/>
                <label class="form-check-label" for="Yes"> Yes </label>
                <input class="form-check-input" type="radio" name="can_coach" value="No" id="No"/>
                <label class="form-check-label" for="No"> No </label>
            </div>
            <div class="container">
                <div class="card-space"></div>
                <label class="form-label">Add Skills</label>
                <div class="row">
                    <div class="p-4">
                        <select style="width: 600px" id="select-tags-skills" multiple>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="React">React</option>
                            <option value="Angular">Angular</option>
                            <option value="Node">Node</option>
                            <option value="AWS">AWS</option>
                            <option value="Azure">AWS</option>
                            <option value="Docker">Docker</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="card-space"></div>
                <label class="form-label">Add Job Details (optional)</label>
                <div class="row">
                    <div class="p-4">
                        <select style="width: 600px" id="select-tags-details" multiple>
                            <option value="Agile">Agile</option>
                            <option value="Scrum">Scrum</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Flexible">Flexible</option>
                            <option value="Waterfall">Waterfall</option>
                            <option value="Six Sigma">Six Sigma</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-space"></div>
        `
        if (is_new){
            jobSpaceForm += getJobCreateSaveButton();
        }
        else {
            jobSpaceForm += getJobEditSaveButton();
        }
    document.getElementById("job-space-fill").innerHTML = jobSpaceForm;
    let tomSkills = new TomSelect("#select-tags-skills", opts);
    let tomDetails = new TomSelect("#select-tags-details", opts);

    if (skills.length > 0 ) {
        for (let i=0; i <skills.length; i++){
            tomSkills.addItem(skills[i]);
        }
    }
    console.log(details);

    if (details.length > 0 ) {
        for (let i=0; i <details.length; i++){
            tomDetails.addItem(details[i]);
        }
    }

}

function getJobCreateSaveButton(){
    return `<span><button id="create-save-job" class="btn btn-primary" onclick="createJob()" type="button"> Save </button><button style="margin-left: 10px;" id="create-save-job" class="btn btn-danger" onclick="clearJobSpace()" id="cancel-button" type="button"> Cancel </button></span></div>`
}

function getJobEditSaveButton(){
    return `<span><button id="create-save-job" class="btn btn-primary" onclick="updateJob()" type="button"> Save </button><button style="margin-left: 10px;" id="create-save-job" class="btn btn-danger" onclick="clearJobSpace()" id="cancel-button" type="button"> Cancel </button></span></div>`
}

function clearJobSpace(){
    document.getElementById("job-space-fill").innerHTML = "";
}

async function createJob() {
    let positionTitle = $('#position-title-input').val();
    if (positionTitle == "") {
        document.getElementById("position-error").innerHTML = "Position Title cannot be blank";
    }
    else{
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
                "job_details": detailItems
            })
        });
        let data = await response.json();
        window.location.reload();
    }
}

function editJob(ID) {
    let selectJob = companyJobs[ID][0];
    let coachValue;
    console.log(selectJob);
    jobID = selectJob['_id'];
    console.log(jobID);
    addNewJobs(false, selectJob["skills"], selectJob["job_details"]);
    document.getElementById('position-title-input').value = selectJob["position_title"];
    let $radios = $('input:radio[name=position_level]');
    let checkedLevel = '[value='+selectJob["position_level"]+']'
    $radios.filter(checkedLevel).prop('checked', true);
    $radios = $('input:radio[name=can_coach]');
    if (selectJob["can_coach"] == true){
        coachValue = 'Yes';
    }
    else {
        coachValue = 'No';
    }
    let checkedCoach = '[value='+coachValue+']'
    $radios.filter(checkedCoach).prop('checked', true);
}

async function updateJob() {
    let positionTitle = $('#position-title-input').val();
    if (positionTitle == "") {
        document.getElementById("position-error").innerHTML = "Position Title cannot be blank";
    }
    else{
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
        let jobURL = 'http://localhost:3000/api/job/' + jobID
        let response = await fetch(jobURL, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "position_title": positionTitle,
                "position_level": positionLevel,
                "can_coach": canCoach,
                "is_active": true,
                "skills": skillItems,
                "job_details": detailItems
            })
        });
        let data = await response.json();
        window.location.reload();
    }
}