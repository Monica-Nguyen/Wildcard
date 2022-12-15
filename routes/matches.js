const express = require("express");
const connectEnsureLogin = require("connect-ensure-login");
const Match = require("../model/match");
const Employee = require("../model/employee");
const Employer = require("../model/employer");
const router = express.Router();

router.get("/", connectEnsureLogin.ensureLoggedIn(), function (req, res, next) {
  res.render("matches", {});
});

router.get('/getNames/:id', async (req, res) => {
  try {
    let match = await Match.findOne({"_id": req.params.id});
    let username = "";
    let employee = await Employee.findOne({"_id": match.employee._id})
    let employer = await Employer.findOne({"_id": match.employer._id})
    if (employee != null) {
      if (employee.length !== 0){
        username = employee.name;
      }
    }
    else if (employer != null) {
      if (employer.length !== 0){
        username = employer.company_name;
      }
    }
    let matcher = "";

    if (username == employee.name){
      matcher = employer.company_name;
    }
    else {
      matcher = employee.name;
    }

    let matchName = {
      "user": username,
      "employee": employee.name,
      "employer": employer.company_name,
      "match": matcher
    };

    res.json(matchName);
  }
  catch(error){
    res.status(500).json({message: req.user})
  }
})




module.exports = router;
