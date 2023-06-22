const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: "Number",
    },
  },
  { timestamps: true }
);
const messageDB = new mongoose.model("Message", messageSchema);
module.exports = messageDB;
