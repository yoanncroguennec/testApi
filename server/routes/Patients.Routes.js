const router = require("express").Router();
// "express-fileupload" : Permet de récupérer les fichiers transmis par les clients
// CONTROLLERS
const patientCtrl = require("../controllers/PatientCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router.route("/").get(patientCtrl.getAllPatients)

router
  .route("/:id")
  .get(patientCtrl.getPatient)
  // .update_UserViaParamsId);
  .delete(patientCtrl.deletePatientByID);

module.exports = router;
