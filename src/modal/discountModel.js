const mongoose = require('mongoose')
const DiscountSchema = new mongoose.Schema({
    startDate:{type:String},
    expireDate:{type:String},
    couponCode:{type:String},
    programId:{type:String},
    discount:{type:Number}

},{timestamps:true})

module.exports = mongoose.model("coupon",DiscountSchema)