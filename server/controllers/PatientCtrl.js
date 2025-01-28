// MODELS
const PatientModel = require("../models/Patient");

const patientCtrl = {
  ////////////////////////////////
  // DELETE USER BY ID
  ////////////////////////////////
  //   deletePatientByID: async (req, res, next) => {
  //     // if (req.user.isAdmin) {
  //     try {
  //       await AuthModel.findByIdAndDelete(req.params.id);
  //       res.status(201).json("The list has been delete...");
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //     // } else {
  //     //   res.status(403).json("You are not allowed!");
  //     // }
  //   },

  ///////////////////
  //// GET PATIENT BY ID ////
  ///////////////////
  //   getPatient: async (req, res, next) => {
  //     try {
  //       const user = await PatientModel.findById(req.params.id);

  //       res.json(user);
  //     } catch (error) {
  //       res.status(400).json({ message: error.message });
  //     }
  //   },

  ///////////////////////
  //// GET ALL USERS ////
  ///////////////////////
  getAllPatients: async (req, res, next) => {
    try {
      // Second Step
      const patients = await PatientModel.find();

      const response = {
        patients: patients,
      };

      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = patientCtrl;
