const mongoose = require('mongoose');
const DoctorSchema = require('./doctorModel')

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, "name can not be more than 20 characters"]

    },
    description: {
        type: String,
        minLength: [100, "Description should be more than 100 characters"]
    },

    address: {
        type: [String],
        require: true
    },
    phoneNumber: {
        type: [String]
    },
    // open or closed 
    status: {
        type: String
    },
    doctors: {
        type: [String]
    },
    services: {
        type: [String]
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
        type: [String]
    }

})

module.exports = mongoose.model('hospitals', HospitalSchema);