const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const patientRoute = require("./router/Patient");
const hospitalRoute = require("./router/hospital");
const doctorRoute = require("./router/doctor");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.on("open", () => console.log("connected to database"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.use("/patient", patientRoute);
app.use("/hospital", hospitalRoute);
app.use("/doctor", doctorRoute);
