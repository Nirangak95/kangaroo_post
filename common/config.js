const config = {
  //Databases
  MONGO_DB: process.env.MONGO_DB,

  REDIS_DB_1: process.env.REDIS_DB_1,
  REDIS_DB_2: process.env.REDIS_DB_2,

  LOGS_PATH: process.env.LOGS_PATH,
  IMAGES: {
    PRIMARY_PATH: process.env.PRIMARY_PATH,
    RESIZED_PATH: process.env.RESIZED_PATH,

    //RateCard
    RATE_CARD_MAP_ICONS: process.env.RATE_CARD_MAP_ICONS,
    RATE_CARD_IMAGES: process.env.RATE_CARD_IMAGES,
  },

  SECURITY: {
    SALT_WORKER: parseInt(process.env.SALT_WORKER),
    SECRET_KEY: process.env.SECRET_KEY,

    //Not Applied
    EXPIRES_IN: process.env.EXPIRES_IN,
  },
};

module.exports = config;
