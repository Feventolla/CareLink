const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  generalSpecialization: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
    minLength: [100, "Description should be more than 100 characters"],
  },

  address: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: [String],
    required: true,
  },
  // open or closed
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

  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: [],
    },
  ],
  services: {
    type: [String],
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  webSite: {
    type: String,
  },
});

module.exports = mongoose.model("hospitals", HospitalSchema);
