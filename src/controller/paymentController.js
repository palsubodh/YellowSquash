const PaymentModal = require('../modal/paymentModal')
const StatusCodes = require('http-status-codes')

const createPayment = async(req,res)=>{
   try{
    let data = req.body
    let storeData = await PaymentModal.create(data)
    res.status(StatusCodes.OK).send({status:true,message:"Details Submitted",data:storeData})
   }
   catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
   }
}


module.exports={createPayment}