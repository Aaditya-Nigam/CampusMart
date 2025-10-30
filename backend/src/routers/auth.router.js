const express=require("express");
const { authSignUp, authSignIn, authLogout, authSendOTP } = require("../controllers/auth.controller");
const router=express.Router();

router.post("/signUp", authSignUp)

router.post("/signIn", authSignIn)

router.post("/logout", authLogout)

router.post("/send-otp", authSendOTP)

module.exports=router