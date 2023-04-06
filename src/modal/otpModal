const mongoose = require('mongoose')


const otpSchema = new mongoose.Schema({
    mobile:{type:String},
    token:{type:String},
    secret:{type:String},
},{timestamps:true})

module.exports = mongoose.model("otp",otpSchema)