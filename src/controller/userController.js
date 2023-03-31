const userModel = require("../modal/userRegsiter");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
var request = require("request");
var speakeasy = require("speakeasy")

const Register = async (req, res) => {
  try {
    let data = req.body;
    let { fullName, email, phone, password } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter all fileds" });
    if (!fullName)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your FullName" });
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter your Email" });
    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your Phone Number" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Password" });

    const isDuplicateEmail = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (isDuplicateEmail) {
      if (isDuplicateEmail.email == email) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Provided EmailId: ${email} is already exist!`,
          });
      }
      if (isDuplicateEmail.phone == phone) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Provided Phone No.: ${phone} is already exist!`,
          });
      }
    }
    data.password = await bcrypt.hash(password, 10); //Encrepting the password using Bcrypt
    let storeData = await userModel.create(data);
    res
      .status(200)
      .send({
        status: true,
        message: "Registration successful",
        data: storeData,
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const login = async function (req, res) {
  try {
    let data = req.body;
    let { email, phone, password } = data;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter all fileds" });

    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your Phone Number" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Password" });

    let userdata = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (!userdata)
      return res
        .status(401)
        .send({ status: false, message: "You need to register first" });
    //--------------- Decrypt the Password and Compare the password with User input ----------------//
    let checkPassword = await bcrypt.compare(password, userdata.password);

    if (checkPassword) {
      let token = Jwt.sign(
        { userId: userdata["_id"].toString() },
        "yellowSquash@123",
        { expiresIn: "5min" }
      );
      res
        .status(200)
        .send({
          status: true,
          message: "Token Created Sucessfully",
          data: { token: token },
          userdata: userdata,
        });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const otptest = async(req,res)=>{
  let phone = req.body.phone
  var secret = speakeasy.generateSecret({length: 20})
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
  });
  //console.log(token)

var options = { method: 'GET',
url: `https://api.authkey.io/request?authkey=651ef6692f009509&mobile=${phone}&country_code=91&sid=7919&company=YellowSquash&otp=${token}`,

}

request(options, function (error, response, body) {
if (error) throw new Error(error);
res.status(200).send({status:true,message:body, secret: secret.base32, token })
});


}

module.exports = { Register, login ,otptest};
