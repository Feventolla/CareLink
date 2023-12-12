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
        res.status(500).json({ message: "upload faild" });
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
      isSuccess: true,
      value: null,
      error: error,
    });
  }
};


