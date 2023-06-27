const express = require("express");
const jwt = require("jsonwebtoken");
const employeedb = require("../models/EmploySchema");
const { ObjectId } = require("mongodb");
const authenticate = require("../middleware/authenticate");
const activitydb = require("../models/ActivitySchema");
const groupDB = require("../models/GroupSchema");
const router = new express.Router();
router.post("/employee", authenticate, async (req, res) => {
  //   res.json({ message: "gffgdsfgfgdfsdfgfhgdfd" });
  const { fname, lname, email, mobile, isActive, location, group } = req.body;
  if (!fname || !email || !mobile || !location || !group) {
    res.status(422).json({ error: "fill the details" });
  }
  try {
    const preuser = await employeedb.findOne({ mobile: mobile });

    if (preuser) {
      res.status(422).json({ error: "This mobile no is already exists" });
    } else {
      const groupId = await groupDB.find();
      const groupArr = groupId.filter((e) => e.groupName == group);
      // console.log(groupArr);

      const groupArrData = "" + groupArr.map((e) => e._id);
      // const dataarray = "" + groupArrData;

      console.log(typeof groupArrData);
      // const passGrpData = groupArrData == [] ? null : groupArrData;
      // console.log(groupArrData);
      // const finalgrpdata = passGrpData.length > 0 ? passGrpData : null;
      const employee = new employeedb({
        fname,
        lname,
        email,
        group: groupArrData,
        mobile,
        location,
        isActive,
      });
      const token = req.headers.authorization.split(" ")[1];
      const finalActivity = await new activitydb({
        token: token,
        action: "employee added",
      });
      await finalActivity.save();
      const storeempData = await employee.save();
      await res.status(200).json({ status: 201, storeempData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch error", error);
  }
});
router.get("/employee", authenticate, async (req, res) => {
  // let token = url.parse(req.url, true).query.token;
  try {
    const token = req.headers.authorization;
    const finalActivity = await new activitydb({
      token: token,
      action: "employee list view",
    });
    finalActivity.save();
    await employeedb
      .find(req.query)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.put("/employee/:id", authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const oldGroup = await employeedb.findById(req.params.id);
    const { fname, lname, email, group, location, mobile, isActive } = oldGroup;
    const finalActivity = await new activitydb({
      token: token,
      action: "employee details updated",
      prevData: [fname, lname, email, group, location, mobile, isActive],
      updatedData: [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.group,
        req.body.location,
        req.body.mobile,
        req.body.isActive,
      ],
    });
    const groupId = await groupDB.find();
    const groupArr = groupId.filter((e) => e.groupName == req.body.group);
    // console.log(groupArr);
    const groupArrData = "" + groupArr.map((e) => e._id);
    console.log(typeof groupArrData);
    await employeedb.findByIdAndUpdate(req.params.id, {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      group: [...group].concat(groupArrData),
      location: req.body.location,
      mobile: req.body.mobile,
      isActive: req.body.isActive,
    });
    await finalActivity.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Error");
  }
});
router.delete("/employee/:id", authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const finalActivity = await new activitydb({
      token: token,
      action: "employee deleted",
    });
    await finalActivity.save();
    await employeedb.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "successfully deleted employee" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
