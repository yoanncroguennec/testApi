// MODELS
const PatientModel = require("../models/Patient");

const patientCtrl = {
  ///////////////////////
  //// GET ALL PATIENTS ////
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

  ////////
  // POST PATIENTS
  ////////
  createPatient: async (req, res, next) => {
    try {
      const newPatient = new WeeklyMenus_Model(req.body);

      const savedData = await newPatient.save();
      // res.status(200).json(savedData);
      res.status(200).json({ message: "Patient created successfully." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  ///////////////////
  //// GET PATIENT BY ID ////
  ///////////////////
  getPatient: async (req, res, next) => {
    try {
      const user = await PatientModel.findById(req.params.id);

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ////////////////////////////////
  // DELETE PATIENT BY ID
  ////////////////////////////////
  deletePatientByID: async (req, res, next) => {
    try {
      await PatientModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The patient has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = patientCtrl;
