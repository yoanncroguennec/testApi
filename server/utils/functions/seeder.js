require("dotenv").config();
// CONNECT BDD
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
// MODELS
const Movie = require('../../models/Movie');
// UTILS ASSETS DATAS JSON
const movies = require('../assets/data/json/movies.json');

const seedOffers = async () => {
    try {

        await Movie.deleteMany();
        console.log('Films supprimées');

        await Movie.insertMany(movies);
        console.log('Films ajoutées.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedOffers()