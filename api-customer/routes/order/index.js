const express = require("express");
const router = express.Router();
const create = require("../../controllers/order/create");

router.post("/create", create);

module.exports = router;
