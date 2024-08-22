const multer = require("multer");
const path = require("path");
const config = require("../config");

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.images.originalPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the original name and a timestamp
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  }
};

// Create Multer instance with storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
