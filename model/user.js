const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
})

// Setting up the passport plugin
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', userSchema)
