const mongoose = require("mongoose");
const lmessageSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: "Number",
    },
  },
  { timestamps: true }
);
const lmessageDB = new mongoose.model("LMessage", lmessageSchema);
module.exports = lmessageDB;
