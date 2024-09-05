const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const init = require("../common/clients");
const { createPaths } = require("../common/helpers/other");
const moment = require("moment");
const PORT = process.env.PORT || 3000;
const config = require("../common/config");

(async () => {
  //Init Mongo,Redis 1, Redis 2 & path Creation
  await init.connectMongo();
  await init.connectRedis1();
  await init.connectRedis2();
  await createPaths([
    `${config.IMAGES.RESIZED_PATH}${config.IMAGES.RATE_CARD_MAP_ICONS}`,
    `${config.IMAGES.RESIZED_PATH}${config.IMAGES.RATE_CARD_IMAGES}`,
  ]);

  //Enable Cors
  const corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token, x-access-id",
  };

  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Middle wares
  const middlewares = require("../common/middlewares/index");

  //Validate Routes --------
  app.use("/api-admin/", middlewares.tokenValidation);

  //Routes
  require("./routes/index")(app);

  //Common Middlewares
  app.use(middlewares.notFoundHandler);
  app.use(middlewares.errorHandler);

  //listen App
  app.listen(PORT, () => {
    console.log(
      `Admin - API init at ${moment().format("YYYY-MM-DD HH:mm")} - PORT ${PORT}`,
    );
  });
})();
