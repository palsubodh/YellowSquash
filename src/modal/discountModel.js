const mongoose = require('mongoose')
const DiscountSchema = new mongoose.Schema({
    startDate:{type:String},
    expireDate:{type:String},
    couponCode:{type:String},
    programName:{type:String},
    price:{type:Number},
    discount:{type:Number}

},{timestamps:true})

module.exports = mongoose.model("coupon",DiscountSchema)