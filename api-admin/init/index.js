const moment = require("moment");
const mongoose = require("mongoose");
const config = require("../../common/config");
const logger = require("../../common/loggers");
const PORT = process.env.PORT || 3000;

module.exports = async (app) => {
  try {
    await initMongoDB();

    await listenApp(app);
  } catch (error) {
    console.log(error);
  }
};

async function initMongoDB() {
  try {
    await mongoose.connect(config.mongoDatabase, {});
    // await mongoose.connect("222", {});

    console.log("MongoDB connected");
  } catch (err) {
    logger.error("22222");
    console.log("MongoDB connection error:", err);
  }
}

async function listenApp(app) {
  app.listen(PORT, () => {
    console.log("admin init at " + moment().format("YYYY-MM-DD HH:mm"));
    console.log(`Server is running on port ${PORT}`);
  });
}
