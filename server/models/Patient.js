const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  avatar: { type: String },
  patientLastName: { type: String, required: true },
  patientFirstName: { type: String, required: true },
  patientEmail: { type: String, required: true, unique: true },
  nameHospital_Clinic: { type: String, required: true },
  roomNumber: { type: String, required: true, unique: true },
  typeOfFeed: { type: String },
  ipAddress: { type: String },
  //   genre: { type: Array },
  token: String,
  hash: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("patient", patientSchema);
