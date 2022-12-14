const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        required: true,
        type: String
    },
    message_body: {
        required: true,
        type: String
    },
    date_added: {
        required: true,
        type: Date
    },
})

module.exports = mongoose.model('message', messageSchema)
