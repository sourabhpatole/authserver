const mongoose = require("mongoose");
const whatsappSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  foodChoice: {
    type: "String",
  },
  messageDate: {
    type: Date,
    default: new Date(),
  },
});
const whatsappDB = new mongoose.model("whatsapp", whatsappSchema);
module.exports = whatsappDB;
