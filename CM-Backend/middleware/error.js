const ErrorHandler = require("../utils/errorhandler.js");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // If any Mongo Error occurs
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message,400)
    }

    //if Mongo duplicate keey error occurs
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`
        err = new ErrorHandler(message,400)
    }

    //if JWT token gets expired
    if(err.name==="TokenExpiredError"){
        const message = `Token Expired, Try Again.`
        err = new ErrorHandler(message,400)
    }

    //invalid JWT token
    if(err.name==="JsonWebTokenError"){
        const message = `Invalid Token, Try Again.`
        err = new ErrorHandler(message,400)
    }
  

    res.status(err.statusCode).json({
        success : false,
        message : err.message,
        error:err.stack
    })
}