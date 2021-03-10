const express = require("express");
const router = express.Router();
const Company = require("../controllers/company");

router.get("/home", Company.FindByDate);
router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/all/:type?", Company.Find);

router.get("/oneyear", Company.One_Year);
router.post("/changeloc", Company.Changeloc);
router.get("/:id/:type?", Company.FindOne);
router.put("/:type?", Company.Create);
router.post("/:id/:type?", Company.Update);
router.delete("/:id/:type?", Company.Delete);

module.exports = router;
