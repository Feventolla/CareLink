const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, "name can not be more than 20 characters"]

    },
    generalSpecialization: {
        type: String,
        require: true

    },
    description: {
        type: String,
        required: true,
        minLength: [100, "Description should be more than 100 characters"]
    },

    address: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: [String],
        required: true
    },
    // open or closed 
    availability: {
        type: String,
        required: true
    },
    doctors: {
        type: [String],
        required: true
    },
    services: {
        type: [String],
        required: true
    },
    photos: {
        type: [String]
    },
    webSite: {
        type: String
    },
    operationalHour: {
        type: [String],
        required: true
    },
    workingDay: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('hospitals', HospitalSchema);