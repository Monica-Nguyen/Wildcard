const express = require('express');
const router = express.Router();


router.get('/employee', function(req, res, next) {
   
    res.render('employee')

});

router.get('/employer', function(req, res, next) {
   
    res.render('employer')

});




module.exports = router;

  
