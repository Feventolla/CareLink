const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");
const upload = require("../middleware/multer");

router.post("/postDoctor", upload.single("photo"), doctorController.addDoctor);
router.get("/getAllDoctors", doctorController.getDoctors);
router.get("/getDoctor/:id", doctorController.getDoctor);
router.patch("/editDoctor/:id", upload.single("photo"), doctorController.updateDoctor);
router.delete("/deleteDoctor/:id", doctorController.deleteDoctor);

module.exports = router;
