const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: true 
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true 
    },
    profilePic: {
        type: String,
        default: "" 
    },
    rating: {
        type: Number,
        default: 0 
    },
    theme: {
        type: String,
        default: 'dark'
    }
},{timestamps: true})

const User=mongoose.model("User",userSchema)
module.exports=User