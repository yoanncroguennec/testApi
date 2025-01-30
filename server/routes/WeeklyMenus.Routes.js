const router = require("express").Router();
const weeklyMenus_Ctrl = require("../controllers/weeklyMenus_Ctrl");

router
  .route("/")
  .get(weeklyMenus_Ctrl.getAllWeeklyMenus)
  .post(weeklyMenus_Ctrl.createWeeklyMenus)
  .delete(weeklyMenus_Ctrl.deleteAll_WeeklyMenus);

router.get("/:id", weeklyMenus_Ctrl.getWeeklyMenu);
// router.put("/update/:id", weeklyMenus_Ctrl.update);
router.delete("/delete/:id", weeklyMenus_Ctrl.deleteWeeklyMenuID);

module.exports = router;
