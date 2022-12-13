const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const Employee = require('../model/employee');
const Employer = require('../model/employer')
const Job = require('../model/job')
const bodyParser = require("body-parser");
const User = require("../model/user");
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');

module.exports = router;

// ********* EMPLOYEE METHODS ***************//
// POST method to create an employee
router.post('/employee/create',  jsonParser, async (req, res) => {
    const data = new Employee({
        name: req.body.name,
        current_position: req.body.current_position,
        current_level: req.body.current_level,
        desired_position: req.body.desired_position,
        desired_level: req.body.desired_level,
        skills: req.body.skills,
        preferred_job_details: req.body.preferred_job_details
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
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
    const data = new Employer({
        company_name: req.body.company_name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
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
        job_details: req.body.job_details
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
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
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



    router.get('/user/all', async (req, res) => {
        try{
            const data = await User.find();
            res.json(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
    