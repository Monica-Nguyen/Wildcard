const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const Employee = require('../model/employee');
const Employer = require('../model/employer')
const Job = require('../model/job')
const Match = require('../model/match')
const bodyParser = require("body-parser");
const User = require("../model/user");
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const connectEnsureLogin = require("connect-ensure-login");
const match = require('../model/match');

module.exports = router;

// ********* EMPLOYEE METHODS ***************//
// POST method to create an employee
router.post('/employee/create',  jsonParser, async (req, res) => {
    let user = await User.find({username:req.session.passport.user});
    user = user[0];
    const data = new Employee({
        name: req.body.name,
        current_position: req.body.current_position,
        current_level: req.body.current_level,
        desired_position: req.body.desired_position,
        desired_level: req.body.desired_level,
        skills: req.body.skills,
        preferred_job_details: req.body.preferred_job_details,
        user: user
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// GET method to get logged in Employees
router.get('/employee/', async (req, res) => {
    try{
        let employee = await Employee.findOne({"user": req.user._id});
        res.json(employee)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET method to get all Employees
router.get('/employee/all', async (req, res) => {
    try{
        const data = await Employee.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET method to get a specific employee
router.get('/employee/:id', async (req, res) => {
    try{
        const data = await Employee.find({_id:req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// PATCH method to update a specific employee
router.patch('/employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Employee.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// ********* EMPLOYER METHODS ***************//
// POST method to create Employer
router.post('/employer/create',  jsonParser, async (req, res) => {
    let user = await User.find({username:req.session.passport.user})
    user = user[0]
    const data = new Employer({
        company_name: req.body.company_name,
        user: user
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


// GET method to get logged in Employer
router.get('/employer/', async (req, res) => {
    try{
        let employee = await Employer.findOne({"user": req.user._id});
        res.json(employee)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET method to get all employers
router.get('/employer/all', async (req, res) => {
    try{
        const data = await Employer.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET method to get a specific employer
router.get('/employer/:id', async (req, res) => {
    try{
        const data = await Employer.find({_id:req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// ********* JOB METHODS ***************//
// POST method to create Job
router.post('/job/create',  jsonParser, async (req, res) => {
    const data = new Job({
        company_name: req.body.company_name,
        position_title: req.body.position_title,
        position_level: req.body.position_level,
        can_coach: req.body.can_coach,
        skills: req.body.skills,
        is_active: req.body.is_active,
        job_details: req.body.job_details,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// GET method to get all jobs
router.get('/job/all', async (req, res) => {
    try{
        const data = await Job.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// GET method to get a specific job
router.get('/job/:id', async (req, res) => {
    try{
        const data = await Job.find({_id:req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// PATCH method to update a specific job
router.patch('/job/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Job.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// POST to create a job for a specific company
router.post('/job/company',  jsonParser, async (req, res) => {
    const data = new Job({
        company_name: req.body.company_name,
        position_title: req.body.position_title,
        position_level: req.body.position_level,
        can_coach: req.body.can_coach,
        skills: req.body.skills,
        is_active: req.body.is_active,
        job_details: req.body.job_details,
    });
    try {
        const dataToSave = await data.save();

        Employer.findOne({ company_name: req.body.company_name }, function(error, employer) {
            if (error) {
                res.status(400).json({message: error.message})
            }
            else {
                employer.jobs.push(data);
                employer.save();
                res.status(200).json(dataToSave)
            }
        });
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//************************USER*****************************//

// create User
router.post('/user/create', jsonParser,  async (req, res) => {
    console.log(req.body);
    User.findOne({"username": req.body.username}, async function (error, user) {
        console.log(user);
        if (user){
            res.status(400).json({message: 'Username exists'})
        }
        else if (error) {
            res.status(400).json({message: error.message})
        }
        else {
            const data = new User({
                username: req.body.username,
                password: req.body.password,
            });
            try {
                const dataToSave = await data.save();
                res.status(200).json(dataToSave)
            } catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    });

})

//check if a user with email and pass exists
router.post('/user/exist', jsonParser,  async (req, res) => {
    User.findOne({"email": req.body.email}, function(error, exist) {

        console.log("req is :" ,exist)
        if(exist && !error){

            res.status(200).send({"email_given": req.body.email, "bool" : 1, "message" : "DOES EXIST"})

            if (exist.password == req.body.password){

                console.log("password is correct")
                // res.redirect('/')
            }else{

                console.log("password is wrong")
            }

        }else if (!exist && !error){

            res.status(200).send({"email_given" : req.body.email , "res" : 0 ,  "message" : "DOESNT EXIST"})
        }else {
        //IF YOU ARE USING EXPRESS.JS, YOU MUST USE RES.SEND() or RES.END() TO TERMINATE THE CONNECTION
        res.status(500).send({"ERROR" : "Not Found"});
        return;
        }
    })});



//check if a user with email and pass exists
router.post('/user/exist', jsonParser,  async (req, res) => {
    User.findOne({"email": req.body.email}, function(error, exist) {

        console.log("req is :" ,exist)
        if(exist && !error){

            res.status(200).send({"email_given": req.body.email, "bool" : 1, "message" : "DOES EXIST"})

            if (exist.password == req.body.password){

                console.log("password is correct")
                // res.redirect('/')
            }else{

                console.log("password is wrong")
            }

        }else if (!exist && !error){

            res.status(200).send({"email_given" : req.body.email , "res" : 0 ,  "message" : "DOESNT EXIST"})
        }else {
        //IF YOU ARE USING EXPRESS.JS, YOU MUST USE RES.SEND() or RES.END() TO TERMINATE THE CONNECTION
        res.status(500).send({"ERROR" : "Not Found"});
        return;
        }
    })});

router.get('/user/all', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/user/:id', async (req, res) => {
    try{
        let data = await User.find({_id: req.params.id});
        data = data[0];
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// router.get('/user/:username', async (req, res) => {
//     try{
//         let data = await User.find({username: req.params.username});
//         data = data[0];
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })



router.post('/discover/yes', jsonParser, async(req, res) => {
    console.log("yes")
    //make hardcoded matches
    let hardCoded = false;

    if(hardCoded){
        let user = await User.find({username:req.session.passport.username})
        console.log(user)
        // const data = await Employee.findOne({_id : req.body.id});

        // let employer = {};
        // let employee = {};

        // if(data == undefined || data == null){ //employee clicking yes so randomize employee user
        //     const employees = await Employee.find();
        //     const randomEmployeeIndex = Math.floor(Math.random() * employees.length)

        //     employee = employees[randomEmployeeIndex]
        //     employer = await Employer.findOne({_id : req.body.id});
        //     console.log(employer)
        // } else { //employer clicking yes so randomize employer user
        //     const employers = await Employer.find();
        //     const randomEmployerIndex = Math.floor(Math.random() * employers.length)

        //     employer = employers[randomEmployerIndex]
        //     employee = data
        // }

        //make match object
        //save it
        //update employee/employeer

        // let newMatch = new Match({
        //     employee : employee._id,
        //     employer : employer._id
        // })

        try {
            // employee.matches.push(newMatch._id)
            // employer.matches.push(newMatch._id)

            // const dataToSave = await newMatch.save();
            // const updateEmployee = await Employee.findByIdAndUpdate(employee._id, employee, { new: true })
            // const updateEmployer = await Employee.findByIdAndUpdate(employer._id, employer, { new: true })

            //res.status(200).json(dataToSave)

            // res.redirect("/discover")
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    } else {
        // console.log(req._passport.instance)
        // let user = await User.find({username:req.session.passport.username})
        // console.log(user)

        if(req.user != undefined){
            console.log(req.user)
            let employee = await Employee.findOne({"user": req.user._id});
            let employer = await Employer.findOne({_id : req.body.id});

            console.log(employee)

            if(employee == null){
                console.log("isEmployer")

                employer = await Employer.findOne({"user": req.user._id});
                employee = await Employee.findOne({_id : req.body.id});
            }
            
            //make match object
            //save it
            //update employee/employeer

            console.log("employee: "+ employee)
            console.log("employer: " + employer)

            let newMatch = new Match({
                employee : employee._id,
                employer : employer._id
            })

            try {
                employee.matches.push(newMatch._id)
                employer.matches.push(newMatch._id)

                const dataToSave = await newMatch.save();
                const updateEmployee = await Employee.findByIdAndUpdate(employee._id, employee, { new: true })
                const updateEmployer = await Employer.findByIdAndUpdate(employer._id, employer, { new: true })

                // res.status(200).json(dataToSave)

                res.redirect("/discover")
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        } else {
            res.redirect("/")
        }
    }

});

router.post('/discover/no', async(req, res) => {
    console.log("no")
    res.redirect("/discover")
});

//get matches for user
router.get('/match/:id', async (req, res) => {

    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
