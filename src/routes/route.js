const express = require('express')
const router = express.Router()
const {Register,login} = require('../controller/userController')
const {phoneNumberStore, verifyOTP} = require('../controller/cacheStrorage')

router.post("/otp",phoneNumberStore)
router.post("/register",Register)
router.post("/login",login)
router.post("/verifyOTP",verifyOTP)
// router.get("/otptest",otptest)



module.exports = router

