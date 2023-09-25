const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/userModel")
const userRoute = express.Router()
require("dotenv").config()


userRoute.post("/signup",async(req,res)=>{
    const {email,password,confirmPassword} = req.body
    const user = await UserModel.find({email})
    console.log(user)
    if(user.length){
        res.json({ msg: "User already exist, please login" });
    }else{
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
              if (err) {
                res.json({ msg: err });
              } else {
                const user = new UserModel({
                  email,
                  password: hash,
                  confirmPassword: hash,
                });
                console.log(user)
                await user.save();
                res.json({ msg: "User Registered, please login" });
              }
            });
          } catch (err) {
            res.json({ msg: err });
          }
    }

})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.json({ msg: "User is not exist, please register" });
    } else {
      try {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user._id, email: user.email },process.env.secretCode);
            console.log(token)
            if (token) {
              jwt.verify(token,process.env.secretCode,(err, decoded) => {
                if (decoded) {
                  res.json({
                    msg: "Succesfully login",
                    token: token,
                    email:decoded.email
                  });
                } else {
                  res.json({ msg: err });
                }
              });
            }
          } else {
            res.json({ msg: "User credentials are wrong" });
          }
        });
      } catch (err) {
        res.json({ msg: err });
      }
    }
  });
  module.exports = { userRoute };