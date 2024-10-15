const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAll,
  get,
  create,
  update,
  deleteRateCard,
} = require("../../controllers/rateCard/index");
const {
  errorResponse,
} = require("../../../common/helpers/other");

const upload = require("../../../common/utils/multerConfigs");

router.post(
  "/create",
  (req, res, next) => {
    upload.fields([{ name: "mapIconUrl" }, { name: "imageUrl" }])(
      req,
      res,
      (err) => {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json(
              errorResponse({
                message: "File size too large. Maximum size is 25 MB.",
              })
            );
          }
          return res.status(400).json(
            errorResponse({
              message: err.message,
            })
          );
        } else if (err) {
          return res.status(500).json(
            errorResponse({
              message: err.message,
            })
          );
        }

        next();
      }
    );
  },
  create
);

//Get rateCard by Id
router.get("/:id", get);

//Get all rateCards
router.get("/", getAll);

router.put("/:id", update);

router.delete("/:id", deleteRateCard);

module.exports = router;
