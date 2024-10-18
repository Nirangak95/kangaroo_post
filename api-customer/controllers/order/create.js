const {
  successResponse,
  errorResponse,
  createClientError
} = require("../../../common/helpers/other");

const PackageModel = require("../../../common/models/package");
const OrderModel = require("../../../common/models/order");
const CustomerModel = require("../../../common/models/customer");

const { createOrder } = require("../../../common/validators/orderValidator");
const { setRedisHMSet, bookingKey } = require("../../../common/helpers/redis");
const { redis } = require("../../../common/constants");

const moment = require("moment");
const errorCodes = require("../../../common/errorCodes");

module.exports = async (req, res, next) => {
  try {
    // Step 1: Validate inputs
    const input = await validateInputs(req.body);

    // Step 2: Validate customer and package
    const [customer, package] = await validateCustomerAndPackage(input);

    // Step 3: Save order
    const savedOrder = await saveOrder(input);

    // Step 4: Save to Redis
    await saveToRedis(savedOrder);

    // Step 5: Return success response
    return res.status(201).json(successResponse({ data: savedOrder }));
  } catch (error) {
    if (error.isClientError) {
      return res.status(400).json(
        errorResponse({
          message: error.message,
          errorCode: error.errorCode,
        })
      );
    } else {
      next(error);
    }
  }
};

async function validateInputs(body) {
  try {
    return await createOrder.validateAsync(body);
  } catch (validationError) {
    throw createClientError("Invalid input", errorCodes.validationError);
  }
}

async function validateCustomerAndPackage(input) {
  const [customer, package] = await Promise.all([
    validateCustomer(input.customerId),
    validatePackage(input.packageId),
  ]);

  if (!customer) {
    throw createClientError("Customer not found", errorCodes.notFound);
  }

  if (!package) {
    throw createClientError("Package not found", errorCodes.notFound);
  }

  input.time = { requested: moment().utc().toISOString() };
  return [customer, package];
}

async function validateCustomer(customerId) {
  const customer = await CustomerModel.findOne({ _id: customerId })
    .lean()
    .select("_id");

  return customer ? customer : null;
}

async function validatePackage(packageId) {
  const packageDetails = await PackageModel.findById(packageId)
    .select("_id")
    .lean();

  return packageDetails ? packageDetails : null;
}

async function saveOrder(input) {
  return await new OrderModel(input).save();
}

async function saveToRedis(savedOrder) {
  const key = await bookingKey({
    orderId: savedOrder._id,
    status: savedOrder.status,
    serviceType: savedOrder.serviceType,
  });

  const value = {
    requested: savedOrder.time.requested,
    initialPickupLat: savedOrder.location?.initialPickup?.lat,
    initialPickupLng: savedOrder.location?.initialPickup?.lng,
  };

  return await setRedisHMSet(redis.ONE, key, value);
}



