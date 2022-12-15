const express = require('express');
const router = express.Router()
const Employee = require('../model/employee');
const Employer = require('../model/employer')
const Job = require('../model/job')
const Match = require('../model/match')
const Messages = require('../model/message')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const User = require('../model/user')

module.exports = router;

router.post('/create/:id',  jsonParser, async (req, res) => {
    const data = new Messages({
        author: req.body.name,
        message_body: req.body.message_body,
        date_added: Date.now(),
    })

    const dataToSave = await data.save();

    Match.findById(req.params.id, function(error, match) {
        if (error) {
            res.status(400).json({message: error.message})
        }
        else {
            match.message_history.push(data);
            match.save();
            res.status(200).json(dataToSave)
        }
    });
})

router.get('/all/:id', async (req, res) => {
    try{
        Match.findById(req.params.id, async function (error, match) {
            if (error) {
                res.status(400).json({message: error.message})
            } else {
                let history = []
                for (let i = 0; i < match.message_history.length; i++) {
                    history.push(await Messages.findOne({_id: match.message_history[i]}))
                }
                res.json({'message_history': history})
            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//method to get all matches for a user
router.get('/matches_user/all/', async (req, res) => {
    try {
        let matches = {}
        let employee = await Employee.findOne({"user": req.user._id});
        let employer = await Employer.findOne({"user": req.user._id});
        if (employee != null) {
            if (employee.length !== 0){
                matches = employee.matches;
            }
        }
        else if (employer != null) {
            if (employer.length !== 0){
                matches = employer.matches;
            }
        }
        res.json(matches);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//method to get all matches for a user
// router.get('/match-info/:id', async (req, res) => {
//     try {
//         let user = await User.find({username: req.user.username});
//         user = user[0];
//         console.log(user._id);
//         let employee_result = await Employee.aggregate([
//             {"$match": {"user": user._id}},
//         ]);
//         let employer_result = await Employer.aggregate([
//             {"$match": {"user": user._id}},
//         ]);
//         let match = await Match.findById(req.params.id);
//         let employee = await Employee.findById(match.employee);
//         let employer = await Employer.findById(match.employer);
//         let current_user = "";
//         let current_role = "";
//         let current_position = "";
//         console.log(employer_result);
//         console.log(employer_result);
//         if (employee_result.length > 0) {
//             current_user = employee.name;
//             current_role = 'Employee';
//             current_position = employee.current_position;
//         }
//         if (employer_result.length > 0) {
//             current_user = employer.company_name;
//             current_role = 'Employer';
//         }
//         let match_info = {
//             "current_user": current_user,
//             "current_role": current_role,
//             "current_position": current_position,
//             "employer": employer.company_name,
//             "employee": employee.name
//         }
//         res.json(match_info);
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

router.get('/employee/current/', async (req, res) => {
    try {
        let employee = await Employee.findOne({"user": req.user._id});
        res.json(employee);
    }
    catch(error){
        res.status(500).json({message: req.user})
    }
})

router.get('/employer/current/', async (req, res) => {
    try {
        let employee = await Employer.findOne({"user": req.user._id});
        res.json(employee);
    }
    catch(error){
        res.status(500).json({message: req.user})
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        let user = await User.findOne({"_id": req.user._id});
        let match = await Match.findOne({"_id": req.params.id});
        let employee = await Employee.findOne({"_id": match.employee});
        let employer = await Employer.findOne({"_id": match.employer});
        let username = user.name;
        let matchname = "";
        console.log(employee.name);
        console.log(employer.name);
        console.log((username == employee.name));
        if (username == employee.name) {
            matchname = employer.company_name;
        }
        else {
            matchname = employee.name;
        }
        let userInfo = {
            "user": username,
            "match": matchname
        }

        res.json(userInfo);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
