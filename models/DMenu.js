const mongoose = require("mongoose");
const dmenuSchema = new mongoose.Schema(
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
const dmenuDB = new mongoose.model("DMenu", dmenuSchema);
module.exports = dmenuDB;
