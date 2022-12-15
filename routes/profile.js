const express = require('express');
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../model/user");
const Employee = require("../model/employee");
const Employer = require("../model/employer");
const router = express.Router();


router.get('/employee/', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
   
    res.render('employee')

});

router.get('/employer/', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
   
    res.render('employer')

});




module.exports = router;

  
