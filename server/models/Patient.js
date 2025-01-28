const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  avatar: { type: String },
  patientLastName: { type: String, required: true },
  patientFirstName: { type: String, required: true },
  patientEmail: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  typeOfFeed: { type: String },
  //   genre: { type: Array },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("patient", patientSchema);
