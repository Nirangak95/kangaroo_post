const express = require("express");
const cors = require("cors");
const app = express();

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

//Validate Routes --------

//Routes
require("./routes/index")(app);

//Common Middlewares
const middlewares = require("./middleware/index");
app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

//Init Mongo,listen App
require("./init/index")(app);
