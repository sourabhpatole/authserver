const mongoose = require("mongoose");
const validator = require("validator");
const groupDB = require("./GroupSchema");
const employeeSchema = new mongoose.Schema(
  {
    fname: {
      type: "String",
      required: true,
    },
    lname: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    group: {
      type: "Array",
      required: true,
      unique: true,
    },
    location: {
      type: "String",
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    // expireAt: {
    //   type: Date,
    //   /* Defaults 7 days from now */
    //   default: new Date(new Date().valueOf() + 604800000),
    //   /* Remove doc 60 seconds after specified date */
    //   expires: 60,
    // },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const employeedb = new mongoose.model("Employee", employeeSchema);
module.exports = employeedb;
