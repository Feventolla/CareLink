// doctor model
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  specialization: {
    type: String,
    required: true,
    trim: true,
  },

  availability: {
    type: {
      day: {
        type: [String],
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  },

  yearsOfExperience: {
    type: Number,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },

  hospitalId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  ],

  role: { type: String, default: "doctor" },
});

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
