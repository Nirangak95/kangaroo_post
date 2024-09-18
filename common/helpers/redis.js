const config = require("../config");
const { redis } = require("../constants");
const { redis1, redis2 } = require("../../common/clients");

const setRedisHMSet = async (db, key, value) => {
  if (db == redis.ONE) {
    await redis1.hmset(key, value);
  } else {
    await redis2.hmset(key, value);
  }
};

const bookingKey = async ({ orderId = "*", status = "*", serviceType = "*" }) =>
  `order:${orderId}:${status}:${serviceType}`;

module.exports = { setRedisHMSet, bookingKey };
