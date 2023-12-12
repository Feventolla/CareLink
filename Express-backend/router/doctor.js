const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");
const upload = require("../middleware/multer");

router.post("/", upload.single("photo"), doctorController.addDoctor);
router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctor);
router.patch("/:id", upload.single("photo"), doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
