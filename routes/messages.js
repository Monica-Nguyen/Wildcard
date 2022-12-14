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
    let user = await User.find({username: req.user.username});
    user = user[0];
    let data = await Employee.aggregate([
            { "$match": { "user": user._id } },
        ]);
    data = data[0]
    res.json(data);
})
