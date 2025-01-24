const router = require("express").Router();
// "express-fileupload" : Permet de récupérer les fichiers transmis par les clients
// CONTROLLERS
const movieCtrl = require("../controllers/MovieCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router.route("/").get(movieCtrl.getAllMovies).post(movieCtrl.createMovie);
router.route("/randomMovie").get(movieCtrl.getRandomMovie);
router.route("/allMoviesByCriteria").get(movieCtrl.getAllMoviesByCriteria);
router.route("/sortByMovieGenre").get(movieCtrl.getSortByMovieGenre);

router.get("/updateMovie_ViaParams", (req, res) => {
  res.status(400).json({ message: "test" });
});


router.route("/getMonthlyCountMovies").get(movieCtrl.getMonthlyCountMovies);
router
  .route("/displayLatestMoviesInBDD")
  .get(movieCtrl.getDisplayLatestMoviesInBDD);

router.route("/:id").get(movieCtrl.getMovie);
// PUT
  router.put(
    "/updateMovie_ViaParamsId/:id",
    movieCtrl.update_MovieViaParamsId
  );
// DELETE
router.route("/:id").delete(movieCtrl.deleteMovieByID);

module.exports = router;
