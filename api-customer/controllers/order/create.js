const { successResponse, errorResponse } = require("../../../common/helpers");

const PackageModel = require("../../../common/models/package");
const OrderModel = require("../../../common/models/order");
const CustomerModel = require("../../../common/models/customer");

const { createOrder } = require("../../../common/validators/orderValidator");
const { setRedisKey } = require("../../../common/helpers/redis");
const { redis } = require("../../../common/constants")


const moment = require("moment");

//1. validate customer
//2. validate package
//3. save order
//4. Redis DB save

module.exports = async (req, res, next) => {
  try {
    //Validate inputs
    const input = await createOrder.validateAsync(req.body);

    //1. validate customer
    // const customer = await CustomerModel.findById(1).lean();

    // if (!customers) {
    //     return res.status(404).json(errorResponse({ message: "Customer not found" }));
    // }

    //2. validate package
    const packageDetails = await PackageModel.findById(input.packageId)
      .select("_id")
      .lean();
    if (!packageDetails) {
      return res
        .status(404)
        .json(errorResponse({ message: "Package not found" }));
    }

    input.time = { requested: moment().utc().toISOString() };

    //3. save order
    const savedOrder = await OrderModel(input).save();

    //4. Redis DB save
    const key = '22j2'
    const value = {
      test: "pppp",
      hello: "esj"
    };
    await setRedisKey(redis.ONE, key, value)

    res.status(201).json(successResponse({ data: savedOrder }));
  } catch (error) {
    next(error);
  }
};
