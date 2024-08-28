const config = {
  //Databases
  MONGO_DB: process.env.MONGO_DB,

  REDIS_DB: process.env.REDIS_DB,
  REDIS_PORT_1: parseInt(process.env.REDIS_PORT_1),
  REDIS_PORT_2: parseInt(process.env.REDIS_PORT_2),

  LOGS_PATH: process.env.LOGS_PATH,
  IMAGES: {
    ORIGINAL_PATH: process.env.ORIGINAL_PATH,
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

    //Redis
    REDIS_PASS: process.env.REDIS_PASS,
  },
};

module.exports = config;
