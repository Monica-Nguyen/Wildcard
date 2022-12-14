const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    employee: { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'employee' 
    },
    employer: { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'employer' 
    },
    message_history: [
        {type : mongoose.Schema.Types.ObjectId, ref : 'message'}
    ]
})

module.exports = mongoose.model('match', matchSchema)
