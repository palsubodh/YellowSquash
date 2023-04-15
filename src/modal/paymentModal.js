const mongoose = require('mongoose')

const PaymentModal = new mongoose.Schema({
    
    fullName:{type:String},
    emailId:{type:String},
    phone:{type:String},
    address:{type:String},
    "city/town/district":{type:String},
    pincode:{type:Number},
    state:{type:String},
    country:{type:String},

})

module.exports = mongoose.model("Payment",PaymentModal)