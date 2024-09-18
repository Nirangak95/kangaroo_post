const {
  successResponse,
  errorResponse,
} = require("../../../common/helpers/other");

const PackageModel = require("../../../common/models/package");
const OrderModel = require("../../../common/models/order");
const CustomerModel = require("../../../common/models/customer");

const { createOrder } = require("../../../common/validators/orderValidator");
const { setRedisHMSet, bookingKey } = require("../../../common/helpers/redis");
const { redis } = require("../../../common/constants");
const { notFound } = require("../../../common/errorCodes");

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
    const customer = await CustomerModel.findOne({ _id: input.customerId })
      .lean()
      .select("_id ");

    if (!customer) {
      return res
        .status(404)
        .json(
          errorResponse({ message: "Customer not found", errorCode: notFound }),
        );
    }

    //2. validate package
    const packageDetails = await PackageModel.findById(input.packageId)
      .select("_id")
      .lean();

    if (!packageDetails) {
      return res
        .status(404)
        .json(
          errorResponse({ message: "Package not found", errorCode: notFound }),
        );
    }

    input.time = { requested: moment().utc().toISOString() };

    //3. save order
    const savedOrder = await OrderModel(input).save();

    //4. Redis DB save
    const key = await bookingKey({
      orderId: savedOrder._id,
      status: savedOrder.status,
      serviceType: savedOrder.serviceType,
    });

    const value = {
      requested: savedOrder.time.requested,
    };
    await setRedisHMSet(redis.ONE, key, value);

    res.status(201).json(successResponse({ data: savedOrder }));
  } catch (error) {
    next(error);
  }
};
