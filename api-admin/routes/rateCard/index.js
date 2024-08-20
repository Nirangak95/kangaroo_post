const express = require("express");
const router = express.Router();
const { getAll, get, create, update } = require("../../controllers/rateCard/index");

router.post("/create", create);


//Get rateCard by Id
router.get("/:id", get);

//Get all rateCards
router.get("/", getAll);

router.put("/:id", update);



module.exports = router;
