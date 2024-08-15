const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getAll, get, create } = require("../../controllers/rateCard/index");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/original/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("file"), create);

//Get restaurant by Id
router.get("/:id", get);

//Get all restaurants
router.get("/", getAll);

module.exports = router;
