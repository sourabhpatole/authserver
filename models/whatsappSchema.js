const mongoose = require("mongoose");
const WhatsappSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
    },
    foodChoice: {
      type: "String",
    },
    messageDate: {
      type: "Date",
      default: new Date(),
    },
  },
  { timestamps: true }
);
const whatsappDB = new mongoose.model("whatsapp", WhatsappSchema);
module.exports = whatsappDB;
