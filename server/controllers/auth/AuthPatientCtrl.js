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
    try {
      const userEmail = await PatientModel.findOne({
        email: req.fields.patientEmail,
      });
      // const patient = await PatientModel.findOne({
      //   patientEmail: req.body.patientEmail,
      // });

      if (userEmail) {
        res.status(400).json({ error: "This email already has an account." });
      } else {
        // if (patient) {
        //   res.status(409).json({ message: "Cette email est déjà prise." });
        // } else {
        // le patient a bien envoyé les infos requises ?
        if (
          // Les champs OBLIGATOIRE a remplir
          req.body.password &&
          req.body.avatar &&
          req.body.patientLastName &&
          req.body.patientFirstName &&
          req.body.patientEmail &&
          req.body.roomNumber &&
          req.body.typeOfFeed
        ) {
          // STEP 1 : encrypter le mot de passe
          // Générer le token et encrypter le mot de passe
          const token = uid2(64); // Génère Token qui fera 64 caractères de long
          const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
          // On concatène le "salt" avec le "passord"
          // "encBase64" Donner en argument
          const hash = SHA256(req.body.password + salt).toString(encBase64);

          const patientIp = ip.address();
          console.log(patientIp);

          // STEP 2 : créer le nouvel utilisateur
          const newPatient = new PatientModel({
            // Les champs que le patient à remplit (pas forcément obligatoire)
            ipAddress: patientIp,
            avatar: req.body.avatar,
            patientLastName: req.body.patientLastName,
            patientFirstName: req.body.patientFirstName,
            patientEmail: req.body.patientEmail,
            roomNumber: req.body.roomNumber,
            typeOfFeed: req.body.typeOfFeed,
            token: token,
            hash: hash,
            salt: salt,
            // account: {
            //   username: req.body.username,
            //   address: req.body.address,
            //   postalCode: req.body.postalCode,
            //   city: req.body.city,
            //   state: req.body.state,
            //   phone: req.body.phone,
            //   sex: req.body.sex,
            // },
          });

          // Si je reçois une image, je l'upload sur cloudinary et j'enregistre le résultat dans la clef avatar de la clef account de mon nouvel utilisateur
          // if (req.files?.avatar) {
          //   const result = await cloudinary.uploader.upload(
          //     convertToBase64(req.files.avatar),
          //     {
          //       folder: `api/reactJsApplicationsCluster/patients/${newPatient._id}`,
          //       public_id: "avatar",
          //     }
          //   );
          //   newPatient.account.avatar = result;
          // }

          // STEP 3 : sauvegarder ce nouvel patient dans la BDD
          await newPatient.save();
          // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
          res.status(201).json({
            _id: newPatient._id,
            avatar: newPatient.avatar,
            patientLastName: newPatient.patientLastName,
            patientFirstName: newPatient.patientFirstName,
            patientEmail: newPatient.patientEmail,
            roomNumber: newPatient.roomNumber,
            typeOfFeed: newPatient.typeOfFeed,
            token: newPatient.token,
            // account: newPatient.account,
            patientIp: patientIp,
          });
          // return res.status(400).json(res);
          // res.json(res);
        } else {
          // le patient n'a pas envoyé les informations requises ?
          res.status(400).json({ message: "Missing parameters" });
        }
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
