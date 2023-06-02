const mongoose = require("mongoose");
const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
    },
    action: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);
const activitydb = new mongoose.model("Activity", ActivitySchema);
module.exports = activitydb;
