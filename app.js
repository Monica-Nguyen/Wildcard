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
const usersRouter = require('./routes/users');
const discoverRouter = require('./routes/discover');

// const { Server } = require("socket.io");
// const io = new Server(server);

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
app.use('/users', usersRouter);
app.use('/discover', discoverRouter);
app.use('/message', message);

app.get('/', function(req, res, next) {
    res.render('login.ejs', {})
});

app.get('/signup', function(req, res, next) {
    res.render('signup.ejs', {})
});

app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
    res.redirect('/account')
);

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
      successRedirect: '/secret',
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
            res.send('There was an error');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            })
        }
    })
});

module.exports = app;