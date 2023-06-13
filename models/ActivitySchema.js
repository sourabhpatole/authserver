const mongoose = require("mongoose");
const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: "string",
    },
    token: {
      type: "string",
    },
    email: {
      type: "string",
    },
    action: {
      type: "string",
      required: true,
    },
    prevData: {
      type: Array,
    },
    updatedData: {
      type: Array,
    },
  },
  { timestamps: true }
);
const activitydb = new mongoose.model("Activity", ActivitySchema);
module.exports = activitydb;
