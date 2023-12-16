const cloudinary = require("../middleware/cloudinary");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

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
        res.status(500).json({
          message: "upload faild",
          isSuccess: false,
          value: null,
          error: err,
        });
      } else {
        pictureUrl = result.secure_url;
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
    const doctorId = req.params.id;

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

    if (req.file) {
      // If there is a new file, update the pictureUrl
      await cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
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
      const oldHospital = await Hospital.findOne({ doctors: doctorId });
      if (oldHospital) {
        oldHospital.doctors.pull(doctorId);
        await oldHospital.save();
      }

      const hospital = await Hospital.findById(req.body.hospitalId);
      if (hospital) {
        hospital.doctors.push(updatedDoctor._id);
        await hospital.save();
      }
    }
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
    const { id } = req.params;
    const existingDoctor = await Doctor.findById(id);

    if (!existingDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }

    const hospital = await Hospital.findOne({ doctors: id });
    if (hospital) {
      hospital.doctors.pull(id);
      await hospital.save();
    }

    await Doctor.findByIdAndDelete(id);

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
