const Razorpay = require('razorpay');
const crypto = require("crypto")
const StatusCodes = require('http-status-codes')
require('dotenv').config({path:'./.env'})
const PaymentModal = require('../modal/paymentModal');




const orders = async(req,res)=>{
    try{
        const instance = new Razorpay({
         key_id: process.env.RAZORKEYID,
         key_secret: process.env.RAZORPAYSECERTID,
        });
        const options ={
            amount :req.body.amount*100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex")
        }
        instance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:"Something went wrong!"})
            }
            res.status(StatusCodes.OK).send({status:true,data:order})
        })
    }
    catch(err){
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
    }
}

const verify = async(req,res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body
        const sign = razorpay_order_id + "|" +razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAYSECERTID)
        .update(sign.toString())
        .digest("hex")

        if(razorpay_signature === expectedSign){
            // await paymentModal.create(req.body)
            const instance = new Razorpay({
                key_id: process.env.RAZORKEYID,
                key_secret: process.env.RAZORPAYSECERTID,
               });
            const payment = await instance.payments.fetch(razorpay_payment_id);
            return res.status(StatusCodes.OK).send({status:true,message:"Payment verified successfully",data:payment})
        }
        else
        {
            return res.status(StatusCodes.BAD_REQUEST).send({status:false,message:"Invaild signature sent!"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
    }
}

const PaymentStore = async(req,res)=>{
   try{
    let data = req.body
    if(!data) return res.status(StatusCodes.BAD_REQUEST).send({status:false,message:"Please Provide details"})
    let store = await PaymentModal.create(data)
    res.status(StatusCodes.OK).send({status:true})
   }
   catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
}

}

  

module.exports ={orders,verify,PaymentStore}