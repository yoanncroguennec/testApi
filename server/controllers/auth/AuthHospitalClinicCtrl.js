// uid2 et crypto-js sont des packages qui vont nous servir à encrypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const ip = require("ip");
// MODELS
const HospitalClinicModel = require("../../models/HospitalClinic");
// FOR CLOUDINARY
// Fonction permettant de transformer un Buffer en Base64
// const convertToBase64 = require("../utils/functions/forCloudinary/convertToBase64");
// Import du package cloudinary
// const cloudinary = require("cloudinary").v2;

const authHospitalClinicCtrl = {
  signup: async (req, res, next) => {
    try {
      const {
        nameOfTheStructure,
        structureCategory,
        postalAddress,
        postalCode,
        city,
        telephoneNumber,
        structureEmail,
        superAdministrator,
        password,
      } = req.body;

      const hospitalClinic = await HospitalClinicModel.findOne({
        structureEmail: structureEmail,
      });

      if (hospitalClinic === null) {
        const token = uid2(64);
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        console.log("hash", hash);
        console.log("token, salt", token, salt);

        const newHospitalClinic = new HospitalClinicModel({
          nameOfTheStructure: nameOfTheStructure,
          structureCategory: structureCategory,
          postalAddress: postalAddress,
          postalCode: postalCode,
          city: city,
          telephoneNumber: telephoneNumber,
          structureEmail: structureEmail,
          superAdministrator: superAdministrator,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newHospitalClinic.save();
        res.json({
          _id: newHospitalClinic._id,
          token: newHospitalClinic.token,
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
      const hospitalClinic = await HospitalClinicModel.findOne({
        structureEmail: req.body.structureEmail,
      });

      if (hospitalClinic) {
        if (
          // Recréer un hash à partir du salt du hospitalClinic trouvé et du MDP reçu
          SHA256(req.body.password + hospitalClinic.salt).toString(
            encBase64
          ) === hospitalClinic.hash
        ) {
          res.status(200).json({
            _id: hospitalClinic._id,
            token: hospitalClinic.token,
            // account: hospitalClinic.account,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(400).json({ message: "HospitalClinic not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authHospitalClinicCtrl;
