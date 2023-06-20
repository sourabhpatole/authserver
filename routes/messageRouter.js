const express = require("express");
const { getTextMessageInput, sendMessage } = require("../helper/messageHelper");
const employeedb = require("../models/EmploySchema");
const schedule = require("node-schedule");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
router.post("/message", authenticate, async (req, res, next) => {
  const mobileData = await employeedb.find();
  const mobileNumber = mobileData.map((e) => e.mobile);
  // console.log(mobileNumber);
  for (let i = 0; i < mobileNumber.length; i++) {
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendMessage(mobileNumber[i])
      .then(() => {
        res.json({ message: "success" });
        return;
      })
      .catch(function (error) {
        // console.log(error);
        return;
      });
  }
});

//   res.json({ message: "sourabh message" });

module.exports = router;
