const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt_secret = process.env.JWT_SECRTE;
const cloudinary = require("../middleware/cloudinary");
const transporter = require("../middleware/node_mailer");

const Register = async (req, res) => {
  let image;
  try {
    const {
      firstname,
      lastname,
      gender,
      age,
      height,
      weight,
      email,
      password,
      photo,
    } = req.body;
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "upload failed" });
      } else {
        image = result.secure_url;
      }
    });

    // Check if the email is already registered
    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({ message: "Email already used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const patient = new Patient({
      firstname,
      lastname,
      gender,
      age,
      height,
      weight,
      email,
      password: hashedPassword,
      photo: image,
      role: "patient",
    });

    await patient.save();
    res.status(201).json({
      message: "User registered",
      isSuccess: true,
      value: patient,
      error: error,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      res.status(404).json({ message: "user not found" });
    }

    const isMatch = bcrypt.compare(password, patient.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: patient.email,
        id: patient.id,
        role: patient.role,
      },
      jwt_secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "user logged in",
      isSuccess: true,
      value: { token, Patient },
      error: error,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      res.status(500).json({ message: "patient not found" });
    }

    res.status(200).json({
      message: "patient fetched",
      isSuccess: true,
      value: patient,
      error: error,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({ message: "patients fetched", patients });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if the patient with the given ID exists
    const existingPatient = await Patient.findById(patientId);
    if (!existingPatient) {
      return res.status(404).json({
        message: "Patient not found",
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

    // Update the existing patient with the new fields
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      message: "Patient updated successfully",
      isSuccess: true,
      value: updatedPatient,
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

const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      res.status(404).json({ message: "patinet not found" });
    }

    res.status(200).json({
      message: "patient deleted successfully",
      isSuccess: true,
      value: null,
      error: error,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    const patient = await Patient.findOne({ email });

    if (!patient) {
      res.status(404).json({ message: "user not found" });
    }

    patient.otpCode = otpCode;
    await patient.save();

    const mailOptions = {
      from: "zelalemtigist21@gmail.com",
      to: email,
      subject: "Reset your password",
      text: `Enter the following code to reset your password: ${otpCode}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info.response);

    res
      .status(200)
      .json({ message: "Reset password email sent successfully", otpCode });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, otpCode } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      res.status(404).json({ message: "User not found" });
    }

    if (patient.otpCode !== otpCode) {
      res.status(400).json({ message: "Invalid otpcode" });
    }

    if (patient.resetTokenExpiration < Date.now() + 60000) {
      res.status(400).json({ message: "Invalid or expired reset token" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    patient.password = hashedPassword;
    patient.resetToken = null;
    patient.resetTokenExpiration = null;

    await patient.save();

    res.status(200).json({
      message: "rest password successfully",
      isSuccess: true,
      value: null,
      error: error,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

module.exports = {
  Register,
  Login,
  editProfile,
  deletePatient,
  getPatient,
  getAllPatients,
  forgetPassword,
  resetPassword,
};
