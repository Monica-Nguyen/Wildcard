const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    user_type:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)
