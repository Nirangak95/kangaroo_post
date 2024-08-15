let config = {};

switch (process.env.NODE_ENV) {
  case "local":
    config = {
      mongoDatabase: "mongodb://localhost:27017/post",
      logsPath: "../logs",
    };
    break;
  case "dev":
    config = {};
    break;
}

module.exports = config;
