const express = require("express");
const userrouter = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

userrouter.post("/singup", async(req, res) => {
  const {name, email, password} = req.body;


  if(!name){
    return res.status(409).json({message: "Please Enter Name"});
  }
  if(!email){
    return res.status(409).json({message: "Please Enter Email"});
    }

    if(!password){
      return res.status(409).json({message: "Please Enter Password"});
    }

  let Email;
  try{
   Email = User.findOne({email: email});
  }catch(error){
  console.log(error);
  }
  if(Email){
  return res.status(409).json({message: "Email Aleady Exists, Please Login"});
  };

  const salt = await bcrypt.genSalt(Number(process.env.SALT));

  const hassedPassword = await bcrypt.hashSync(password, salt);

  let user = new User({
    name, email, password: hassedPassword 
  })

  try{
    await user.save();
  }catch(error){
   console.log(error);
  }

  return res.status(200).json({message: "User Created Sucessfully"});
  

})


module.exports = userrouter;
