const express = require("express");
const router = express.Router();
const HospitalController = require("../controllers/hospital");
const upload = require("../middleware/multer");

router.get("/getAllHospitals", HospitalController.getAllHospotals);
router.get("/getHospital/:hospitalId", HospitalController.getHospital);
router.post(
  "/postHospital",
  upload.single("photo"),
  HospitalController.postHospital
);
router.patch(
  "/editHospital/:hospitalId",
  upload.single("photo"),
  HospitalController.editHospital
);
router.delete("/deleteHospital/:hospitalId", HospitalController.deleteHospital);

module.exports = router;
