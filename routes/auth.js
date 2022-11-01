const express = require("express");

const authrouter = express.Router();

const User = require("../model/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const sendEmail = require("./sendemail");

authrouter.post("/signin", async(req, res) => {
  const {email, password} = req.body;


  if (!email) {
    return res.status(409).json({ message: 'Please Enter Email' });
  }

  if (!password) {
    return res.status(409).json({ message: 'Please Enter Password' });
  }
  
    let existing;
    try {
        existing = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }

   if(!existing){
    return res.status(400).json({message: "Please Register, After Login"});
   }

   const comparePassword = await bcrypt.compareSync(password, existing.password);


   if(!comparePassword){
    return res.status(400).json({message: "Incorrect Password"});
   }

   const token = jwt.sign({_id: this._id}, process.env.JWTKEY ,
    {
        "expiresIn":"1h"
    })

    return res.status(200).json({data: token, message: "Login Sucessfully", user: existing});
  
  
});
// forgot password Random Generate password to send User //
authrouter.post("/forgot-password", async(req, res) => {
  const {email} = req.body;

  let user = await User.findOne({email: email});

 if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)
  
  let randompassword = generatePassoword(8, UPPERCASE_CHAR_CODES, LOWERCASE_CHAR_CODES, NUMBER_CHAR_CODES,SYMBOL_CHAR_CODES)
   function generatePassoword(characterAmount, includeUppercase, includeNumbers, includeSymbols){
     let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array;
   }

  
  const url = `
  Hi ${user.name},
  Note*: Dear User Your Password Has Changed,
  I will Choose Your Password Random.
  You will use this password: ${randompassword}.
  You Can Use Password on Futhure Use.
  Thank You....

  Send By,
  Email: ${process.env.USER}`;
  
		await sendEmail(user.email, "Password Reset", url);

const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(randompassword, salt);

        user.password = hashPassword;
        await user.save();
  
		res
			.status(200)
			.send({ message: "Password Changed" });
  
});


module.exports = authrouter;
 
