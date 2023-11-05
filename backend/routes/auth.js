const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const {body,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUserData = require("../middleware/fetchUserData");

const JWT_SECRET = "MessManagement";

//create user
router.post("/signup",[
    body("name","Name must be atleast 5 characters").isLength({min:5}),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast 8 characters").isLength({min:8}),
    body("rollno","Invalid Roll Number").isLength({min:7})
],async(req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        let user = await User.findOne({email:req.body.email}); 
        if (user) {
            res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }
          user = await User.findOne({rollno:req.body.rollno});
        if (user) {
            res.status(400).json({success,error:"Sorry a user with this roll number already exists"})
        }
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password,salt);
        let currentDate = new Date();
        currentDate = currentDate.toLocaleDateString();
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
            rollno:req.body.rollno,
            img:req.body.img
        });

        console.log('gjkbjk');
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
    body("rollno","Invalid Roll Number").isLength({min:8})
],async (req,res)=>{
 const errors = validationResult(req);
 let success = false;
 if (!errors.isEmpty()) {
   return res.status(400).json({ success,errors: errors.array() });
 }
const {email,password} = req.body;

try {
 let user = await User.findOne({email});
 if (!user) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 }
 const passwordCompare = await bcryptjs.compare(password,user.password);
 if (!passwordCompare) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 } 
 //data for auth-token
 const data = {
   user:{
     id:user.id
   }
 }
 const authToken = jwt.sign(data,JWT_SECRET);
 success = true;
 res.json({success,authToken});

} catch (error) {
 console.log(error.message);
   res.status(500).send("Internal Server Error");
}
});
router.get("/getUserData",fetchUserData,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.log(error.message);
            res.status(500).send("Internal Server Error");
      }
});

router.post("/signupAdmin",[
    body("name","Name must be atleast 5 characters").isLength({min:5}),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast 8 characters").isLength({min:8})
],async(req,res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        let user = await Admin.findOne({email:req.body.email}); 
        if (user) {
            res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }
          
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password,salt);
        let currentDate = new Date();
        currentDate = currentDate.toLocaleDateString();
        user = await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
            img:req.body.img
        });
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

//
router.post("/loginAdmin",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
],async (req,res)=>{
 const errors = validationResult(req);
 let success = false;
 if (!errors.isEmpty()) {
   return res.status(400).json({ success,errors: errors.array() });
 }
const {email,password} = req.body;

try {
 let user = await Admin.findOne({email});
 if (!user) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 }
 const passwordCompare = await bcryptjs.compare(password,user.password);
 if (!passwordCompare) {
   return res.status(400).json({success,error:"Please try to login with correct credentials"});
 } 
 //data for auth-token
 const data = {
   user:{
     id:user.id
   }
 }
 const authToken = jwt.sign(data,JWT_SECRET);
 success = true;
 res.json({success,authToken});

} catch (error) {
 console.log(error.message);
   res.status(500).send("Internal Server Error");
}
});
router.get("/getAdminData",fetchUserData,async (req,res)=>{
    try {
        const userId=req.user.id;
        const user = await Admin.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.log(error.message);
            res.status(500).send("Internal Server Error");
      }
});
module.exports = router;