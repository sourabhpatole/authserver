const express = require("express");
const groupDB = require("../models/GroupSchema");
const authenticate = require("../middleware/authenticate");
const activitydb = require("../models/ActivitySchema");
const router = express.Router();
router.post("/group", authenticate, async (req, res) => {
  //   res.send("group created");
  const { groupName, createdBy, isActive } = req.body;
  if (!groupName) {
    res.status(422).json({ error: "Fill the Group name" });
  }
  try {
    const preGroup = await groupDB.findOne({ groupName: groupName });
    if (preGroup) {
      res.status(422).json({ error: "This Group already exists" });
    } else {
      const group = new groupDB({
        groupName,
        createdBy,
        isActive,
      });
      const token = req.headers.authorization.split(" ")[1];
      const finalActivity = await new activitydb({
        token: token,
        action: "group created",
      });
      await finalActivity.save();
      const storeGroup = await group.save();
      res.status(200).json({ status: 201, storeGroup });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log(error);
  }
});
router.put("/group/:id", authenticate, async (req, res) => {
  //   res.send("group updated");
  try {
    const oldGroup = await groupDB.findById(req.params.id);
    const { groupName, createdBy, isActive } = oldGroup;
    // console.log(groupName, createdBy);
    await groupDB.findByIdAndUpdate(req.params.id, {
      groupName: req.body.groupName,
      createdBy: req.body.createdBy,
      isActive: req.body.isActive,
    });
    const token = req.headers.authorization.split(" ")[1];
    const finalActivity = await new activitydb({
      token: token,
      action: "group edited",
      prevData: [groupName, createdBy, isActive],
      updatedData: [req.body.groupName, req.body.createdBy, req.body.isActive],
    });
    await finalActivity.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
});

router.get("/group", authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const finalActivity = await new activitydb({
      token: token,
      action: "group list view",
    });
    await groupDB
      .find()
      .then((data) => res.json(data))
      .then(finalActivity.save())
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
