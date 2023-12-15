const cloudinary = require("../middleware/cloudinary");
const Hospital = require("../models/hospital");

const getAllHospotals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    res.status(200).json({
      message: "Hospitals found successfully",
      isSuccess: true,
      value: hospitals,
      error: null,
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

const getHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      res.status(500).json({
        message: "Hospital found successfully",
        isSuccess: true,
        value: hospital,
        error: null,
      });
    }

    res.status(200).json({ message: "hospital fetched", hospital });
  } catch (error) {
    res.status(500).json({
      message: "An Error occurred",
      isSuccess: false,
      value: null,
      error: error,
    });
  }
};

const postHospital = async (req, res) => {
  try {
    const {
      name,
      generalSpecialization,
      description,
      address,
      phoneNumber,
      availability,
      services,
      webSite,
      doctors,
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

    const hospital = new Hospital({
      name,
      generalSpecialization,
      description,
      address,
      phoneNumber,
      availability,
      services,
      webSite,
      photo: pictureUrl,
      doctors,
    });
    await hospital.save();

    res.status(201).json({
      message: "Hospital created successfully",
      isSuccess: true,
      value: hospital,
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

const deleteHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await Hospital.findByIdAndDelete(hospitalId);

    if (!hospital) {
      res.status(404).json({ message: "hospital not found" });
    }

    res.status(200).json({
      message: "Hospital deleted successfully",
      isSuccess: true,
      value: null,
      error: null,
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

const editHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    // Check if the hospital with the given ID exists
    const existingHospital = await Hospital.findById(hospitalId);
    if (!existingHospital) {
      return res.status(404).json({
        message: "Hospital not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }
    const updateFields = req.body;

    if (req.file) {
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

    // Update the existing hospital with the new fields
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      message: "Hospital updated successfully",
      isSuccess: true,
      value: updatedHospital,
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

module.exports = {
  getAllHospotals,
  getHospital,
  postHospital,
  editHospital,
  deleteHospital,
};
