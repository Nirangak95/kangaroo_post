const config = require("../config");
const { redis } = require("../constants");
const { connectRedis1, connectRedis2 } = require("../../common/clients");

const setRedisHMSet = async (db, key, value) => {
  let redisClient = null;

  if (db === redis.ONE) {
    redisClient = await connectRedis1();
  } else {
    redisClient = await connectRedis2();
  }

  if (redisClient) {
    await redisClient.hmset(key, value);
  } else {
    throw new Error('Redis client is not initialized');
  }
};

const bookingKey = async ({ orderId = "*", status = "*", serviceType = "*" }) =>
  `order:${orderId}:${status}:${serviceType}`;

module.exports = { setRedisHMSet, bookingKey };
