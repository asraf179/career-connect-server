const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const User = new mongoose.model("user", userSchema);
var jwt = require("jsonwebtoken");
const authenticatedToken=require('../authenticatedToken');
const{UserProfile,Student,Alumni}=require('../schema/userProfileSchema')

require('dotenv').config();

//SignUp

router.post("/SignUp", async (req, res) => {
  try {
    const query = User.where({ email: req.body.email });
    const user = await query.findOne();
    if (user) {
      return res
        .status(409)
        .json({
          message: "User already registered with this email or username",
        });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "SignUp was successfull",
      user: newUser,
    });
  } catch {
    res.status(500).json({
      message: "Signed failed",
    });
  }
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (user ) {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isValidPassword) {
      const Profile=await UserProfile.findOne({email:req.body.email});
      const dumpProfile=Profile?Profile:null;
      console.log(dumpProfile);
      //jwt token
      const token = jwt.sign(
        {
          data: req.body.email,
        },
        process.env.access_token_secret,
        { expiresIn: "5h" }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
        })
        .send({ success: true, user: user,profile:dumpProfile});


    } else {
      res.status(401).json({
        error: "Authentication failed!",
      });
    }
  } else {
    res.status(401).json({
      error: "Authentication failed!",
    });
  }
});
router.get("/verify",authenticatedToken,async(req,res)=>{
     
      try{
        const userProfile=await UserProfile.findOne({email:req.user.data});
        if(userProfile){
         
          res.send({data:req.user.data,profile:userProfile});
        }
        else{
          res.send({data:req.user.data,profile:null});
        }
        
      }
      catch(err){
        res.send({err:err});
      }



});
router.post('/logout', (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure:true, 
  });

  // Optionally send a success response or redirect to the login page
  res.status(200).send({ message: 'Logged out successfully' });
});
module.exports = router;
