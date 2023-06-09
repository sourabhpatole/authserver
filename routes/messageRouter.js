const express = require("express");
// const fs = require("fs");
const db = require("../db/conn");
// const schedule = require("node-schedule");
const { sendMessage } = require("../helper/messageHelper");
const employeedb = require("../models/EmploySchema");
const authenticate = require("../middleware/authenticate");
const messageDB = require("../models/MessageSchema");
const wmessageDB = require("../models/WmessageSchema");
const router = express.Router();

router.post("/message/:gr", async (req, res, next) => {
  const date = "*/10 * * * * *";
  const mobileData = await employeedb.find();
  // console.log(mobileData);
  const text = req.params.gr;
  const dataParam = text.toLowerCase();
  // console.log(dataParam);

  const mobileNumber = mobileData
    .filter((m) => m.group.toString().toLowerCase() === dataParam)
    .map((e) => e.mobile);
  console.log(mobileNumber);
  console.log(mobileNumber);

  for (let i = 0; i < mobileNumber.length; i++) {
    // textData = req.body.text;
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendMessage(mobileNumber[i])
      .then(() => {
        res.json({ message: "success " });
        console.log("message send " + mobileNumber[i]);
        const message = new messageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        return;
      })
      .catch(function (error) {
        // console.log({ error: error.config.data });
        const daata = error.config;
        if ((daata === undefined) !== true) {
          // console.log(JSON.parse(error.config.data));
          res.json({ message: "sending fail" });
        } else {
          console.log("message send " + mobileNumber[i]);
          const message = new messageDB({
            mobileNo: mobileNumber[i],
          });
          message.save();
        }
        return;
      });
    // });
  }
});
router.post("/message", async (req, res, next) => {
  const date = "*/10 * * * * *";
  const mobileData = await employeedb.find();
  console.log(mobileData);
  const mobileNumber = mobileData.map((e) => e.mobile);
  console.log(mobileNumber);

  for (let i = 0; i < mobileNumber.length; i++) {
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendMessage(mobileNumber[i])
      .then(() => {
        res.json({ message: "success " });
        console.log("message send " + mobileNumber[i]);
        const message = new messageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        return;
      })
      .catch(function (error) {
        // console.log({ error: error.config.data });
        const daata = error.config;
        if ((daata === undefined) !== true) {
          // res.json({ message: "sending fail" });
          // console.log(JSON.parse(error.config.data));
        } else {
          console.log("message send " + mobileNumber[i]);
          const message = new messageDB({
            mobileNo: mobileNumber[i],
          });
          message.save();
        }
        return;
      });
    // });
  }
});
router.get("/message/send", async (req, res) => {
  try {
    await messageDB
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/message/rec", authenticate, async (req, res) => {
  try {
    await wmessageDB
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
