const router = require("express").Router();
const categoryMovieCtrl = require("../controllers/CategoryMovieCtrl");

// router.get("/", (req, res) => {
//   res.status(400).json({ message: "test" });
// });

router
  .route("/")
  .get(categoryMovieCtrl.getAllCategoriesListMovies)
  .post(categoryMovieCtrl.createCategoriesListMovies);
// PUT
  router.put(
    "/updateCategoryMovie_ViaParamsId/:id",
    categoryMovieCtrl.update_CategoryListMoviesViaParamsId
  );
  // DELETE
router.route("/:id").delete(categoryMovieCtrl.deleteByID_CategoryListMovies);


module.exports = router;
