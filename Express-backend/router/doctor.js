const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");

router.post("/", upload.single("photo"), doctorController.addDoctor);
router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctor);

module.exports = router;
