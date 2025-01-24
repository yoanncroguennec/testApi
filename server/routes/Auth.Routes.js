// Appel à la fonction Router(), issue du package 'express'
const router = require("express").Router();
// CONTROLLERS
const authCtrl = require("../controllers/AuthCtrl");
// FOR CLOUDINARY - Middleware permettant de recevoir des formData
const fileUpload = require("express-fileupload");

// router.get("/", (req, res) => {
//   res.json("Bienvenue sur l'API");
// });
router.post("/signup", fileUpload(), authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
