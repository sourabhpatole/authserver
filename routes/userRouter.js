const express = require("express");
const employeedb = require("../models/EmploySchema");
const router = new express.Router();
router.post("/employee", async (req, res) => {
  //   res.json({ message: "gffgdsfgfgdfsdfgfhgdfd" });
  const { fname, lname, email, mobile, isActive, location, group } = req.body;
  if (!fname || !email || !mobile || !location) {
    res.status(422).json({ error: "fill the details" });
  }
  try {
    const preuser = await employeedb.findOne({ mobile: mobile });

    if (preuser) {
      res.status(422).json({ error: "This mobile no is already exists" });
    } else {
      const employee = new employeedb({
        fname,
        lname,
        email,
        group,
        mobile,
        location,
        isActive,
      });

      const storeempData = await employee.save();
      await res.status(200).json({ status: 201, storeempData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch error", error);
  }
});
router.get("/employee", async (req, res) => {
  try {
    await employeedb
      .find(req.query)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});
router.put("/employee/:id", async (req, res) => {
  try {
    await employeedb.findByIdAndUpdate(req.params.id, {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      group: req.body.group,
      mobile: req.body.mobile,
      isActive: req.body.isActive,
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Error");
  }
});
router.delete("/employee/:id", async (req, res) => {
  try {
    await employeedb.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "successfully deleted employee" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
