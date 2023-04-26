const mongoose = require('mongoose')

const PaymentModal = new mongoose.Schema({
    
    fullName:{type:String},
    emailId:{type:String},
    phone:{type:String},
    userID:{type:String},
    prgramId:{type:String},
    BatchId:{type:String},
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
    razorpay_signature:{type:String}

})

module.exports = mongoose.model("Payment",PaymentModal)