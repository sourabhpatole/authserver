const mongoose = require("mongoose");
const lmenuSchema = new mongoose.Schema(
  {
    vegmenuname: {
      type: "String",
    },
    nonvegmenuname: {
      type: "String",
    },
  },
  { timestamps: true }
);
const lmenuDB = new mongoose.model("LMenu", lmenuSchema);
module.exports = lmenuDB;
