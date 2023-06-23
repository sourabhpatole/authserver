const mongoose = require("mongoose");
const WmessageSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  foodChoice: {
    type: "String",
  },
  messageDate: {
    type: "String",
    default: Date(Date.now()),
  },
});
const wmessageDB = new mongoose.model("whatsapp", WmessageSchema);
module.exports = wmessageDB;
