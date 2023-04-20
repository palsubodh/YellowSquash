const express = require('express')
const router = express.Router()



const {Register,login,updateUserData} = require('../controller/userController')
const {phoneNumberStore, verifyOTP,forgetOTP,forgetverifyOTP} = require('../controller/cacheStrorage')
const {createProgram,getallPrograms,updatePrograms,deletePrograms,getprogrambyId,upcomingProgram,programWeekPrice}= require('../controller/programController')
const {createCategory,updateCategory,deleteCategory,getAllcategory,getSingleCategory,getListCategory}= require('../controller/categoryController')

const {CreateDiscount,getCoupon,updateCoupon,deleteCoupon} = require('../controller/discountController')
const {createWebinar,getallWebinar,getallWebinarById,updateWebinar,deleteWebinar,upcomingWebinar}= require('../controller/webinarController')

const {wcreateCategory,wupdateCategory,wdeleteCategory,wgetAllcategory,wgetSingleCategory,wgetListCategory}= require('../controller/webinarCategory')

const {create,getAllHealthPedia,getHealthPediaById,updateHealthpedia,deleteHealthPedia}= require('../controller/healthPediaController')



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
router.get("/upcoming",upcomingProgram)
router.post("/programWeekPrice",programWeekPrice)

/****************Category APIs**************/

router.post("/createcategory",createCategory)
router.put("/updateCategory",updateCategory)
router.delete("/deleteCategory/:categoryId/:category",deleteCategory)
router.get("/getAllcategory",getAllcategory)
router.get("/getSingleCategory",getSingleCategory)
router.get("/getListCategory",getListCategory)

/****************Discount APIs**************/

router.post("/creatediscount",CreateDiscount)
router.get("/getCoupon/:couponCode",getCoupon)
router.put("/updateCoupon",updateCoupon)
router.delete("/deleteCoupon/:couponId",deleteCoupon)

/**************WEBINAR API****************************/

router.post("/createwebinar",createWebinar)
router.get("/getwebinar",getallWebinar)
router.get("/getwebinar/:webinarId",getallWebinarById)
router.put("/getwebinar",updateWebinar)
router.delete("/getwebinar/:webinarId",deleteWebinar)
router.get("/upcomingwebinar",upcomingWebinar)


/********WEBINAR CATEGORY API*********************************/

router.post("/wcreatecategory",wcreateCategory)
router.put("/wupdateCategory",wupdateCategory)
router.delete("/wdeleteCategory/:categoryId/:category",wdeleteCategory)
router.get("/wgetAllcategory",wgetAllcategory)
router.get("/wgetSingleCategory",wgetSingleCategory)
router.get("/wgetListCategory",wgetListCategory)

/******** HealthPedia API*********************************/

router.post("/createHealthPedia", create)
router.get("/allhealthPedia",getAllHealthPedia)
router.get("/gethealthPedia/:Id",getHealthPediaById)
router.put("/updatehealthPedia",updateHealthpedia)
router.delete("/deletehealthPedia/:healthPediaId",deleteHealthPedia)



module.exports = router

