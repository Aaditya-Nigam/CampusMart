const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv")
dotenv.config()

const authRouter=require("./routers/auth.router")
const connectDB = require("./lib/mongo")

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v/auth",authRouter)

const PORT=process.env.PORT
app.listen(PORT,async ()=>{
    console.log(`Listening at port: ${PORT}`)
    await connectDB()
})