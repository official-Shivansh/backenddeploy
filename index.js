const express = require("express")
const cors = require("cors")
const {connection} = require("./db")
const {userRoute} = require("./routes/userRoute")
const {employeeRouter} = require("./routes/employeeRoute")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())


app.use("/user",userRoute)
app.use("/dashboard",employeeRouter)




app.listen(process.env.PORT,async(req,res)=>{
    try{
        await connection
        console.log("server is running on port 8080")
    }
    catch(e){
        console.log(e)
    }
})