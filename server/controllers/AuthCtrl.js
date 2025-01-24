// uid2 et crypto-js sont des packages qui vont nous servir à encrypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const ip = require("ip");
// MODELS
const UserModel = require("../models/Auth");
// FOR CLOUDINARY
// Fonction permettant de transformer un Buffer en Base64
const convertToBase64 = require("../utils/functions/forCloudinary/convertToBase64");
// Import du package cloudinary
const cloudinary = require("cloudinary").v2;

const authCtrl = {
  signup: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        res.status(409).json({ message: "Cette email est déjà prise." });
      } else {
        // l'user a bien envoyé les infos requises ?
        if (
          // Les champs OBLIGATOIRE a remplir
          req.body.email &&
          req.body.password &&
          req.body.username &&
          req.body.firstName &&
          req.body.lastName
        ) {
          // STEP 1 : encrypter le mot de passe
          // Générer le token et encrypter le mot de passe
          const token = uid2(64); // Génère Token qui fera 64 caractères de long
          const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
          // On concatène le "salt" avec le "passord"
          // "encBase64" Donner en argument
          const hash = SHA256(req.body.password + salt).toString(encBase64);

          const userIp = ip.address();
          console.log(userIp);

          // STEP 2 : créer le nouvel utilisateur
          const newUser = new UserModel({
            // Les champs que l'user à remplit (pas forcément obligatoire)
            ipAddress: userIp,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.admin,
            token: token,
            hash: hash,
            salt: salt,
            account: {
              username: req.body.username,
              address: req.body.address,
              postalCode: req.body.postalCode,
              city: req.body.city,
              state: req.body.state,
              phone: req.body.phone,
              sex: req.body.sex,
            },
            newsletter: req.body.newsletter,
          });

          // Si je reçois une image, je l'upload sur cloudinary et j'enregistre le résultat dans la clef avatar de la clef account de mon nouvel utilisateur
          if (req.files?.avatar) {
            const result = await cloudinary.uploader.upload(
              convertToBase64(req.files.avatar),
              {
                folder: `api/reactJsApplicationsCluster/users/${newUser._id}`,
                public_id: "avatar",
              }
            );
            newUser.account.avatar = result;
          }

          // STEP 3 : sauvegarder ce nouvel user dans la BDD
          await newUser.save();
          // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
          res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token: newUser.token,
            account: newUser.account,
            admin: newUser.admin,
            userIp: userIp,
            // address: newUser.address,
            // postalCode: newUser.postalCode,
            // city: newUser.city,
            // state: newUser.state,
            // phone: newUser.phone,
          });
          // return res.status(400).json(res);
          // res.json(res);
        } else {
          // l'utilisateur n'a pas envoyé les informations requises ?
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
      const user = await UserModel.findOne({ email: req.body.email });

      if (user) {
        if (
          // Recréer un hash à partir du salt du user trouvé et du MDP reçu
          SHA256(req.body.password + user.salt).toString(encBase64) ===
          user.hash
        ) {
          res.status(200).json({
            _id: user._id,
            token: user.token,
            account: user.account,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authCtrl;
