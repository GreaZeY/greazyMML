const app = require("./app")

const connectDatabase = require('./database/db')
const cloudinary = require("cloudinary")
const host = 'localhost'

//handling Uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server")
    process.exit(1)
})
// configs
if(process.env.MODE!=='DEPLOYED'){
require('dotenv').config({ path: "configs/config.env" })
}
const port = process.env.PORT
console.log(process.env)
connectDatabase()

cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    }
)

const server =  app.listen(port, () => {
    console.log(`Server : ${host}:${port}`)
})


// Unhandeled promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server")
    server.close(()=>{
        process.exit(1)
    })
})