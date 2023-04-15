const DiscountModal = require('../modal/discountModel')
const StatusCodes = require('http-status-codes')
const moment = require('moment')

const CreateDiscount = async(req,res)=>{

    try{
        let data = req.body
    let {startDate,expireDate,programName,price,discount}= data
    if(Object.keys(data).length==0) return res.status(StatusCodes.BAD_REQUEST).send({status:false,message:"Please Enter All Fileds"})
    if(!startDate) return res.status(400).send({status:false,message:"Please Provide startDate"})
    if(!expireDate) return res.status(400).send({status:false,message:"Please Provide expireDate"})
    if(!programName) return res.status(400).send({status:false,message:"Please Provide programName"})
    if(!price) return res.status(400).send({status:false,message:"Please Provide price"})
    if(!discount) return res.status(400).send({status:false,message:"Please Provide discount"})

    let storeData = await DiscountModal.create(data)
    res.status(StatusCodes.OK).send({status:true,message:"Discount created successfully"})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
       }
}

const getCoupon= async(req,res)=>{
    try{
        let couponCode = req.params.couponCode
        let findcoupon = await DiscountModal.findOne({couponCode:couponCode})
        if(!findcoupon) return res.status(StatusCodes.BAD_REQUEST).send({status:false,message:"Invalid coupon"})
    const start = moment(findcoupon.startDate);
const expire = moment(findcoupon.expireDate);
const remainingDays = expire.diff(start, 'days');
  
       if(remainingDays>0){
        res.status(StatusCodes.OK).send({status:true,couponcode:findcoupon.couponCode})
       }
       else{
        res.status(StatusCodes.BAD_REQUEST).send({status:false,message:"CouponExpire"})
       }
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
       }
}
const updateCoupon = async (req,res)=>{
    try{
     let couponId = req.body.couponId
     let data = await DiscountModal.findOneAndUpdate({_id:couponId},req.body,{new:true})
     data.updatedAt=new Date(Date.now())
     if(!data) return res.status(400).send({status:false,message:"No coupon found"})
    return res.status(200).send({status:true,message:"coupon updated successfully",data:data})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }

 const deleteCoupon = async (req,res)=>{
    try{
     let couponId = req.body.couponId
     let data = await DiscountModal.deleteOne({_id:couponId})
     if(!data) return res.status(400).send({status:false,message:"No coupon found"})
    return res.status(200).send({status:true,message:"coupon deleted successfully"})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }




module.exports ={CreateDiscount,getCoupon,updateCoupon,deleteCoupon}