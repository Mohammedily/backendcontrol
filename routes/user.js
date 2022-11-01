const express = require("express");
const userrouter = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

userrouter.post("/singup", async(req, res) => {
  const {name, email, password} = req.body;

  let Email;
  try{
   Email = User.findOne({email: email});
  }catch(error){
  console.log(error);
  }
  if(Email){
  return res.status(409).json({message: "Email Aleady Exists, Please Login"});
  };

  const 
  

})


module.exports = userrouter;
