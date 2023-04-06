

var request = require("request");
var speakeasy = require("speakeasy")
const userModel = require('../modal/userRegsiter')
const otpModal = require('../modal/otpModal')

const phoneNumberStore =  async (req,res)=>{
    try{
        let phone=req.body.phone
        let userfind = await userModel.findOne({phone:phone})
        if(userfind) return res.status(400).send({status:false,message:"Mobile number already registered"})
        var secret = speakeasy.generateSecret({length: 20})
        const token = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });
      var options = { method: 'GET',
      url: `https://api.authkey.io/request?authkey=651ef6692f009509&mobile=${phone}&country_code=91&sid=7919&company=YellowSquash&otp=${token}`,
      }
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
    otpModal.create({mobile:phone,token:token,secret:secret.base32 })   
  res.status(200).send({status:true,message:"OTP send successfully" })
      });
    
   }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

 const verifyOTP = async (req, res) => {
  try{
    let { mobile,otp } = req.body;
    if(!mobile) return res.status(400).send({status:false,message:"Please enter your Phone Number"})
    if(!otp) return res.status(400).send({status:false,message:"Please enter otp"})
  let token = await otpModal.findOne({mobile:mobile,token:otp})
  if (token) {
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
   return  res.status(401).json({ message: 'Invalid OTP' });
  }
  }
  catch(err){
    res.status(500).send({status:false,message:err.message})
  }
};


const forgetOTP =  async (req,res)=>{
  try{
      let phone=req.body.phone
      let checkPhone = await userModel.find({phone:phone})
      if(checkPhone.length==0) return res.status(400).send({status:false,message:"Phone number is not Registered "})
      var secret = speakeasy.generateSecret({length: 20})
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
      });


    var options = { method: 'GET',
    url: `https://api.authkey.io/request?authkey=651ef6692f009509&mobile=${phone}&country_code=91&sid=7919&company=YellowSquash&otp=${token}`,
    }
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    otpModal.create({mobile:phone,token:token,secret:secret.base32 })
    res.status(200).send({status:true,message:"OTP Send successfully" })
    });
 }
  catch(err){
      res.status(500).send({status:false,message:err.message})
  }

}





const forgetverifyOTP = async (req, res) => {
  try{
    let { mobile,otp } = req.body;
    if(!mobile) return res.status(400).send({status:false,message:"Please enter your Phone Number"})
    if(!otp) return res.status(400).send({status:false,message:"Please enter otp"})

    let findUser= await userModel.findOne({phone:mobile})
     if(!findUser) return res.status(400).send({status:false,message:"Please registered first"})
  let token = await otpModal.findOne({mobile:mobile,token:otp})
  if (token) {
    return res.status(200).json({ message: 'OTP verified successfully',userId:findUser._id });
  } else {
   return  res.status(401).json({ message: 'Invalid OTP' });
  }
  }
  catch(err){
    res.status(500).send({status:false,message:err.message})
  }
};

module.exports ={phoneNumberStore,verifyOTP,forgetOTP,forgetverifyOTP}



