const express = require("express");
const router = express.Router();
const {
  getAll,
  get,
  create,
  update,
  deletePackage
} = require("../../controllers/package/index");

router.post("/create", create);

//Get package by Id
router.get("/:id", get);

//Get all packages
router.get("/", getAll);

router.put("/:id", update);

router.delete("/:id", deletePackage);

module.exports = router;
