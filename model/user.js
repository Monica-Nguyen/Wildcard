const mongoose = require('mongoose');

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
