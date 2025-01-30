// MODELS
const WeeklyMenus_Model = require("../models/weeklyMenus_Model");

const weeklyMenus_Ctrl = {
  ////////
  // GET ALL WEEKLY MEAL MENUS
  ////////
  getAllWeeklyMenus: async (req, res, next) => {
    // res.json("Bienvenue sur mon serveur");
    try {
      const weeklyMenus = await WeeklyMenus_Model.find();
      if (!weeklyMenus || weeklyMenus.length === 0) {
        return res
          .status(404)
          .json({ message: "Weekly Meal Menus data not found." });
      }
      res.status(200).json(weeklyMenus);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  ////////
  // POST WEEKLY MEAL MENUS
  ////////
  createWeeklyMenus: async (req, res, next) => {
    try {
      const newWeeklyMenus = new WeeklyMenus_Model(req.body);

      const savedData = await newWeeklyMenus.save();
      // res.status(200).json(savedData);
      res.status(200).json({ message: "Weekly Menus created successfully." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  },

  ////////
  // DELETE ALL WEEKLY MEAL MENUS
  ////////
  deleteAll_WeeklyMenus: async (req, res, next) => {
     try {
       await WeeklyMenus_Model.deleteMany();
       res.status(201).json("ALL Weekly Menu  has been delete...");
     } catch (err) {
       res.status(500).json(err);
     }
  },

  ///////////////////
  //// GET WEEKLY MEAL MENU BY ID ////
  ///////////////////
  getWeeklyMenu: async (req, res, next) => {
    try {
      const user = await WeeklyMenus_Model.findById(req.params.id);

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  ////////////////////////////////
  // DELETE WEEKLY MEAL MENU BY ID
  ////////////////////////////////
  deleteWeeklyMenuID: async (req, res, next) => {
    try {
      await WeeklyMenus_Model.findByIdAndDelete(req.params.id);
      res.status(201).json("The Weekly Menu  has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = weeklyMenus_Ctrl;
