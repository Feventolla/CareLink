const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  height: {
    type: Number,
    required: true,
  },

  weight: {
    type: Number,
  },

  photo: {
    type: String,
  },

  role: {
    type: String,
  },
  otpCode: {
    type: Number,
  },

  resetToken: {
    type: String,
  },

  resetTokenExpiration: {
    type: Date,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
