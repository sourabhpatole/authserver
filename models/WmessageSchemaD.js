const mongoose = require("mongoose");
const DinnerWhatsappSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
    },
    foodChoice: {
      type: "String",
    },
    messageDate: {
      type: "String",
      default: Date(
        Date.now().toLocaleString("en-Us", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  { timestamps: true }
);
const whatsappdinner = new mongoose.model(
  "whatsappdinner",
  DinnerWhatsappSchema
);
module.exports = whatsappdinner;
