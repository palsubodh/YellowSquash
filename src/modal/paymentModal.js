const mongoose = require('mongoose')

const PaymentModal = new mongoose.Schema({
    
    fullName:{type:String},
    emailId:{type:String},
    phone:{type:String},
    userID:{type:String},
    programId:{type:String},
    BatchId:{type:String},
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
    amount:{type:Number},
    currency:{type:String},
    method:{type:String},
    last4:{type:String},
    entity:{type:String},
    created_at:{type:String}

},{timestamps:true})

module.exports = mongoose.model("Payment",PaymentModal)