const express = require("express");
const router = express.Router();
const Employee = require("../controllers/employee");

router.get("/add/:comid?",(req,res)=>{
    res.render("add")
})
router.post("/:id/:type?", Employee.Update);
router.get("/Company_Employees", Employee.Company_Employees);
router.get("/Showadmin_company", Employee.Showadmin_company);
router.get("/FindAdmin", Employee.FindAdmin);
router.get("/FindAdmins", Employee.FindAdmins); // find all admins
router.get("/Between", Employee.Between);
router.get("/all/:type?", Employee.Find);
router.get("/:id/:type?", Employee.FindOne);
router.put("/:type?", Employee.Add);

router.delete("/:id/:type?", Employee.Delete);

module.exports = router;
