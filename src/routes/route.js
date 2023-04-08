const express = require('express')
const router = express.Router()
const {Register,login,updateUserData} = require('../controller/userController')
const {phoneNumberStore, verifyOTP,forgetOTP,forgetverifyOTP} = require('../controller/cacheStrorage')
const {createProgram,getallPrograms,updatePrograms,deletePrograms,getprogrambyId}= require('../controller/programController')
const {createCategory,updateCategory,deleteCategory,getAllcategory,getSingleCategory,getListCategory}= require('../controller/categoryController')
/*************************Auths API ******************************************/

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
router.get("/getprogrambyId/:programId",getprogrambyId)
router.put("/updatePrograms",updatePrograms)
router.delete("/deletePrograms/:programId",deletePrograms)

/****************Category APIs**************/

router.post("/createcategory",createCategory)
router.put("/updateCategory",updateCategory)
router.delete("/deleteCategory/:categoryId/:category",deleteCategory)
router.get("/getAllcategory",getAllcategory)
router.get("/getSingleCategory/:category",getSingleCategory)
router.get("/getListCategory",getListCategory)

module.exports = router

