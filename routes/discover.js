const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const matches = require('../models/Matches.js')(mongoose);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('discover', { 
    title: 'Discover', 
    companyTitle: 'Apple', 
    jobRoles: 'Pie, Cake, Cheese',
  });
});

router.get('/yes', function(req, res, next) {
  console.log("yes")
  res.redirect("/discover")
});

router.get('/no', function(req, res, next) {
  console.log("no")
  res.redirect("/discover")
});


router.get('/test', function(req, res, next) {

  const testInsert = new matches.matches({id: 1,});
  testInsert.save(function(err){
    if (err) {console.log(err);}
    else {console.log(testInsert);}

});
  res.redirect('/discover')
});


module.exports = router;
