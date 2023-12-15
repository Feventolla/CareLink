const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/Patient");
const upload = require("../middleware/multer");

router.post("/signup", upload.single("photo"), PatientController.Register);
router.post("/signin", PatientController.Login);
router.get("/getPatient/:patientId", PatientController.getPatient);
router.get("/getAllPatients", PatientController.getAllPatients);
router.patch("/editProfile/:patientId", PatientController.editProfile);
router.delete("/deletePatient/:patientId", PatientController.deletePatient);
router.post("/forgetPassword", PatientController.forgetPassword);
router.post("/resetPassword", PatientController.resetPassword);

module.exports = router;
