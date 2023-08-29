const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  rating: {
    type: "Number",
  },
});

const whatsappfeedbacklunch = new mongoose.model(
  "whatsappfeedbacklunch",
  FeedbackSchema
);

module.exports = whatsappfeedbacklunch;
