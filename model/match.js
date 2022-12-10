const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
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
    is_active: {
        required: true,
        type: Boolean
    },
    job_details: {
        required: false,
        type: [String]
    },
})

module.exports = mongoose.model('match', matchSchema)
