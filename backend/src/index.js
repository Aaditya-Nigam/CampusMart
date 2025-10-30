const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv")
dotenv.config()

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening at port: ${PORT}`)
})