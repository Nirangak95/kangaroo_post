const config = {
  mongoDatabase: process.env.MONGO_DB,
  logsPath: process.env.LOGS_PATH,
  images: {
    originalPath: process.env.ORIGINAL_PATH,
    resizedPath: process.env.RESIZED_PATH,

    //RateCard
    rateCardMapIcons: process.env.RATE_CARD_MAP_ICONS,
    rateCardImage: process.env.RATE_CARD_IMAGES,
  },

  security: {
    SALT_WORKER: process.env.SALT_WORKER,
    SECRET_KEY: process.env.SECRET_KEY,

    //Not Applied
    EXPIRES_IN: process.env.EXPIRES_IN,
  },
};

module.exports = config;
