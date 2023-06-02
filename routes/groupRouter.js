const express = require("express");
const groupDB = require("../models/GroupSchema");
const router = express.Router();
router.post("/group", async (req, res) => {
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
      const storeGroup = await group.save();
      res.status(200).json({ status: 201, storeGroup });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log(error);
  }
});
router.put("/group/:id", async (req, res) => {
  //   res.send("group updated");
  try {
    await groupDB.findByIdAndUpdate(req.params.id, {
      groupName: req.body.groupName,
      createdBy: req.body.createdBy,
      isActive: req.body.isActive,
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
});

router.get("/group", async (req, res) => {
  try {
    await groupDB
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
