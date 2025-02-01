const mongoose = require("mongoose");

// {
//     "day": "Lundi",
//     "lunchOfTheDay": "Déjeuner",
//     "starter": "Tomates",
//     "mainCourse_01": "Risolette de Veau",
//     "mainCourse_02": "Semoule",
//     "cheese": false,
//     "dessert": "Yaourt aux fruits"
// }

const weeklyMenus_Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  lunchOfTheDay: {
    type: String,
    required: true,
  },
  starter: {
    type: String,
    required: true,
  },
  mainCourse_01: {
    type: String,
    required: true,
  },
  mainCourse_02: {
    type: String,
    required: true,
  },
  cheese: {
    type: Boolean,
    required: true,
  },
  dessert: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WeeklyMenus", weeklyMenus_Schema);