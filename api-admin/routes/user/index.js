const express = require("express");
const router = express.Router();
const { getAll, get, create } = require("../../controllers/user/index");

router.post("/create", create);

//Get user by Id
router.get("/:id", get);

//Get all users
router.get("/", getAll);

// router.put("/:id", update);

// router.delete("/:id", deleteRateCard);

module.exports = router;
