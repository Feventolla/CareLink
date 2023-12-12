const express = require("express");
const router = express.Router();
const doctorContoller = require("../controllers/doctor");

router.post("/", upload.single("foodImage"), doctorContoller.addDoctor);
