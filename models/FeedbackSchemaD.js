const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  rating: {
    type: "Number",
  },
});

const whatsappfeedbackdinner = new mongoose.model(
  "whatsappfeedbackdinner",
  FeedbackSchema
);

module.exports = whatsappfeedbackdinner;
