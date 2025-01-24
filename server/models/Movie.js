const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  realisators: { type: String },
  actors: { type: String },
  desc: { type: String },
  trailer: { type: String, unique: true },
  country: { type: String },
  productionCompany: { type: String },
  movieLink: { type: String, unique: true },
  img: { type: String, required: true },
  year: { type: Number },
  genre: { type: Array },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("movie", movieSchema);
