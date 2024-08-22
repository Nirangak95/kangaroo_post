const {
  getRateCard,
  createRateCard,
  updateRateCard,
} = require("../../../common/validators/rateCardValidator");
const RateCardModel = require("../../../common/models/rateCard");
const { notFound } = require("../../../common/errorCodes");
const sharp = require("sharp");
const config = require("../../../common/config");

let { successResponse, errorResponse } = require("../../../common/helpers");

const create = async (req, res, next) => {
  try {
    const inputFiles = req.files;
    //Convert JSON sting to parse
    req.body.vehicularModel &&
      (req.body.vehicularModel = JSON.parse(req.body.vehicularModel));
    req.body.maxDimensions &&
      (req.body.maxDimensions = JSON.parse(req.body.maxDimensions));

    const validatedInput = await createRateCard.validateAsync(req.body);

    //Map Icon Resize & Save
    if (inputFiles.mapIconUrl) {
      const originalPath = `${config.images.originalPath}${inputFiles.mapIconUrl[0].filename}`;
      const resizedPath = `${config.images.resizedPath}${config.images.rateCardMapIcons}${inputFiles.mapIconUrl[0].filename}`;
      await sharp(originalPath).jpeg({ quality: 40 }).toFile(resizedPath);
      validatedInput.mapIconUrl = resizedPath;
    }

    //Rate Card Resize & Save
    if (inputFiles.imageUrl) {
      const originalPath = `${config.images.originalPath}${inputFiles.imageUrl[0].filename}`;
      const resizedPath = `${config.images.resizedPath}${config.images.rateCardImage}${inputFiles.imageUrl[0].filename}`;
      await sharp(originalPath).jpeg({ quality: 40 }).toFile(resizedPath);
      validatedInput.imageUrl = resizedPath;
    }

    const savedRateCard = await RateCardModel(validatedInput).save();

    res.status(201).json(successResponse({ data: savedRateCard }));
  } catch (error) {
    console.log("Create Rate Card Error", error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    await getRateCard.validateAsync(req.params);

    const rateCard = await RateCardModel.findById(req.params.id);

    if (!rateCard) {
      return res.status(404).json(
        errorResponse({
          message: "Rate card not found",
          errorCode: notFound,
        }),
      );
    }

    res.status(200).json(successResponse({ data: rateCard }));
  } catch (error) {
    console.log("Get rate card error", error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rateCards = await RateCardModel.find({});

    res.status(200).json(successResponse({ data: rateCards }));
  } catch (error) {
    console.log("Get all rate cards error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const input = await updateRateCard.validateAsync(
      Object.assign(req.body, { ...req.params }),
    );

    const rateCard = await RateCardModel.findById(input.id);

    if (!rateCard) {
      return res.status(404).json(
        errorResponse({
          message: "Rate card not found",
          errorCode: notFound,
        }),
      );
    }

    const updatedRateCard = await RateCardModel.findByIdAndUpdate(
      input.id,
      input,
      { new: true },
    );

    res.status(200).json(successResponse({ data: updatedRateCard }));
  } catch (error) {
    console.log("Rate card update error", error);
    next(error);
  }
};

const deleteRateCard = async (req, res, next) => {
  try {
    await getRateCard.validateAsync(req.params);

    const rateCard = await RateCardModel.findById(req.params.id);

    if (!rateCard) {
      return res.status(404).json(
        errorResponse({
          message: "Rate card not found",
          errorCode: notFound,
        }),
      );
    }

    await RateCardModel.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.status(200).json(successResponse({ message: "Successfully deleted" }));
  } catch (error) {
    console.log("Rate card delete error", error);
    next(error);
  }
};

module.exports = { create, get, getAll, update, deleteRateCard };
