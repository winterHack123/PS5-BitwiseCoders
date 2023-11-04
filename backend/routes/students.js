const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const Attendance = require("../models/Attendance");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUserData = require("../middleware/fetchUserData");

//
router.get("/fetchallstudents", fetchUserData, async (req, res) => {
  try {
    //using user id we added in every note of our note collection we traverse all of them to find notes with the user id and return them
    const students = await Attendance.find({ user: req.user.id });
//

//
    res.json(students);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addstudent",
  fetchUserData,
  async (req, res) => {
    try {
      const {user} = req.body;
      //if there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    //   const currentUser = await User.findOne({user:req.user.id});
      const currentUser = await User.findById(user);
      // console.log(currentUser);
      let currentDate = new Date();
      const expTime = currentDate.getHours()+2 * 60 * 60 * 1000;
      currentDate = currentDate.toLocaleString();
      const std = new Attendance({
        user: req.user.id,
        date: currentDate,
        username:currentUser.name,
        img:currentUser.img,
        rollno:currentUser.rollno,
        email:currentUser.email,
        exptime:expTime
      });
      const savedStudent = await std.save();
      res.json(savedStudent);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
