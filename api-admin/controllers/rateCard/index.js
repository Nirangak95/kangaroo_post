const {
  getRestaurant,
  createRestaurant,
} = require("../../../common/validators/restaurantValidator");
const RestaurantModel = require("../../../common/models/rateCard");
const sharp = require("sharp");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    await createRestaurant.validateAsync(req.body);

    if (!req.file) {
      return res
        .status(400)
        .json(errorResponse({ message: "No file uploaded" }));
    }

    const logoPath = `uploads/original/${req.file.filename}`;

    const outputFilePath = `uploads/resized/${req.file.filename}`;

    // Resize the image
    await sharp(logoPath)
      // .resize(800, 600, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(outputFilePath);

    Object.assign(req.body, {
      logo: {
        originalPath: logoPath,
        resizedPath: outputFilePath,
      },
    });

    const savedRestaurant = await RestaurantModel(req.body).save();

    res.status(201).json(successResponse({ data: savedRestaurant }));
  } catch (error) {
    console.log("Create Restaurant Error", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getRestaurant.validateAsync(req.params);

    const restaurant = await RestaurantModel.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json(errorResponse("Restaurant not found"));
    }

    res.status(200).json(successResponse({ data: restaurant }));
  } catch (error) {
    console.log("Get restaurant error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const restaurants = await RestaurantModel.find({});

    res.status(200).json(successResponse({ data: restaurants }));
  } catch (error) {
    console.log("Get all restaurants error", error);
    next(error);
  }
};

module.exports = { create, get, getAll };
