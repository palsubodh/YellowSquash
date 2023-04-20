const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    userId:{type:String},
    user: {type: mongoose.Schema.Types.Mixed}

})

module.exports = mongoose.model("userCoupon",CouponSchema)
