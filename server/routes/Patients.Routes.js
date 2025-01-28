const router = require("express").Router();
// "express-fileupload" : Permet de récupérer les fichiers transmis par les clients
// CONTROLLERS
const patientCtrl = require("../controllers/PatientCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router
  .route("/")
  .get(patientCtrl.getAllPatients)
  .post(patientCtrl.createPatient);

router.route("/:id").get(patientCtrl.getPatient);
// PUT
//   router.put("/updateUser_ViaParamsId/:id", patientCtrl.update_UserViaParamsId);
// DELETE
router.route("/:id").delete(patientCtrl.deletePatientByID);

module.exports = router;
