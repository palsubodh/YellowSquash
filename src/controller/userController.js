const userModel = require("../modal/userRegsiter");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const {SET_ASYNC,GET_ASYNC}=require('./cacheStrorage')

const Register = async (req, res) => {
  try {
    let data = req.body;
    let { fullName, email, password,phone } = data;
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

    const isDuplicate = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (isDuplicate) {
      if (isDuplicate.email == email) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Provided EmailId: ${email} is already exist!`,
          });
      }
      if (isDuplicate.phone == phone) {
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
    if (storeData) {
      let token = Jwt.sign(
        { userId: storeData._id["_id"].toString() },
        "yellowSquash@123",
        { expiresIn: "5min" }
      );
    res
      .status(200)
      .send({
        status: true,
        message: "Registration successful",
        data: storeData,
        token:token
      });
    }

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

    if (!phone && !email)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Your Phone Number and Email" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Password" });

    let userdata = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
  let obj={}
  obj.fullName=userdata.fullName
  obj.email=userdata.email
  obj.phone=userdata.phone
  obj._id=userdata._id
  obj.role=userdata.role
    if (!userdata)
      return res
        .status(401)
        .send({ status: false, message: "You need to register first" });
    //--------------- Decrypt the Password and Compare the password with User input ----------------//
    let checkPassword = await bcrypt.compare(password, userdata.password);

    if(!checkPassword) return res.status(400).send({status:false,message:"Please enter valid password"})

    if (checkPassword) {
      let token = Jwt.sign(
        { userId: userdata["_id"].toString() },
        "yellowSquash@123",
        { expiresIn: "24h" }
      );
      res
        .status(200)
        .send({
          status: true,
          message: "Token Created Sucessfully",
          data: { token: token },
          userdata:obj
        });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const updateUserData = async function (req, res) {

  try {
    
      let data = req.body
      let userId = req.body.userId
      let { password } = data
      let user = await userModel.findById(userId)
      if (password) {
          user.password = await bcrypt.hash(password, 10)
      }
      let updateUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: user,updatedAt: new Date(Date.now()) }, { new: true })
      if (!updateUser) { return res.status(200).send({ status: true, message: "User not exist with this UserId." }) }
      return res.status(200).send({ status: true, message: "Credentials are updated" })
  } 
  catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}



module.exports = { Register, login ,updateUserData};
