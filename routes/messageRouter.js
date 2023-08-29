const express = require("express");
// const fs = require("fs");
const db = require("../db/conn");
// const schedule = require("node-schedule");
const {
  sendLunchMessage,
  sendDinnerMessage,
  sendFeedbackMessageL,
  sendFeedbackMessageD,
} = require("../helper/messageHelper");
const employeedb = require("../models/EmploySchema");
const authenticate = require("../middleware/authenticate");
// const messageDB = require("../models/MessageSchema");
const whatsapplunch = require("../models/WmessageSchemaL");
const whatsappdinner = require("../models/WmessageSchemaD");
const lmessageDB = require("../models/LMessageSchema");
const dmessageDB = require("../models/DMessageSchema");
const { mongoose } = require("mongoose");
const lmenuDB = require("../models/LMenu");
const dmenuDB = require("../models/DMenu");
const whatsappfeedbacklunch = require("../models/FeedbackSchemaL");
const whatsappfeedbackdinner = require("../models/FeedbackSchemaD");
const router = express.Router();

router.post("/message/:gr", authenticate, async (req, res, next) => {
  const date = "*/10 * * * * *";
  const text = req.params.gr;
  const mobileData = await employeedb.find();
  console.log(mobileData);
  const filtergroup = mobileData.filter((e) => {
    return JSON.stringify(e.group[0][0]) === JSON.stringify(text);
  });
  console.log("FilterGroup", filtergroup);
  const dataParam = text.toLowerCase().toString();
  console.log(dataParam);
  const mobileNumber = await filtergroup.map((e) => e.mobile);
  console.log(mobileNumber);

  for (let i = 0; i < mobileNumber.length; i++) {
    // textData = req.body.text;
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendLunchMessage(mobileNumber[i])
      .then(() => {
        res.json({ message: "success " });
        const message = new messageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        console.log("message send " + mobileNumber[i]);
        return;
      })
      .catch(function (error) {
        // console.log({ error: error.config.data });
        const daata = error.config;
      });
  }
});
router.post(`/lunchmessage/:id`, async (req, res, next) => {
  const date = "*/10 * * * * *";
  const mobileData = await employeedb.find();
  const text = req.params.id;
  const dataparam = text.toLowerCase().toString();
  console.log(dataparam);

  const filtergroup = mobileData.filter((e) => {
    return JSON.stringify(e.group[0][0]) === JSON.stringify(text);
  });
  const { lvegmenu, lnonvegmenu } = req.query;
  const dataParam = text.toLowerCase().toString();
  console.log(dataParam);
  const mobileNumber = await filtergroup.map((e) => e.mobile);
  console.log(mobileNumber);

  // console.log(lvegmenu);

  for (let i = 0; i < mobileNumber.length; i++) {
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendLunchMessage(mobileNumber[i], lvegmenu, lnonvegmenu)
      .then(() => {
        res.json({ message: "success " });
        console.log("message send " + mobileNumber[i]);
        const message = new lmessageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        const menu = new lmenuDB({
          vegmenuname: lvegmenu,
          nonvegmenuname: lnonvegmenu,
        });
        menu.save();
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
          const message = new lmessageDB({
            mobileNo: mobileNumber[i],
          });
          message.save();
        }
        return;
      });
    // });
  }
});
router.post("/dinnermessage/:id", authenticate, async (req, res, next) => {
  const date = "*/10 * * * * *";
  // const mobileData = await employeedb.find();
  // const { dvegmenu, dnonvegmenu } = req.query;
  // console.log(mobileData);
  // const mobileNumber = mobileData.map((e) => e.mobile);
  // console.log(mobileNumber);

  const mobileData = await employeedb.find();
  const text = req.params.id;
  const dataparam = text.toLowerCase().toString();
  console.log(dataparam);

  const filtergroup = mobileData.filter((e) => {
    return JSON.stringify(e.group[0][0]) === JSON.stringify(text);
  });
  const { dvegmenu, dnonvegmenu } = req.query;

  const dataParam = text.toLowerCase().toString();
  console.log(dataParam);
  const mobileNumber = await filtergroup.map((e) => e.mobile);
  console.log(mobileNumber);
  for (let i = 0; i < mobileNumber.length; i++) {
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendDinnerMessage(mobileNumber[i], dvegmenu, dnonvegmenu)
      .then(() => {
        res.json({ message: "success " });
        console.log("message send " + mobileNumber[i]);
        const message = new dmessageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        const menu = new dmenuDB({
          vegmenuname: dvegmenu,
          nonvegmenuname: dnonvegmenu,
        });
        menu.save();
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
          const message = new dmessageDB({
            mobileNo: mobileNumber[i],
          });
          message.save();
        }
        return;
      });
    // });
  }
});
router.get("/message/lsend", authenticate, async (req, res) => {
  try {
    await lmessageDB
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/message/dsend", authenticate, async (req, res) => {
  try {
    await dmessageDB
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/message/reclunch", authenticate, async (req, res) => {
  try {
    await whatsapplunch
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/message/recdinner", authenticate, async (req, res) => {
  try {
    await whatsappdinner
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.post("/lunchfeedback", authenticate, async (req, res, next) => {
  const date = "*/10 * * * * *";
  const mobileData = await employeedb.find();
  console.log(mobileData);
  // const filtergroup = mobileData.filter((e) => {
  //   return JSON.stringify(e.group[0][0]) === JSON.stringify(text);
  // });
  // console.log("FilterGroup", filtergroup);
  // const dataParam = text.toLowerCase().toString();
  // console.log(dataParam);
  const mobileNumber = await mobileData.map((e) => e.mobile);
  console.log(mobileNumber);

  for (let i = 0; i < mobileNumber.length; i++) {
    // textData = req.body.text;
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendFeedbackMessageL(mobileNumber[i])
      .then(() => {
        res.json({ message: "success " });
        const message = new messageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        console.log("message send " + mobileNumber[i]);
        return;
      })
      .catch(function (error) {
        // console.log({ error: error.config });
        const daata = error.config;
      });
  }
});
router.post("/dinnerfeedback", authenticate, async (req, res, next) => {
  const date = "*/10 * * * * *";
  const mobileData = await employeedb.find();
  console.log(mobileData);
  // const filtergroup = mobileData.filter((e) => {
  //   return JSON.stringify(e.group[0][0]) === JSON.stringify(text);
  // });
  // console.log("FilterGroup", filtergroup);
  // const dataParam = text.toLowerCase().toString();
  // console.log(dataParam);
  const mobileNumber = await mobileData.map((e) => e.mobile);
  console.log(mobileNumber);

  for (let i = 0; i < mobileNumber.length; i++) {
    // textData = req.body.text;
    // schedule.scheduleJob(date, async () => {
    // console.log("The world is going to be end today!");
    // console.log(mobileNumber[26]);
    // var data = getTextMessageInput(mobileNumber);
    await sendFeedbackMessageD(mobileNumber[i])
      .then(() => {
        res.json({ message: "success " });
        const message = new messageDB({
          mobileNo: mobileNumber[i],
        });
        message.save();
        console.log("message send " + mobileNumber[i]);
        return;
      })
      .catch(function (error) {
        // console.log({ error: error.config });
        const daata = error.config;
      });
  }
});
router.get("/lunchfeedback", authenticate, async (req, res) => {
  try {
    await whatsappfeedbacklunch
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.get("/dinnerfeedback", authenticate, async (req, res) => {
  try {
    await whatsappfeedbackdinner
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
