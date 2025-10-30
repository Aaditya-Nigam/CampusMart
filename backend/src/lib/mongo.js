const mongoose=require("mongoose")

const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo db connection: ",connect.connection.host)
    } catch (error) {
        console.log("Error in connectDB: ",error)
    }
}

module.exports=connectDB