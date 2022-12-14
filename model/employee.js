const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    current_position: {
        required: true,
        type: String
    },
    current_level: {
        required: true,
        type: String
    },
    desired_position: {
        required: true,
        type: String
    },
    desired_level: {
        required: true,
        type: String
    },
    skills: {
        required: true,
        type: [String]
    },
    preferred_job_details: {
        required: false,
        type: [String]
    },
    matches: [
        { type : mongoose.Schema.Types.ObjectId, ref : 'match' }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('employee', employeeSchema)
