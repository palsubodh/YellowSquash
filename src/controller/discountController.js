const DiscountModal = require("../modal/discountModel");
const StatusCodes = require("http-status-codes");
const UserCouponDetails = require("../modal/userCouponModel");
const moment = require("moment");

const CreateDiscount = async (req, res) => {
  try {
    let data = req.body;
    let { startDate, expireDate, programId, price, discount } = data;
    if (Object.keys(data).length == 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: false, message: "Please Enter All Fileds" });
    if (!startDate)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide startDate" });
    if (!expireDate)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide expireDate" });
    if (!programId)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide programId" });
    if (!discount)
      return res
        .status(400)
        .send({ status: false, message: "Please Provide discount" });
    let storeData = await DiscountModal.create(data);
    res
      .status(StatusCodes.OK)
      .send({
        status: true,
        message: "Discount created successfully",
        data: storeData,
      });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: false, message: err.message });
  }
};

const getCoupon = async (req, res) => {
  try {
    let couponCode = req.params.couponCode;
    let programId = req.params.programId;
    let userId = req.params.userId;
    let price = req.params.price;
    let findcoupon = await DiscountModal.findOne({
      couponCode: couponCode,
      programId: programId,
    });
    if (!findcoupon)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: false, message: "Invalid coupon" });
    
    const currentDate = moment().format('YYYY-MM-DD');
    const expire = moment(findcoupon.expireDate);
    const remainingDays = expire.diff(currentDate, "days");

    if (remainingDays > 0) {
      let checkalreadyuseCoupon = await UserCouponDetails.find({
        userId: userId,
      });
      if (checkalreadyuseCoupon.length != 0) {
        let x = checkalreadyuseCoupon[0].user;

        let count1 = 0;
        // for check programId present or not
        for (let i = 0; i < x.length; i++) {
          count1++;
          if (x[i].programId == programId) {
            let dicountedPrice = x[i].price;
            let count = 0;
            let y = x[i].couponStatus;
            for (let j = 0; j < y.length; j++) {
              let checkCouponStatus = y[j];

              if (
                checkCouponStatus.couponCode == couponCode &&
                checkCouponStatus.status == true
              )
                count++;
            }
            if (count == 1)
              return res
                .status(StatusCodes.BAD_REQUEST)
                .send({
                  status: false,
                  message: "This coupon is already used",
                });
            else {
              dicountedPrice =
                dicountedPrice - dicountedPrice * (findcoupon.discount / 100);
              y.push({ couponCode: couponCode, status: true });
              x[i].couponStatus = y;
              x[i].price = dicountedPrice;
              let persistPayload = await UserCouponDetails.findOneAndUpdate(
                { userId },
                { user: x },
                { new: true }
              );
              return res
                .status(StatusCodes.OK)
                .send({ status: true, dicountedPrice: dicountedPrice });
            }
          }
        }
        // if  programId is not present
        if (count1 == x.length) {
          let obj = {};
          obj.programId = programId;
          obj.couponStatus = [{ couponCode: couponCode, status: true }];
          price = price - price * (findcoupon.discount / 100);
          obj.price = price;
          x.push(obj);
          let persistPayload = await UserCouponDetails.findOneAndUpdate(
            { userId },
            { user: x },
            { new: true }
          );
          return res
            .status(StatusCodes.OK)
            .send({ status: true, dicountedPrice: price });
        }
      }
      // first time coupon use
      let arr = [];
      let obj = {};
      obj.programId = programId;
      obj.couponStatus = [{ couponCode: couponCode, status: true }];
      price = price - price * (findcoupon.discount / 100);
      obj.price = price;
      arr.push(obj);

      let persistPayload = await UserCouponDetails.create({
        userId,
        user: arr,
      });
      return res
        .status(StatusCodes.OK)
        .send({ status: true, dicountedPrice: price });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: false, message: "CouponExpire" });
    }
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: false, message: err.message });
  }
};
const updateCoupon = async (req, res) => {
  try {
    let couponId = req.body.couponId;
    let data = await DiscountModal.findOneAndUpdate(
      { _id: couponId },
      req.body,
      { new: true }
    );
    data.updatedAt = new Date(Date.now());
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "No coupon found" });
    return res
      .status(200)
      .send({
        status: true,
        message: "coupon updated successfully",
        data: data,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    let couponId = req.body.couponId;
    let data = await DiscountModal.deleteOne({ _id: couponId });
    if (!data)
      return res
        .status(400)
        .send({ status: false, message: "No coupon found" });
    return res
      .status(200)
      .send({ status: true, message: "coupon deleted successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { CreateDiscount, getCoupon, updateCoupon, deleteCoupon };
