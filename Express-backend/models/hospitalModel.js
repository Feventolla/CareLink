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
        type: String
    },

    address: {
        type: [String]
    },
    phoneNumber: {
        type: [Number]
    },
    // open or closed 
    status: {
        type: Boolean,
        default: false
    },
    doctors: {
        type: [DoctorSchema]
    },
    services: {
        type: [String]
    },
    photos: {
        type: [String]
    },
    webSite: {
        type: [String]
    },
    operationalHour: {
        type: [Number]
    },

})

module.exports = mongoose.model('hospitals', HospitalSchema);