const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const api = require('../routes/api.js');
const axios = require('axios');
const matches = require('../model/match.js')(mongoose);

/* GET home page. */
router.get('/', async function(req, res, next) {
  // const skillsArray = []

  // const companies = await getTitlesArray(await getJobsArray());

  // console.log(companies)

  res.render('discover')
  // res.render('discover', { 
  //   title: 'Discover', 
  //   companies: companies, 
  // });
});


router.get('/test', function(req, res, next) {

  const testInsert = new matches.matches({id: 1,});
  testInsert.save(function(err){
    if (err) {console.log(err);}
    else {console.log(testInsert);}

});
  res.redirect('/discover')
});

async function getJobsArray(){
  const getRequest = await axios.get('http://localhost:3000/api/employer/all')

  let newArray = getRequest.data.map(function(employer){
    return {"_id": employer._id, "jobs": employer.jobs}
  })

  return newArray
}

async function getTitlesArray(companies){
  return Promise.all(companies.map(async function(company){

    for(let i = 0; i < company.jobs.length; i++) {
      const getRequest = await axios.get('http://localhost:3000/api/job/' + company.jobs[i])
      company.jobs[i] = {'position_title' : getRequest.data[0].position_title, 'skills' : getRequest.data[0].skills}
    }
    return company
  })
  )
}

module.exports = router;
