const generateToken = require("../lib/auth");
const sendVerificationEmail  = require("../lib/email");
const User = require("../models/auth.model");
const bcrypt=require("bcrypt")

const authSignUp=async (req,res)=>{
    try {
        const {fullName,userName,email,password}=req.body
        if(!fullName || !userName || !email || !password){
            res.status(401).json({message: "Fields are missing!"});
            return ;
        }
        let user=await User.findOne({userName: userName})
        if(user){
            res.status(401).json({message: "UserName already taken!"})
            return ;
        }
        user=await User.findOne({email: email})
        if(user){
            res.status(401).json({message: "Email already taken!"})
            return ;
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
        })
        if(!newUser){
            res.status(401).json({message: "Internal server error!"})
            return ;
        }
        const token=generateToken(res,newUser._id)
        if(!token){
            res.status(401).json({message: "Internal server error!"})
            return ;
        }
        await newUser.save()
        res.status(201).json({
            fullName,
            userName,
            email,
            role: newUser.role,
            profilePic: newUser.profilePic,
            rating: newUser.rating,
            theme: newUser.theme
        })
    } catch (error) {
        res.status(401).json({message: "Internal server error!"})
        console.log("Error in auth.controller signUp: ",error.message)
    }
}

const authSignIn=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(401).json({message: "Fields are missing!"});
            return ;
        }
        const user=await User.findOne({email: email})
        if(!user){
            res.status(401).json({message: "Invalid credentials!"})
            return ;
        }
        const check=await bcrypt.compare(password,user.password)
        if(!check){
            res.status(401).json({message: "Invalid credentials!"})
            return ;
        }
        const token=generateToken(res,user._id)
        if(!token){
            res.status(401).json({message: "Internal server error!"})
            return ;
        }
        res.status(201).json({
            fullName,
            userName,
            email,
            role: newUser.role,
            profilePic: newUser.profilePic,
            rating: newUser.rating,
            theme: newUser.theme
        })
    } catch (error) {
        res.status(401).json({message: "Internal server error!"})
        console.log("Error in auth.controller signIn: ",error.message)
    }
}

const authLogout=async (req,res)=>{
    try {
        res.cookie('jwt', "", {
            maxAge: 0
        })
        res.status(201).json({message: "Logout successfully!"})
    } catch (error) {
        res.status(401).json({message: "Internal server error!"})
        console.log("Error in auth.controller logout: ",error.message)
    }
}

const authSendOTP=async (req,res)=>{
    try {
        const {otp,email}=req.body
        await sendVerificationEmail(email,otp)
        res.status(201).json({message: "OTP send successfully!"})
    } catch (error) {
        console.log("Error in authSendOTP: ",error)
        res.status(401).json({message: "Internal server error!"})
    }
}

module.exports={
    authSignUp,
    authSignIn,
    authLogout,
    authSendOTP
}