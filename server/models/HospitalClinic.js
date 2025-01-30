const mongoose = require("mongoose");

// {
//     "nameOfTheStructure": "Clinique la Cerisaie",
//     "structureCategory": "Clinique",
//     "postalAddress": "53 Rue de l'Atlantique",
//     "postalCode": "22950",
//     "city": "Trégueux",
//     "telephoneNumber": "02 96 71 31 00",
//     "structureEmail": "test@gmail.com",
//     "superAdministrator": true,
//     "password": "95449544"
// }

const HospitalClinicSchema = new mongoose.Schema(
  {
    nameOfTheStructure: {
      type: String,
      required: "Entrez le nom de la structure",
      unique: true,
    },
    structureCategory: { type: String },
    postalAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    telephoneNumber: { type: String },
    structureEmail: { type: String },
    superAdministrator: { type: Boolean, default: false },
    ipAddress: {
      type: String,
    },
    token: String,
    hash: String,
    salt: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HospitalClinic", HospitalClinicSchema);
