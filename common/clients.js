const Redis = require("ioredis");
const mongoose = require("mongoose");

const config = require("../common/config");

const redis1 = new Redis(config.REDIS_DB_1);
const redis2 = new Redis(config.REDIS_DB_2);

let cachedDb = null;

const connectMongo = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const db = mongoose.connect(config.MONGO_DB, {});
    cachedDb = db;
    console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return error;
  }
};

async function connectRedis1() {
  try {
    const result = await redis1.ping();
    console.log("Redis 1 (6379) Connected:", result);
  } catch (err) {
    console.error("Redis 1 (6379) Connection Error:", err);
  } finally {
    redis1.disconnect();
  }
}

async function connectRedis2() {
  try {
    const result = await redis2.ping();
    console.log("Redis 2 (6378) Connected:", result);
  } catch (err) {
    console.error("Redis 2 (6378) Connection Error:", err);
  } finally {
    redis2.disconnect();
  }
}

module.exports = { connectRedis1, connectRedis2, connectMongo };
