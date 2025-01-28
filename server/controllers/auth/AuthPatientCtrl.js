// uid2 et crypto-js sont des packages qui vont nous servir à encrypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const ip = require("ip");
// MODELS
const PatientModel = require("../../models/Patient");
// FOR CLOUDINARY
// Fonction permettant de transformer un Buffer en Base64
// const convertToBase64 = require("../utils/functions/forCloudinary/convertToBase64");
// Import du package cloudinary
// const cloudinary = require("cloudinary").v2;

const authPatientCtrl = {
  signup: async (req, res, next) => {
    res.status(300).json({ message: "Bienvenue sur l'API" });
    try {
      const {
        password,
        avatar,
        patientLastName,
        patientFirstName,
        patientEmail,
        roomNumber,
        typeOfFeed,
      } = req.body;

      const patient = await PatientModel.findOne({
        patientEmail: patientEmail,
      });

      if (patient === null) {
        const token = uid2(64);
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        console.log("hash", hash);
        console.log("token, salt", token, salt);

        const newPatient = new PatientModel({
          avatar: avatar,
          patientLastName: patientLastName,
          patientFirstName: patientFirstName,
          patientEmail: patientEmail,
          roomNumber: roomNumber,
          typeOfFeed: typeOfFeed,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newPatient.save();
        res.json({
          _id: newPatient._id,
          token: newPatient.token,
        });
      } else {
        res.status(409).json({ error: "Email déjà utilisé" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  ////////
  // LOGIN
  ////////
  login: async (req, res, next) => {
    try {
      const patient = await PatientModel.findOne({ email: req.body.email });

      if (patient) {
        if (
          // Recréer un hash à partir du salt du patient trouvé et du MDP reçu
          SHA256(req.body.password + patient.salt).toString(encBase64) ===
          patient.hash
        ) {
          res.status(200).json({
            _id: patient._id,
            token: patient.token,
            // account: patient.account,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(400).json({ message: "Patient not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authPatientCtrl;
