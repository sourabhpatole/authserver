const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: "String",
      required: true,
      unique: true,
    },
    createdBy: {
      type: "String",
      required: true,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
  },
  { timestamps: true }
);
const groupDB = new mongoose.model("Group", groupSchema);
module.exports = groupDB;
