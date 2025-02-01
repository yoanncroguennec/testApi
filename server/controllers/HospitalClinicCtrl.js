// MODELS
const HospitalClinicModel = require("../models/HospitalClinic");

const hospitalClinicCtrl = {
  ///////////////////////
  //// GET ALL HospitalClinic ////
  ///////////////////////
  getAllHospitalClinic: async (req, res, next) => {
    try {
      // Second Step
      const hospitalClinic = await HospitalClinicModel.find();

      const response = {
        hospitalClinic: hospitalClinic,
      };

      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ///////////////////
  //// GET HospitalClinic BY ID ////
  ///////////////////
  get_HospitalClinicByID: async (req, res, next) => {
    try {
      const hospitalClinic = await HospitalClinicModel.findById(req.params.id);

      res.json(hospitalClinic);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ////////////////////////////////
  // DELETE ALL HospitalClinic
  ////////////////////////////////
  deleteAllHospitalClinic: async (req, res, next) => {
    try {
      await HospitalClinicModel.deleteMany({});
      res.status(201).json("All the HospitalClinic has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  ////////////////////////////////
  // DELETE HospitalClinic BY ID
  ////////////////////////////////
  deleteHospitalClinicByID: async (req, res, next) => {
    try {
      await HospitalClinicModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The HospitalClinic has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = hospitalClinicCtrl;
