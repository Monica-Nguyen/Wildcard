const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const matches = require('../models/Matches.js')(mongoose);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {})
});





module.exports = router;
