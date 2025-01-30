// Appel à la fonction Router(), issue du package 'express'
const router = require("express").Router();
// CONTROLLERS
const authHospitalClinicCtrl = require("../../controllers/auth/AuthHospitalClinicCtrl");
// FOR CLOUDINARY - Middleware permettant de recevoir des formData
const fileUpload = require("express-fileupload");

// router.get("/", (req, res) => {
//   res.json("Bienvenue sur l'API");
// });
router.post("/signup", fileUpload(), authHospitalClinicCtrl.signup);
router.post("/login", authHospitalClinicCtrl.login);

module.exports = router;
