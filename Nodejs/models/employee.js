const mgs = require("mongoose");
const Schema = mgs.Schema;

module.exports = mgs.model(
  "Employee",
  new mgs.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    ntlcode: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    dob: Date,
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  })
);
