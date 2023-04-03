const userModel = require("../modal/userRegsiter");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const {SET_ASYNC,GET_ASYNC}=require('./cacheStrorage')

const Register = async (req, res) => {
  try {
    let data = req.body;
    let cachePhone = await GET_ASYNC("PhoneNumber")
    cachePhone= JSON.parse(cachePhone)
    // console.log(cachePhone)
    let { fullName, email, password } = data;
    data["phone"]=cachePhone

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
    // if (!phone)
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Please Enter Your Phone Number" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Password" });

    const isDuplicateEmail = await userModel.findOne({
      $or: [{ email: email }, { phone: cachePhone }],
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
      if (isDuplicateEmail.phone == cachePhone) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Provided Phone No.: ${cachePhone} is already exist!`,
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



module.exports = { Register, login };
