const express = require('express')
const router = express.Router()
const {Register,login,updateUserData} = require('../controller/userController')
const {phoneNumberStore, verifyOTP} = require('../controller/cacheStrorage')

router.post("/otp",phoneNumberStore)
router.post("/register",Register)
router.post("/login",login)
router.post("/verifyOTP",verifyOTP)
router.put("/updateuser/:userId",updateUserData)



module.exports = router

