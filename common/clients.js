const Redis = require("ioredis");
const mongoose = require("mongoose");

const config = require("../common/config");

let cachedDb = null;
let redis1 = null;
let redis2 = null;

const connectMongo = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(config.MONGO_DB, { maxPoolSize: 100 });
    cachedDb = db;
    console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return error;
  }
};

const connectRedis1 = async () => {
  if (!redis1) {
    redis1 = new Redis(config.REDIS_DB_1);
    try {
      const result = await redis1.ping();
      console.log("Redis 1 (6379) Connected:", result);
    } catch (err) {
      console.error("Redis 1 (6379) Connection Error:", err);
    }
  }
  return redis1;
};

const connectRedis2 = async () => {
  if (!redis2) {
    redis2 = new Redis(config.REDIS_DB_2);
    try {
      const result = await redis2.ping();
      console.log("Redis 2 (6378) Connected:", result);
    } catch (err) {
      console.error("Redis 2 (6378) Connection Error:", err);
    }
  }
  return redis2;
};

module.exports = { connectRedis1, connectRedis2, connectMongo, redis1, redis2 };
