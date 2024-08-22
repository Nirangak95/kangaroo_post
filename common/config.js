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
    };
    break;
}

module.exports = config;
