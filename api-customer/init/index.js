const moment = require("moment");
const mongoose = require("mongoose");
const config = require("../../common/config");
const { redis1, redis2 } = require("../../common/clients");

const PORT = process.env.PORT || 3001;

module.exports = async (app) => {
  try {
    await initMongoDB();
    await initRedis1();
    await initRedis2();
    await listenApp(app);
  } catch (error) {
    console.log(error);
  }
};

async function initMongoDB() {
  try {
    //wait for the connection ready
    await mongoose.connect(config.MONGO_DB, {});
    console.log("MongoDB connected");


  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

async function initRedis1() {
  try {
    const result = await redis1.ping();
    console.log("Redis 1 (6379) Connected:", result);
  } catch (err) {
    console.error("Redis 1 (6379) Connection Error:", err);
  } finally {
    redis1.disconnect();
  }
}

async function initRedis2() {
  try {
    const result = await redis2.ping();
    console.log("Redis 2 (6378) Connected:", result);
  } catch (err) {
    console.error("Redis 2 (6378) Connection Error:", err);
  } finally {
    redis2.disconnect();
  }
}

async function listenApp(app) {
  app.listen(PORT, () => {
    console.log(
      `Customer - API init at ${moment().format("YYYY-MM-DD HH:mm")} - PORT ${PORT}`,
    );
  });
}
