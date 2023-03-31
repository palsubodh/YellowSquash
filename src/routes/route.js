const express = require('express')
const router = express.Router()
const {Register,login,otptest} = require('../controller/userController')

router.post("/register",Register)
router.post("/login",login)
router.get("/otptest",otptest)



module.exports = router

