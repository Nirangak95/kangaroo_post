const express = require("express");
const router = express.Router();
const { getAll, get, create, update, deleteUser } = require("../../controllers/user/index");

router.post("/create", create);

router.put("/:id", update);

//Get user by Id
router.get("/:id", get);

//Get all users
router.get("/", getAll);

router.delete("/:id", deleteUser);

module.exports = router;
