const express = require('express');
const router = express.Router();

router.get('/test', function(req, res, next) {
   
    res.render('test')

});

router.get('/employee', function(req, res, next) {
   
    res.render('employee')

});

router.get('/employer', function(req, res, next) {
   
    res.render('employer')

});




module.exports = router;

  
