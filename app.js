require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api = require('./routes/api');
const account = require('./routes/account')
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
const $ = require( "jquery" );
const cons = require('consolidate');
const indexRouter = require('./routes/index');
const discoverRouter = require('./routes/discover');
const chat = require("./routes/chat");
const message = require('./routes/messages');
const matches = require("./routes/matches");

// const { Server } = require("socket.io");
// const io = new Server(server);
const profilePage= require('./routes/profile');
const {errors} = require("passport-local-mongoose");
const Employee = require("./model/employee");
const User = require("./model/user");
const Employer = require("./model/employer");


//Start connection to database and log status to console
mongoose.connect(mongoString);
database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected');
})

const matchesCollection = database.collection('matches')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


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
app.use('/account', account)
app.use('/discover', discoverRouter);
app.use("/chat", chat);
app.use('/message', message);
app.use("/matches", matches);

app.get('/', async function (req, res, next) {
    if (req.isAuthenticated()) {
        let user = await User.find({username: req.user.username});
        user = user[0];
        console.log(user._id);
        let employee_result = await Employee.aggregate([
            {"$match": {"user": user._id}},
        ]);
        let employer_result = await Employer.aggregate([
            {"$match": {"user": user._id}},
        ]);
        if (employee_result.length > 0) {
            res.redirect('/profile/employee')
        }
        else if (employer_result.length > 0) {
            res.redirect('/profile/employer')
        }
        else {
            res.redirect('account/')
        }
    } else {
        res.render('login.ejs', {})
    }
});
app.use('/profile', profilePage)

app.get('/login', function(req, res, next) {
    res.redirect('/')
});

app.get('/signup', function(req, res, next) {
    res.render('signup.ejs', {})
});

app.get('/u', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
    res.send(req.session.passport.user)
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// POST Routes
app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/',
      successRedirect: '/',
    }),
    (req, res) => {
      console.log(req.user);
    }
);

app.post("/register", async (req, res) => {
    console.log(req.body)
    user.register(new user({username: req.body.username, password: req.body.password}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.render('signup.ejs', {error: err.message});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            })
        }
    })
});

module.exports = app;