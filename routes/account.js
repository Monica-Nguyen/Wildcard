const express = require('express');
const router = express.Router()
const Employee = require('../model/employee');
const Employer = require('../model/employer')
const Job = require('../model/job')
const bodyParser = require("body-parser");
const connectEnsureLogin = require("connect-ensure-login");
const jsonParser = bodyParser.json();

module.exports = router;

router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    // if user does not have a profile type set up they should create account
    res.render('create_account');
    //else they can proceed to their profile page
});

router.get('/employer-form/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    // if user does not have a profile type set up they should create account
    res.render('employer_form');
    //else they can proceed to their profile page
});

router.get('/employee-form/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    // if user does not have a profile type set up they should create account
    res.render('employee_form');
    //else they can proceed to their profile page
});