const mgs = require("mongoose");

module.exports = mgs.model(
  "Company",
  new mgs.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    rgscode: {
      type: String,
      required: true,
      unique: true,
    },
    state: String,
    city: String,
    phone: {
      type: Number,
      unique: true,
    },
    CreatedAt: {
      type: Date,
      default: Date.now(),
    }
  })
);
