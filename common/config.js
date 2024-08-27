let config = {};

switch (process.env.NODE_ENV) {
  case "dev":
    config = {};
    break;
  //For local PC
  default:
    config = {
      mongoDatabase: "mongodb://localhost:27017/post",
      logsPath: "../opt/logs",
      images: {
        originalPath: "D:/Kangaroo/Posts/opt/uploads/original/",
        resizedPath: "D:/Kangaroo/Posts/opt/uploads/resized/",

        //RateCard
        rateCardMapIcons: "rateCards/mapIcons/",
        rateCardImage: "rateCards/images/",
      },

      security: {
        SALT_WORKER: 10,
        SECRET_KEY: "#*J(<21>9037&uop",

        //Not Applied
        EXPIRES_IN: "1h"
      }
    };
    break;
}

module.exports = config;
