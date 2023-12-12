const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, "name can not be more than 20 characters"]

    },
    imgUrl: {
        type: String
    },
    speciality: {
        type: String
    },
    description: {
        type: String
    }


})
module.exports = mongoose.model('doctor', DoctorSchema);