const Company = require("../models/company");
const Employee = require("../models/employee");

const Find = (req, res) => {
  Employee.find({}, { __v: 0 })
    .populate("company", { name: 1 })
    .exec((err, employees) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });

      res.json(employees);
    });
};

const FindOne = (req, res) => {
  Employee.findById(req.params.id, { __v: 0 })
    .populate("company", { name: 1, _id: 1 })
    .exec((err, employee) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });

      if (req.params.type === "json") res.json(employee);
      else res.render("employee", { employee });
    });
};

const Add = (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.company ||
    !req.body.ntlcode ||
    new Date() <= new Date(req.body.dob)
  ) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }

  Company.findById(req.body.company, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (!company) return res.status(404).json({ msg: "Not Found :)" });
    
    // check Exist admin
    if (req.body.admin === "true") {
    
      Employee.find(
        { company: req.body.company, admin: true },
        (err, admin) => {
          if (err)
            return res
              .status(500)
              .json({ msg: "Server Error :)", err: err.message });

          if (admin.length) {
            return res.status(406).json({ msg: "Exist admin :)" });
          } else {
            const newEmployee = new Employee(req.body);

            newEmployee.save((err, employee) => {
              if (err)
                return res
                  .status(500)
                  .json({ msg: "Server Error :)", err: err.message });
              if (req.params.type === "json") res.json(employee);
              else res.send("add");
            });
          }
        }
      );
    } else {
      const newEmployee = new Employee(req.body);

      newEmployee.save((err, employee) => {
        if (err)
          return res
            .status(500)
            .json({ msg: "Server Error :)", err: err.message });
        if (req.params.type === "json") res.json(employee);
        else res.send("add");
      });
    }
  });
};

const Update = (req, res) => {
  if (new Date() <= new Date(req.body.dob)) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }
  console.log("=======================body=============================\n",req.body)
  //   Company.findById(req.body.company, (err, company) => {
  //     if (err)
  //       return res.status(500).json({ msg: "Server Error :)", err: err.message });
  //     if (!company) return res.status(404).json({ msg: "Not Found :)" });

  // check Exist admin
  if (req.body.admin === "true") {
    Employee.find({ company: req.body.company, admin: true }, (err, admin) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      if (admin.length) return res.status(406).json({ msg: "Exist admin :)" });
      else {
        Employee.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true },
          (err, employee) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "Server Error :)", err: err.message });
            if (req.params.type === "json") res.json(employee);
            else res.send("update");
          }
        );
      }
    });
  } else {
    Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, employee) => {
        if (err)
          return res
            .status(500)
            .json({ msg: "Server Error :)", err: err.message });
        if (req.params.type === "json") res.json(employee);
        else res.send("update");
      }
    );
  }
  //   });
};

const Delete = (req, res) => {
  console.log(req.params.id)
  Employee.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (!employee) return res.status(404).json({ msg: "Not Found!" });
    if (req.params.type === "json") res.json({ employee, msg: "success" });
    else res.send("delete");
  });
};

const Company_Employees = (req, res) => {
  Company.findOne({ name: "maktab20" }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    Employee.find({ company: company._id }, (err, employees) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(employees);
    });
  });
};

const FindAdmin = (req, res) => {
  Company.findOne({ name: "maktab20" }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    Employee.find(
      { company: company._id, admin: true },
      { first_name: 1, _id: 0 },
      (err, employee) => {
        if (err)
          return res
            .status(500)
            .json({ msg: "Server Error :)", err: err.message });
        res.json(employee);
      }
    );
  });
};

let date = new Date();
// get age between 20 and 30
const Between = (req, res) => {
  Employee.find(
    {
      dob: {
        $gte: date.getFullYear() - 30 + date.toISOString().substr(4),
        $lte: date.getFullYear() - 20 + date.toISOString().substr(4),
      },
    },
    { _id: 0 },
    (err, employees) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(employees);
    }
  );
};

const FindAdmins = (req, res) => {
  Employee.find({ admin: true }, (err, employees) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(employees);
  });
};

const Showadmin_company = (req, res) => {
  Employee.find({ admin: true }, { first_name: 1, last_name: 1 })
    .populate("company", { name: 1, _id: 0 })
    .lean()
    .exec((err, emp) => {
      for (let el of emp) {
        el.name = `${el.first_name} ${el.last_name} - ${el.company.name}`;
        delete el.first_name;
        delete el.last_name;
        delete el.company;
      }
      res.json(emp);
    });
};

module.exports = {
  Find,
  Add,
  Update,
  Delete,
  FindOne,
  Company_Employees,
  FindAdmin,
  Between,
  FindAdmins,
  Showadmin_company,
};
