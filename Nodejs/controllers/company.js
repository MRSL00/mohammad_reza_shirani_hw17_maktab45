const Company = require("../models/company");
const Employee = require("../models/employee");

const Find = (req, res) => {
  return Company.find({}, (err, companies) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    res.json(companies);
  });
};

const FindByDate = (req, res) => {
  Company.find(
    {
      CreatedAt: {
        $gte: !req.query.fewer?"1980-12-12":req.query.fewer,
        $lte: !req.query.more?"2021-12-12":req.query.more,
      },
    },
    (err, companies) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.render("home", { companies });
    }
  );
};

const FindOne = (req, res) => {
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    Employee.find({ company: company._id }, (err, employees) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      if (req.params.type === "json") res.json({ company, employees });
      else res.render("company", { company, employees });
    });
  });
};

const Create = (req, res) => {
  if (
    !req.body.name ||
    !req.body.rgscode ||
    new Date() <= new Date(req.body.CreatedAt)
  ) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }

  Company.findOne({ name: req.body.name.trim() }, (err, existCompany) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (existCompany)
      return res.status(406).json({ msg: "Exist Company Name :(" });

    const newCompany = new Company(req.body);

    newCompany.save((err, company) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      if (req.params.type === "json") res.json(company);
      else res.send("save");
    });
  });
};

const Update = (req, res) => {
  if (new Date() <= new Date(req.body.CreatedAt)) {
    return res.status(400).json({ msg: "Bad Request :)" });
  }

  Company.findOne({ name: req.body.name.trim() }, (err, existCompany) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (existCompany)
      return res.status(406).json({ msg: "Exist Company Name :(" });

    Company.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, company) => {
        if (err)
          return res
            .status(500)
            .json({ msg: "Server Error :)", err: err.message });
        if (req.params.type === "json") res.json(company);
        else res.send("update");
      }
    );
  });
};

const Delete = (req, res) => {
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ msg: "Server Error :)", err: err.message });
    if (!company) return res.status(404).json({ msg: "Not Found!" });
    company.deleteOne((err, company) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });

      Employee.deleteMany({ company: company._id }, (err, employees) => {
        if (err)
          return res
            .status(500)
            .json({ msg: "Server Error :)", err: err.message });

        if (req.params.type === "json") res.json({ company, employees });
        else res.send("delete");
      });
    });
  });
};

const One_Year = (req, res) => {
  let date = new Date();
  let rang = date.getFullYear() - 1 + date.toISOString().substr(4);
  Company.find(
    {
      CreatedAt: {
        $gte: rang,
        $lte: date.toISOString(),
      },
    },
    (err, companies) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(companies);
    }
  );
};

const Changeloc = (req, res) => {
  Company.updateMany(
    {},
    { $set: { city: "tehran", state: "tehran" } },
    (err, com) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "Server Error :)", err: err.message });
      res.json(com);
    }
  );
};

module.exports = {
  Find,
  FindByDate,
  Create,
  FindOne,
  Update,
  Delete,
  One_Year,
  Changeloc,
};
