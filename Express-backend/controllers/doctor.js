const cloudinary = require("../middleware/cloudinary");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospitalModel");

exports.addDoctor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      specialization,
      availability,
      yearsOfExperience,
      gender,
      hospitalId,
    } = req.body;
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "upload faild",
          isSuccess: false,
          value: null,
          error: err,
        });
      } else {
        pictureUrl = result.secure_url;
        console.log(pictureUrl, "$$$$$$");
      }
    });
    const doctor = new Doctor({
      firstName,
      lastName,
      phoneNumber,
      email,
      specialization,
      availability,
      yearsOfExperience,
      gender,
      hospitalId,
      photo: pictureUrl,
    });
    await doctor.save();
    const hospital = await Hospital.findById(hospitalId);
    if (hospital) {
      hospital.doctors.push(doctor._id);
      await hospital.save();
    }

    res.status(201).json({
      message: "Doctor created successfully",
      isSuccess: true,
      value: doctor,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      message: "Doctors found successfully",
      isSuccess: true,
      value: doctors,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findById(id);
    res.status(200).json({
      message: "Doctor found successfully",
      isSuccess: true,
      value: doctor,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id; // Assuming the doctor ID is in the request parameters

    // Check if the doctor with the given ID exists
    const existingDoctor = await Doctor.findById(doctorId);
    if (!existingDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }

    // Only update the fields that are present in the request body
    const updateFields = req.body;
    console.log(req, doctorId);

    if (req.file) {
      // If there is a new file, update the pictureUrl
      await cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Upload failed",
            isSuccess: false,
            value: null,
            error: err,
          });
        }
        updateFields.photo = result.secure_url;
      });
    }

    // Update the existing doctor with the new fields
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $set: updateFields },
      { new: true }
    );
    if (req.body.hospitalId) {
      const hospital = await Hospital.findById(req.body.hospitalId);

      hospital.doctors.push(updatedDoctor._id);
      await hospital.save();
    }
    res.status(200).json({
      message: "Doctor updated successfully",
      isSuccess: true,
      value: updatedDoctor,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: error.message,
    });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    console.log(doctorId);
    const existingDoctor = await Doctor.findById(doctorId);
    console.log(existingDoctor);
    if (!existingDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }

    console.log("here");
    await Doctor.findByIdAndRemove(doctorId);
    console.log("here");
    res.status(200).json({
      message: "Doctor deleted successfully",
      isSuccess: true,
      value: null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};
