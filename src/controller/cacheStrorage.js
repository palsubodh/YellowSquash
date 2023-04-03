
const redis = require("redis");
const { promisify } = require("util");
var request = require("request");
var speakeasy = require("speakeasy")


const redisConnect = redis.createClient(
    14762,
  "redis-14762.c305.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);

redisConnect.auth("48pswqCxSIEIB04XzVBKDpGupkLW5Lko", function (err) {
  if (err) throw err;
});

redisConnect.on("connect", async function () {
  console.log("Redis is Connected...");
});

const GET_ASYNC = promisify(redisConnect.GET).bind(redisConnect);
const SET_ASYNC = promisify(redisConnect.SET).bind(redisConnect);
const SETEX_ASYNC = promisify(redisConnect.SETEX).bind(redisConnect);

const phoneNumberStore =  async (req,res)=>{

    try{
        let phone=req.body.phone
 

    await SET_ASYNC(`${"PhoneNumber"}`, JSON.stringify(phone));

        var secret = speakeasy.generateSecret({length: 20})
        const token = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });
        await SETEX_ASYNC(`${"otp"}`,60*5,JSON.stringify(token));
      
      var options = { method: 'GET',
      url: `https://api.authkey.io/request?authkey=651ef6692f009509&mobile=${phone}&country_code=91&sid=7919&company=YellowSquash&otp=${token}`,
      
      }
      
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.status(200).send({status:true,message:body, secret: secret.base32, token })
      });


   }

    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

// Endpoint to verify OTP
const verifyOTP = async (req, res) => {
  let { otp } = req.body;
  otp = `"${otp}"`
  let OtpMatch = await GET_ASYNC("otp")
  console.log(OtpMatch)

  if (otp === OtpMatch) {
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
   return  res.status(401).json({ message: 'Invalid OTP' });
  }
};



// const otptest = async(req,res)=>{
//     let phone = req.body.phone
//     var secret = speakeasy.generateSecret({length: 20})
//     const token = speakeasy.totp({
//       secret: secret.base32,
//       encoding: 'base32'
//     });
//     //console.log(token)
  
//   var options = { method: 'GET',
//   url: `https://api.authkey.io/request?authkey=651ef6692f009509&mobile=${phone}&country_code=91&sid=7919&company=YellowSquash&otp=${token}`,
  
//   }
  
//   request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   res.status(200).send({status:true,message:body, secret: secret.base32, token })
//   });
  
  
//   }
module.exports ={phoneNumberStore,GET_ASYNC,SET_ASYNC,verifyOTP}