const mongoose = require("mongoose");
const dmessageSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: "Number",
    },
  },
  { timestamps: true }
);
const dmessageDB = new mongoose.model("DMessage", dmessageSchema);
module.exports = dmessageDB;
