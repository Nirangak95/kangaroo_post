const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

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

//Init Mongo,Redis &  listen App
require("./init/index")(app);
