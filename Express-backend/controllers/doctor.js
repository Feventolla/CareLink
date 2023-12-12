const cloudinary = require("../middleware/cloudinary");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospitalModel");

exports.addDoctor = async (req, res) => {
  try {
    const {
      firstName,
      LastName,
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
        photo = result.secure_url;
      }
    });
    const doctor = new Doctor({
      firstName,
      LastName,
      phoneNumber,
      email,
      specialization,
      availability,
      yearsOfExperience,
      gender,
      hospitalId,
      photo,
    });
    await doctor.save();
    const hospital = await Hospital.findById(hospitalId);

    hospital.doctors.push(doctor._id);
    await hospital.save();

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
    const {
      firstName,
      LastName,
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
        res.status(500).json({ message: "upload faild" });
      } else {
        photo = result.secure_url;
      }
    });
    updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        LastName,
        phoneNumber,
        email,
        specialization,
        availability,
        yearsOfExperience,
        gender,
        hospitalId,
        photo,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Doctor updated successfully",
      isSuccess: true,
      value: updatedDoctor,
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

exports.deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find the doctor item by ID
    const doctor = await Doctor.findById(doctorId);

    // Find the hospital associated with this doctor
    const hospital = await Hospital.findOne({ doctors: doctorId });
    hospital.doctors.pull(doctorId);
    await hospital.save();
    await Doctor.findByIdAndRemove(doctorId);
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
