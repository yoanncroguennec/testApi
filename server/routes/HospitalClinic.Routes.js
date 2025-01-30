const router = require("express").Router();
const hospitalClinicCtrl = require("../controllers/HospitalClinicCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router
  .route("/")
  .get(hospitalClinicCtrl.getAllHospitalClinic)

router
  .route("/:id")
  .get(hospitalClinicCtrl.get_HospitalClinicByID)
  .delete(hospitalClinicCtrl.deleteHospitalClinicByID);

module.exports = router;
