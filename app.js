require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api= require('./routes/api');
const login = require("./routes/login")
const signup = require("./routes/signup")
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const mongoString = process.env.DATABASE_URL;
const database = mongoose.connection;
const app = express();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
const session = require('express-session');
const user = require('./model/user');
const request = require('request');
const {response} = require("express");

//Start connection to database and log status to console
mongoose.connect(mongoString);
database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Set up session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    })
);


app.use('/api', api)
app.use('/',login)
app.use('/user', user)
app.use("/signup",signup)

app.get('/', function(req, res, next) {
    res.render('login', {})
});

app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
    res.send(req.session)
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// POST Routes
app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/secret',
    }),
    (req, res) => {
      console.log(req.user);
    }
);

app.post("/register", async (req, res) => {

    let apiURL = 'http://localhost:3000/api/user/create';

    const requestOptions = {
        url: apiURL,
        method: 'POST',
        json: {
            username: req.body.username,
            password: req.body.password,
        }
    };
    request(requestOptions, (err, response, body) => {
        console.error('error:', err); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('responseMessage:', response.body.message)
        if (response.statusCode != 200){
            res.render('signup', {error: response.body.message})
        }
        else {
            res.redirect('/login')
        }
    });

});

module.exports = app;