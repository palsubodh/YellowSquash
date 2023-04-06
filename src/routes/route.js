const express = require('express')
const router = express.Router()
const {Register,login,updateUserData} = require('../controller/userController')
const {phoneNumberStore, verifyOTP,forgetOTP,forgetverifyOTP} = require('../controller/cacheStrorage')
const {createProgram,getallPrograms,updatePrograms,deletePrograms}= require('../controller/programController')

router.post("/otp",phoneNumberStore)
router.post("/register",Register)
router.post("/login",login)
router.post("/verifyOTP",verifyOTP)
router.post("/forgetotp",forgetOTP)
router.post("/verifyforgetOtp",forgetverifyOTP)
router.put("/updateuser",updateUserData)


/*******************API FOR PROGRAMS**********************************/

router.post("/createprogram",createProgram)
router.get("/getprograms",getallPrograms)
router.put("/updatePrograms",updatePrograms)
router.delete("/deletePrograms/:programId",deletePrograms)

module.exports = router

