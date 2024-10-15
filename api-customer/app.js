const express = require("express");
const cors = require("cors");
const app = express();

//Load environment variables according to the environment
require('../common/configLoader')();

const init = require("../common/clients");
const moment = require("moment");
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    //Init Mongo,Redis 1 & Redis 2
    await Promise.all([init.connectMongo(), init.connectRedis1(), init.connectRedis2()]);

    const modelIndex = require("../common/models/index");
    modelIndex.models('package');
    modelIndex.models('order');
    modelIndex.models('customer');


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
    // app.use("/api-customer/", middlewares.tokenValidation);

    //Routes
    require("./routes/index")(app);

    //Common Middlewares
    app.use(middlewares.notFoundHandler);
    app.use(middlewares.errorHandler);

    app.listen(PORT, () => {
      console.log(
        `Customer - API init at ${moment().format("YYYY-MM-DD HH:mm")} - PORT ${PORT}`,
      );
    });
  } catch (error) {
    console.log(`Customer-API Init Error =>`, error);
  }
})();
