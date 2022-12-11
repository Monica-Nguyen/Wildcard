const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    employeer: {
        type: { type : mongoose.Schema.Types.ObjectId, ref : 'employeer' }
    },
    employee: {
        type: { type : mongoose.Schema.Types.ObjectId, ref : 'employee' }
    }
})

module.exports = mongoose.model('match', matchSchema)
