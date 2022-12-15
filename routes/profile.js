const express = require('express');
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../model/user");
const Employee = require("../model/employee");
const Employer = require("../model/employer");
const router = express.Router();


router.get('/', connectEnsureLogin.ensureLoggedIn(), async function (req, res, next) {
    if (req.isAuthenticated()) {
        let employee = await Employee.findOne({"user": req.user._id});
        let employer = await Employer.findOne({"user": req.user._id});
        if (employee != null) {
            if (employee.length !== 0) {
                res.redirect('/profile/employee')
            }
        } else if (employer != null) {
            if (employer.length !== 0) {
                res.redirect('/profile/employer')
            }
        } else {
            res.redirect('account/')
        }
    } else {
        res.render('login.ejs', {})
    }
});

router.get('/employer/', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {

    res.render('employer')

});


router.get('/employee/', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
   
    res.render('employee')

});

router.get('/employer/', connectEnsureLogin.ensureLoggedIn(), function(req, res, next) {
   
    res.render('employer')

});




module.exports = router;

  
