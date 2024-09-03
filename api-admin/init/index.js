const moment = require("moment");
const mongoose = require("mongoose");
const config = require("../../common/config");
const Redis = require("ioredis");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

module.exports = async (app) => {
  try {
    await initMongoDB();
    await initRedis1();
    await initRedis2();
    await createPaths();
    await listenApp(app);
  } catch (error) {
    console.log(error);
  }
};

async function initMongoDB() {
  try {
    await mongoose.connect(config.MONGO_DB, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

async function initRedis1() {
  const redis1 = new Redis(config.REDIS_DB_1);

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
  const redis2 = new Redis(config.REDIS_DB_2);

  try {
    const result = await redis2.ping();
    console.log("Redis 2 (6378) Connected:", result);
  } catch (err) {
    console.error("Redis 2 (6378) Connection Error:", err);
  } finally {
    redis2.disconnect();
  }
}

async function createPaths() {
  try {
    const paths = [
      config.IMAGES.PRIMARY_PATH,
      config.IMAGES.RESIZED_PATH,
      `${config.IMAGES.RESIZED_PATH}${config.IMAGES.RATE_CARD_MAP_ICONS}`,
      `${config.IMAGES.RESIZED_PATH}${config.IMAGES.RATE_CARD_IMAGES}`,
    ];

    paths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    });
  } catch (err) {
    console.error("File paths creating error:", err);
  }
}

async function listenApp(app) {
  app.listen(PORT, () => {
    console.log(
      `Admin - API init at ${moment().format("YYYY-MM-DD HH:mm")} - PORT ${PORT}`,
    );
  });
}
