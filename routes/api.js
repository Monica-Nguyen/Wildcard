const express = require('express');
const router = express.Router()
const Employee = require('../model/employee');
const Employer = require('../model/employer')
const Job = require('../model/job')
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

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
        job_details: req.body.job_details
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
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

// GET method to create Job
router.get('/job/all',  jsonParser, async (req, res) => {
    try{
        const data = await Job.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})