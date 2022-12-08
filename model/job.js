const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company_name: {
        required: true,
        type: String
    },
    position_title: {
        required: true,
        type: String
    },
    position_level: {
        required: true,
        type: String
    },
    can_coach: {
        required: true,
        type: Boolean
    },
    skills: {
        required: true,
        type: [String]
    },
    job_details: {
        required: true,
        type: [String]
    },
})

module.exports = mongoose.model('job', jobSchema)
