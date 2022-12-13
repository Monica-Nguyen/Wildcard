const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    company_name: {
        required: true,
        type: String
    },
    jobs: [
        { type : mongoose.Schema.Types.ObjectId, ref : 'job' }
    ],
    matches: [
        { type : mongoose.Schema.Types.ObjectId, ref : 'match' }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('employer', employerSchema)
