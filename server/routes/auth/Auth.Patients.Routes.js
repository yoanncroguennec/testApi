// Appel à la fonction Router(), issue du package 'express'
const router = require("express").Router();
// CONTROLLERS
const authPatientCtrl = require("../../controllers/auth/AuthPatientCtrl");
// FOR CLOUDINARY - Middleware permettant de recevoir des formData
const fileUpload = require("express-fileupload");

// router.get("/", (req, res) => {
//   res.json("Bienvenue sur l'API");
// });
router.post("/signup", fileUpload(), authPatientCtrl.signup);
router.post("/login", authPatientCtrl.login);

module.exports = router;
