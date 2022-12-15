let person;
let personID;
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

async function checkEmployeeDetails() {
    let personData;
    let response = await fetch(`http://localhost:3000/api/employee/`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    }).then(async function (response) {
        personData = await response.json();
        if (personData != null) {
            //Check if returned company exists
            person = personData;
            personID = personData["_id"];
            prefillFormFields();
        }
        else {
            addPersonFormFields(true);
        }

    })
}

function addPersonFormFields(is_new) {
    let personSpace = document.getElementById("person-space-fill");
    let personForm =
        `
        <div class="card-space"></div>
        <div class="flex-container">
            <label class="form-label">Name</label>
            <div style="width: 600px" id="employee-name" class="input-group">
                <input id="employee-name-input" type="text" class="form-control">
            </div>
            <div class="error-validation" id="name-error"></div>
            <div class="card-space"></div>
            <div id="current_position-title" class="employee-form-fields">
                <label class="form-label">Current Position Title</label>
                <input style="width: 600px" type="position-title" class="form-control" id="current-title-input">
            </div>
            <div id="current_position-level" class="job-form-fields">
                <label class="form-label">Position Level</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="current_position_level" value="Intern" id="intern" checked/>
                    <label class="form-check-label" for="intern"> Intern </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="current_position_level" value="Junior" id="junior"/>
                    <label class="form-check-label" for="junior"> Junior </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="current_position_level" value="Intermediate" id="intermediate"/>
                    <label class="form-check-label" for="intermediate"> Intermediate </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="current_position_level" value="Senior" id="senior"/>
                    <label class="form-check-label" for="senior"> Senior </label>
                </div>
            </div>
            <div id="desired_position-title" class="employee-form-fields">
                <label class="form-label">Desired Position Title</label>
                <input style="width: 600px" type="position-title" class="form-control" id="desired-title-input">
            </div>
            <div id="desired_position-level" class="job-form-fields">
                <label class="form-label">Desired Position Level</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="desired_position_level" value="Intern" id="d_intern" checked/>
                    <label class="form-check-label" for="intern"> Intern </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="desired_position_level" value="Junior" id="d_junior"/>
                    <label class="form-check-label" for="junior"> Junior </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="desired_position_level" value="Intermediate" id="d_intermediate"/>
                    <label class="form-check-label" for="intermediate"> Intermediate </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="desired_position_level" value="Senior" id="d_senior"/>
                    <label class="form-check-label" for="senior"> Senior </label>
                </div>
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
                <label class="form-label">Add Preferred Job Details (optional)</label>
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
        `;

    if (is_new){
        personForm += getEmployeeCreateSaveButton();
    }
    else {
        personForm += getEmployeeEditSaveButton();
    }
    personSpace.innerHTML = personForm;
    let tomSkills = new TomSelect("#select-tags-skills", opts);
    let tomDetails = new TomSelect("#select-tags-details", opts);

    if (person){
        if (person["skills"].length > 0 ) {
            for (let i=0; i <person["skills"].length; i++){
                tomSkills.addItem(person["skills"][i]);
            }
        }

        if (person["preferred_job_details"].length > 0 ) {
            for (let i=0; i <person["preferred_job_details"].length; i++){
                tomDetails.addItem(person["preferred_job_details"][i]);
            }
        }
    }

}

function getEmployeeCreateSaveButton(){
    return `<span><button id="create-save-job" class="btn btn-primary" onclick="createPerson()" type="button"> Save </button><button style="margin-left: 10px;" id="create-save-job" class="btn btn-danger" onclick="clearJobSpace()" id="cancel-button" type="button"> Cancel </button></span></div>`
}

function getEmployeeEditSaveButton(){
    return `<span><button id="create-save-job" class="btn btn-primary" onclick="updatePerson()" type="button"> Save </button><button style="margin-left: 10px;" id="create-save-job" class="btn btn-danger" onclick="clearJobSpace()" id="cancel-button" type="button"> Cancel </button></span></div>`
}

function clearJobSpace(){
    document.getElementById("person-space-fill").innerHTML = "";
}

function prefillFormFields() {
    addPersonFormFields(false);
    document.getElementById("employee-name-input").value = person["name"];
    document.getElementById("current-title-input").value = person["current_position"];
    document.getElementById("desired-title-input").value = person["desired_position"];
    let $radios = $('input:radio[name=current_position_level]');
    let currentCheckedLevel = '[value='+person["current_level"]+']'
    $radios.filter(currentCheckedLevel).prop('checked', true);
    $radios = $('input:radio[name=desired_position_level]');
    let desiredCheckedLevel = '[value='+person["desired_level"]+']'
    $radios.filter(desiredCheckedLevel).prop('checked', true);
}

async function createPerson() {
    let personName = document.getElementById("employee-name-input").value;
    let currentPosition = document.getElementById("current-title-input").value;
    let desiredPosition = document.getElementById("desired-title-input").value;
    let currentPositionLevel = document.querySelector('input[name="current_position_level"]:checked').value;
    let desiredPositionLevel = document.querySelector('input[name="desired_position_level"]:checked').value;
    let skillItems = $('#select-tags-skills').val();
    let detailItems = $('#select-tags-details').val();
    if (personName == "") {
        document.getElementById("name-error").innerHTML = "Name cannot be blank";
    } else {
        let response = await fetch(`http://localhost:3000/api/employee/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                "name": personName,
                "current_position": currentPosition,
                "current_level": currentPositionLevel,
                "desired_position": desiredPosition,
                "desired_level": desiredPositionLevel,
                "skills": skillItems,
                "preferred_job_details": detailItems
            })
        });
        let data = await response.json();
        console.log(data);
        window.location.reload();
    }
}

async function updatePerson() {
    let personName = document.getElementById("employee-name-input").value;
    let currentPosition = document.getElementById("current-title-input").value;
    let desiredPosition = document.getElementById("desired-title-input").value;
    let currentPositionLevel = document.querySelector('input[name="current_position_level"]:checked').value;
    let desiredPositionLevel = document.querySelector('input[name="desired_position_level"]:checked').value;
    let skillItems = $('#select-tags-skills').val();
    let detailItems = $('#select-tags-details').val();
    if (personName == "") {
        document.getElementById("name-error").innerHTML = "Name cannot be blank";
    } else {
        let personURL = `http://localhost:3000/api/employee/` + personID
        let response = await fetch(personURL, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                "name": personName,
                "current_position": currentPosition,
                "current_level": currentPositionLevel,
                "desired_position": desiredPosition,
                "desired_level": desiredPositionLevel,
                "skills": skillItems,
                "preferred_job_details": detailItems
            })
        });
        let data = await response.json();
        console.log(data);
        window.location.replace('/')
    }
}